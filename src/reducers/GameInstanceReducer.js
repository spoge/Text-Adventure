const GameInstanceReducer = (state, action) => {
  switch (action.type) {
    case "set_selected_index":
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case "toggle_debug_mode":
      return {
        ...state,
        debugMode: !state.debugMode,
      };
    case "toggle_debug_help":
      return { ...state, debugHelp: !state.debugHelp };
    default:
      return state;
  }
};

export { GameInstanceReducer };
