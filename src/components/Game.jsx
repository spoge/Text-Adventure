import { useContext, useEffect, useRef, useState } from "react";
import { useKeyPress } from "../hooks/useKeyPress";
import GameContext from "./GameContext";
import "../styles/Game.css";
import Title from "./common/Title";
import SmallTitle from "./common/SmallTitle";
import HorizontalLine from "./common/HorizontalLine";
import Actions from "./display/Actions";
import Paragraphs from "./display/Paragraphs";
import Terminal from "./display/Terminal";
import DebugHelp from "./debug/DebugHelp";
import DebugStats from "./debug/DebugStats";

import { isVisible } from "../utils/CheckFlag";
import dispatchTrigger from "../utils/DispatchTrigger";
import fetchChapter from "../utils/FetchChapter";

const Game = () => {
  const { saveState, saveDispatch, instanceState, instanceDispatch } =
    useContext(GameContext);
  const [chapter, setChapter] = useState({});
  const gameRef = useRef(null);

  const flags = saveState.flags;
  const scene = chapter?.scenes?.find((l) => l.id === saveState.sceneId);
  const availableActions = scene?.actions?.filter((a) => isVisible(flags, a));
  const actionIndex = instanceState.actionIndex;
  const debugMode = instanceState.debugMode;
  const debugHelp = instanceState.debugHelp;

  useEffect(() => {
    fetchChapter(saveState.chapterId).then((value) => setChapter(value));
    instanceDispatch({ type: "set_selected_index", payload: 0 });
    gameRef.current?.focus();
  }, [saveState, instanceDispatch]);

  const actionClick = (actionIndex) => {
    availableActions !== undefined &&
      availableActions[actionIndex]?.triggers?.forEach((trigger) =>
        dispatchTrigger(saveDispatch, trigger)
      );
  };

  const setActionIndex = (newIndex) => {
    if (newIndex < 0 || newIndex >= availableActions?.length) return;
    instanceDispatch({
      type: "set_selected_index",
      payload: newIndex,
    });
  };

  const resetTrigger = () => {
    return {
      type: "movement",
      target: "",
      chapterId: "start",
    };
  };

  // actions nav
  useKeyPress(() => actionClick(actionIndex), ["Enter"]);
  useKeyPress(() => setActionIndex(actionIndex - 1), ["ArrowUp", "Up"]);
  useKeyPress(() => setActionIndex(actionIndex + 1), ["ArrowDown", "Down"]);

  // debug shortcuts
  useKeyPress(() => saveDispatch({ type: "remove_all_flags" }), ["C"]);
  useKeyPress(() => instanceDispatch({ type: "toggle_debug_mode" }), ["D"]);
  useKeyPress(() => instanceDispatch({ type: "toggle_debug_help" }), ["H"]);
  useKeyPress(() => dispatchTrigger(saveDispatch, resetTrigger()), ["N"]);

  return (
    <div className="game" ref={gameRef} tabIndex="0">
      <Terminal>
        <Title title={scene?.name} />
        <HorizontalLine />
        <Paragraphs flags={flags} paragraphs={scene?.paragraphs} />
        <HorizontalLine />
        {scene?.actions.length > 0 && <SmallTitle title="Actions:" />}
        <Actions actions={availableActions} onActionClick={actionClick} />
        {debugHelp && <DebugHelp />}
        {debugMode && <DebugStats flags={flags} />}
      </Terminal>
    </div>
  );
};

export default Game;
