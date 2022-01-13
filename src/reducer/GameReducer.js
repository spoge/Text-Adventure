import React from "react";

const GameContext = React.createContext();
const GameReducer = (state, action) => {
  switch (action.type) {
    case "movement":
      return {
        ...state,
        sceneId: action.payload.sceneId,
        chapterId:
          action.payload.chapterId === undefined
            ? state.chapterId
            : action.payload.chapterId,
      };
    case "remove_flag":
      return {
        ...state,
        flags: [...state.flags.filter((f) => f !== action.payload)],
      };
    case "add_flag":
      return { ...state, flags: [...state.flags, action.payload] };
    default:
      return state;
  }
};

export { GameContext, GameReducer };
