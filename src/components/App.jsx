import React, { useReducer, useMemo } from "react";
import "./App.css";
import Game from "./Game";
import { GameContext, GameReducer } from "../reducer/GameReducer";

const fileChapter = require("../game/chapter1.json");
const initialState = { sceneId: "shipwreck_1", flags: [] };

const App = () => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <div className="app">
      <GameContext.Provider value={contextValue}>
        <Game chapter={fileChapter} />
      </GameContext.Provider>
    </div>
  );
};

export default App;
