var replay = function(store) {
  store.replay();
};

export var removeMessage = function(store, idx) {
  return {
    messages: { $splice: [[idx, 1]] }
  };
};

export var addNewMessage = function(store, idx) {
  return {
    messages: {
      $splice: [
        [
          idx,
          0,
          {
            type: "",
            enable: false,
            signal: { timemachine: true }
          }
        ]
      ]
    }
  };
};

export var addMessage = function(store, message) {
  var _message = {
    enable: true,
    type: message.type,
    signal: Object.assign({ timemachine: true }, message.signal),
    payload: message.payload
  };

  if (_message.signal.undo || _message.signal.redo) {
    _message.mutation = message.mutation;
  }

  return {
    messages: {
      $push: [_message]
    }
  };
};

export var updateMessage = function(store, payload) {
  var id = payload.id;
  var message = payload.message;

  var mutation = { messages: {} };
  mutation.messages[id] = {};
  if (message.type != null) mutation.messages[id].type = { $set: message.type };
  if (message.payload != null)
    mutation.messages[id].payload = { $set: message.payload };
  if (message.signal != null)
    mutation.messages[id].signal = { $set: message.signal };

  return mutation;
};

export var enableMessage = function(store, payload) {
  var id = payload.id;
  var enable = payload.enable != null ? payload.enable : true;

  var mutation = { messages: {} };
  mutation.messages[id] = {
    enable: { $set: enable }
  };

  return mutation;
};

export var undo = function(store) {
  var state = store.getState();
  if (state.messages.length > 1) {
    return {
      messages: {
        $splice: [[-1, 1]],
        $effect: replay
      }
    };
  }
};
