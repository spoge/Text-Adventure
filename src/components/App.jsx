import React, { useReducer, useMemo } from "react";
import "./styles/App.css";
import Game from "./Game";
import { GameContext, GameReducer } from "../reducer/GameReducer";

const initialState = {
  chapterId: "chapter_1",
  sceneId: "shipwreck_1",
  flags: [],
};

const App = () => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <div className="app">
      <GameContext.Provider value={contextValue}>
        <Game />
      </GameContext.Provider>
    </div>
  );
};

export default App;
