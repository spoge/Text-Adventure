import React, { useReducer, useMemo } from "react";
import "../styles/App.css";
import Game from "./Game";
import { GameSaveReducer } from "../reducers/GameSaveReducer";
import { GameInstanceReducer } from "../reducers/GameInstanceReducer";
import GameContext from "./GameContext";

const initialSaveState = {
  chapterId: "chapter_1",
  sceneId: "shipwreck_1",
  flags: [],
};

const initialInstanceState = {
  selectedIndex: 0,
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

  return (
    <div className="app">
      <GameContext.Provider value={contextValues}>
        <Game />
      </GameContext.Provider>
    </div>
  );
};

export default App;
