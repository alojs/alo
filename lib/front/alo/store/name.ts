import { createUniqueTag, undoData } from "alo/v2";
import { ThunkDispatchFunc } from "alo/v2/store";

const NAME_TAG = createUniqueTag();
export const SET_NAME = "SET_NAME";

export const nameMutator = function(ctx, state: string = "", tag) {
  if (ctx.action.type === SET_NAME) {
    const undoable = undoData(ctx.action, NAME_TAG, state);

    if (ctx.action.meta.do) {
      state = ctx.action.payload;
    }

    if (ctx.action.meta.undo) {
      state = undoable;
    }

    ctx.push(tag + "." + NAME_TAG);
  }

  return state;
};

export const setName = (name: string) => {
  return {
    type: SET_NAME,
    payload: name
  };
};

export const setNameWithLastName = (dispatch: ThunkDispatchFunc, getState) => {
  const state = getState();

  return dispatch({
    type: SET_NAME,
    payload: state.name.length + "huhu" + state.name
  });
};
