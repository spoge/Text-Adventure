import { useContext, useEffect, useState } from "react";
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
  const flags = state.flags;

  const [chapter, setChapter] = useState({});
  const scene = chapter?.scenes?.find((l) => l.id === state.sceneId);

  const debug = false;

  useEffect(() => {
    fetchChapter(state.chapterId, setChapter);
  }, [state]);

  const actionClick = (actionIndex) => {
    const action = scene.actions.filter((a) => isVisible(flags, a))[
      actionIndex
    ];
    action.triggers?.forEach((trigger) => dispatchTrigger(dispatch, trigger));
  };

  return (
    <Terminal>
      <Title title={scene?.name} />
      <HorizontalLine />
      <Paragraphs flags={flags} paragraphs={scene?.paragraphs} />
      <HorizontalLine />
      {scene?.actions.length > 0 && <SmallTitle title="Actions:" />}
      <Actions
        actions={scene?.actions}
        flags={flags}
        onActionClick={actionClick}
      />
      {debug && <DebugStats flags={flags} />}
    </Terminal>
  );
};

export default Game;
