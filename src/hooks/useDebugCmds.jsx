import { useContext } from "react";
import { useKeyPress } from "./useKeyPress";
import GameContext from "../components/GameContext";

import dispatchTrigger from "../utils/DispatchTrigger";

const useDebugCmds = () => {
  const { saveDispatch, instanceState, instanceDispatch } =
    useContext(GameContext);

  const debugMode = instanceState.debugMode;
  const debugHelp = instanceState.debugHelp;

  const resetTrigger = () => {
    return {
      type: "movement",
      target: "",
      chapterId: "-start-",
    };
  };

  // debug shortcuts
  useKeyPress(() => saveDispatch({ type: "remove_all_flags" }), ["C"]);
  useKeyPress(() => instanceDispatch({ type: "toggle_debug_mode" }), ["D"]);
  useKeyPress(() => instanceDispatch({ type: "toggle_debug_help" }), ["H"]);
  useKeyPress(() => dispatchTrigger(saveDispatch, resetTrigger()), ["N"]);

  return {
    debugHelp,
    debugMode,
  };
};

export default useDebugCmds;
