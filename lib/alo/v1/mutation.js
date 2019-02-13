import { once, isObjectLike, cloneDeep, mergeDeep } from "./util.js";

export const apply = function(mutation, target, options) {
  var signal = options.message.signal;
  for (var operation of Object.keys(mutation)) {
    var value = mutation[operation];
    // Clones the value only once
    var cloneValue = once(function() {
      return cloneDeep(value);
    });
    var merge = operation == "$merge";
    if (operation == "$set") {
      if (!signal.undo) {
        mutation.$backup = target;
        target = cloneValue();
      } else {
        target = mutation.$backup;
      }
    } else if (operation == "$merge") {
      if (!signal.undo) {
        var result = mergeDeep(target, cloneValue());
        mutation.$backup = result.backup;
        target = result.target;
      } else {
        var result = mergeDeep(target, mutation.$backup);
        target = result.target;
      }
    } else if (operation == "$push") {
      if (!signal.undo) {
        // We just store the current length of the target as a backup (allows for a splice in the future)
        mutation.$backup = target.length;
        value = cloneValue();
        for (var item of value) {
          target.push(item);
        }
      } else {
        var length = mutation.$backup;
        target.splice(length, value.length);
      }
    } else if (operation == "$unshift") {
      if (!signal.undo) {
        value = cloneValue();

        for (var item of value) {
          target.unshift(item);
        }
      } else {
        target.splice(0, value.length);
      }
    } else if (operation == "$apply") {
      if (!signal.undo) {
        mutation.$backup = target;
        target = value(target);
      } else {
        target = mutation.$backup;
      }
    } else if (operation == "$splice") {
      if (!signal.undo) {
        mutation.$backup = [];
      }
      value = cloneValue();
      var idx = 0;
      for (var spliceOptions of value) {
        var [index, remove, ...newItems] = spliceOptions;
        if (!signal.undo) {
          mutation.$backup.push(target.splice(index, remove, ...newItems));
        } else {
          var removedItems = mutation.$backup[idx];
          target.splice(index, newItems.length, ...removedItems);
        }
        idx++;
      }
    } else if (operation == "$backup") {
      // Nothing todo here ($backup is backup data for undos)
    } else {
      // This means, that the cursor would want to enter an object which doesnt even exist
      if (target == null) {
        throw new Error("You just removed the internet");
      }
      target[operation] = apply(value, target[operation], {
        effectContext: options.effectContext,
        message: options.message
      });
    }
  }

  /**
   * Handle sideeffects
   */
  if (options.effectHandler != null && mutation["$effect"] != null) {
    options.effectHandler(mutation["$effect"], options.message, target);
  }

  return target;
};

export const willMutate = function(mutation) {
  return (
    mutation != null &&
    (mutation["$set"] != null ||
      mutation["$merge"] != null ||
      mutation["$apply"] != null ||
      mutation["$push"] != null ||
      mutation["$unshift"] != null ||
      mutation["$splice"] != null)
  );
};

export const getMutatedKeys = function(mutation) {
  var mutatedKeys = [];
  if (mutation != null) {
    Object.keys(mutation).forEach(key => {
      if (key[0] != "$") mutatedKeys.push(key);
    });

    if (mutation["$push"] != null) {
      var idx = mutation.$backup.length;
      var newLength = mutation.$backup.length + mutation.$backup.newItemsCount;
      while (idx < newLength) {
        mutatedKeys.push(idx);
        idx++;
      }
    }
    if (mutation["$unshift"] != null) {
      // TODO
    }
    if (mutation["$splice"] != null) {
      // TODO
    }
  }

  return mutatedKeys;
};
