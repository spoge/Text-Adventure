import React, { useEffect, useReducer, useMemo } from "react";
import "../styles/App.css";
import Game from "./Game";
import GameContext from "./GameContext";
import { GameSaveReducer } from "../reducers/GameSaveReducer";
import { GameInstanceReducer } from "../reducers/GameInstanceReducer";
import fetchChapter from "../utils/FetchChapter";

const initialSaveState = {
  chapterId: "start",
  sceneId: "",
  flags: [],
};

const initialInstanceState = {
  actionIndex: 0,
  debugMode: false,
  debugHelp: false,
};

const App = () => {
  const [saveState, saveDispatch] = useReducer(
    GameSaveReducer,
    initialSaveState
  );

  const [instanceState, instanceDispatch] = useReducer(
    GameInstanceReducer,
    initialInstanceState
  );

  const contextValues = useMemo(() => {
    return { saveState, saveDispatch, instanceState, instanceDispatch };
  }, [saveState, saveDispatch, instanceState, instanceDispatch]);

  // Spawn at starting location when chapterId is "start"
  useEffect(() => {
    if (saveState.chapterId !== "start") return;
    fetchChapter("start").then((value) => {
      saveDispatch({ type: "remove_all_flags", payload: {} });
      saveDispatch({ type: "movement", payload: value });
    });
  }, [saveState.chapterId]);

  return (
    <div className="app">
      <GameContext.Provider value={contextValues}>
        <Game />
      </GameContext.Provider>
    </div>
  );
};

export default App;
