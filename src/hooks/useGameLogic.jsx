import { useContext, useEffect, useRef, useState } from "react";
import { useKeyPress } from "./useKeyPress";
import GameContext from "../components/GameContext";

import { isVisible } from "../utils/CheckFlag";
import dispatchTrigger from "../utils/DispatchTrigger";
import fetchChapter from "../utils/FetchChapter";

const useGameLogic = () => {
  const { saveState, saveDispatch, instanceState, instanceDispatch } =
    useContext(GameContext);

  const gameRef = useRef(null);
  const flags = saveState.flags;

  const [chapter, setChapter] = useState({});
  const scene = chapter?.scenes?.find((l) => l.id === saveState.sceneId);
  const availableActions = scene?.actions?.filter((a) => isVisible(flags, a));
  const actionIndex = instanceState.actionIndex;

  // When scene refreshes
  useEffect(() => {
    fetchChapter(saveState.chapterId).then((value) => setChapter(value));
    instanceDispatch({ type: "set_selected_index", payload: 0 });
    gameRef.current?.focus();
    localStorage.setItem("save", JSON.stringify(saveState));
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

  // actions nav
  useKeyPress(() => actionClick(actionIndex), ["Enter", " "]);
  useKeyPress(() => setActionIndex(actionIndex - 1), ["ArrowUp", "Up", "w"]);
  useKeyPress(
    () => setActionIndex(actionIndex + 1),
    ["ArrowDown", "Down", "s"]
  );

  return {
    gameRef,
    scene,
    flags,
    availableActions,
    actionClick,
  };
};

export default useGameLogic;
