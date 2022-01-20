import { useContext, useEffect, useRef, useState } from "react";
import "../styles/Game.css";
import Terminal from "./Terminal";
import { isVisible } from "../scripts/CheckFlag";
import dispatchTrigger from "../scripts/DispatchTrigger";
import fetchChapter from "../scripts/FetchChapter";
import { GameContext } from "../reducer/GameReducer";
import HorizontalLine from "./common/HorizontalLine";
import Paragraphs from "./game/Paragraphs";
import Actions from "./game/Actions";
import DebugStats from "./DebugStats";
import Title from "./common/Title";
import SmallTitle from "./common/SmallTitle";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const [chapter, setChapter] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gameRef = useRef(null);

  const flags = state.flags;
  const scene = chapter?.scenes?.find((l) => l.id === state.sceneId);
  const availableActions = scene?.actions?.filter((a) => isVisible(flags, a));
  const debug = false;

  useEffect(() => {
    fetchChapter(state.chapterId, setChapter);
    setSelectedIndex(0);
    gameRef.current?.focus();
  }, [state]);

  const actionClick = (actionIndex) => {
    const action = scene.actions.filter((a) => isVisible(flags, a))[
      actionIndex
    ];
    action.triggers?.forEach((trigger) => dispatchTrigger(dispatch, trigger));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        actionClick(selectedIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (selectedIndex - 1 >= 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (
          scene !== undefined &&
          selectedIndex + 1 < availableActions.length
        ) {
          setSelectedIndex(selectedIndex + 1);
        }
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
        <Actions
          actions={availableActions}
          flags={flags}
          onActionClick={actionClick}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        {debug && <DebugStats flags={flags} />}
      </Terminal>
    </div>
  );
};

export default Game;
