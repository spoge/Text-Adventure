import { useContext, useEffect, useRef, useState } from "react";
import "../styles/Game.css";
import Terminal from "./Terminal";
import { isVisible } from "../scripts/CheckFlag";
import dispatchTrigger from "../scripts/DispatchTrigger";
import fetchChapter from "../scripts/FetchChapter";
import GameContext from "./GameContext";
import HorizontalLine from "./common/HorizontalLine";
import Paragraphs from "./game/Paragraphs";
import Actions from "./game/Actions";
import DebugStats from "./DebugStats";
import Title from "./common/Title";
import SmallTitle from "./common/SmallTitle";
import DebugHelp from "./DebugHelp";

const Game = () => {
  const { saveState, saveDispatch, instanceState, instanceDispatch } =
    useContext(GameContext);
  const [chapter, setChapter] = useState({});
  const gameRef = useRef(null);

  const flags = saveState.flags;
  const scene = chapter?.scenes?.find((l) => l.id === saveState.sceneId);
  const availableActions = scene?.actions?.filter((a) => isVisible(flags, a));
  const selectedIndex = instanceState.selectedIndex;
  const debugMode = instanceState.debugMode;
  const debugHelp = instanceState.debugHelp;

  useEffect(() => {
    fetchChapter(saveState.chapterId, setChapter);
    instanceDispatch({ type: "set_selected_index", payload: 0 });
    gameRef.current?.focus();
  }, [saveState, instanceDispatch]);

  const actionClick = (actionIndex) => {
    const action = scene.actions.filter((a) => isVisible(flags, a))[
      actionIndex
    ];
    action.triggers?.forEach((trigger) =>
      dispatchTrigger(saveDispatch, trigger)
    );
  };

  const handleKeyDown = (e) => {
    if (e.defaultPrevented) return;
    switch (e.key) {
      case "Enter":
        actionClick(selectedIndex);
        break;
      case "Up":
      case "ArrowUp":
        if (selectedIndex - 1 >= 0) {
          instanceDispatch({
            type: "set_selected_index",
            payload: instanceState.selectedIndex - 1,
          });
        }
        break;
      case "Down":
      case "ArrowDown":
        if (
          scene !== undefined &&
          selectedIndex + 1 < availableActions.length
        ) {
          instanceDispatch({
            type: "set_selected_index",
            payload: instanceState.selectedIndex + 1,
          });
        }
        break;

      // debug shortcuts
      case "C":
        saveDispatch({ type: "remove_all_flags" });
        break;
      case "D":
        instanceDispatch({ type: "toggle_debug_mode", payload: {} });
        break;
      case "H":
        instanceDispatch({ type: "toggle_debug_help", payload: {} });
        break;
      case "N":
        dispatchTrigger(saveDispatch, {
          type: "movement",
          target: "shipwreck_1",
          chapterId: "chapter_1",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="game" ref={gameRef} tabIndex="0" onKeyDown={handleKeyDown}>
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
