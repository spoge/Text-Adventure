import { useContext, useEffect, useState } from "react";
import "./styles/Game.css";
import Terminal from "./Terminal";
import fetchChapter from "../scripts/fetchChapter";
import shouldShow from "../scripts/flagChecker";
import { GameContext } from "../reducer/GameReducer";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);

  const [chapter, setChapter] = useState({});

  useEffect(() => {
    fetchChapter(state.chapterId, setChapter);
  }, [state]);

  const flags = state.flags;
  const scene = chapter?.scenes?.find((l) => l.id === state.sceneId);
  const debug = false;

  const handleTrigger = (trigger) => {
    if (
      trigger === undefined ||
      trigger.type === undefined ||
      trigger.target === undefined
    ) {
      return;
    }
    switch (trigger.type) {
      case "movement":
        dispatch({
          type: "movement",
          payload: { sceneId: trigger.target, chapterId: trigger.chapterId },
        });
        break;
      case "add_flag":
        dispatch({ type: "add_flag", payload: trigger.target });
        break;
      case "remove_flag":
        dispatch({ type: "remove_flag", payload: trigger.target });
        break;
      default:
        break;
    }
  };

  const handleActionClick = (actionIndex) => {
    const action = scene.actions.filter((a) => shouldShow(flags, a))[
      actionIndex
    ];
    action.triggers?.forEach((t) => handleTrigger(t));
  };

  return (
    <div className="scene">
      <Terminal>
        <h3 className="scene-name">{scene?.name}</h3>
        <hr />
        <div className="paragraphs">
          {scene?.paragraphs
            .filter((d) => shouldShow(flags, d))
            .map((d) => (typeof d === "string" ? d : d.text))
            .map((paragraph, index) => (
              <div className="paragraph" key={index}>
                {paragraph}
              </div>
            ))}
        </div>
        {scene?.actions.length > 0 && (
          <>
            <hr />
            <h4 className="label">Actions:</h4>
          </>
        )}
        <div className="actions">
          {scene?.actions
            .filter((a) => shouldShow(flags, a))
            .map((action, index) => (
              <div
                className="action text-buzz"
                key={index}
                onClick={() => handleActionClick(index)}
              >
                {`> ${action.actionText}`}
              </div>
            ))}
        </div>
        {debug && flags.length > 0 && (
          <div>
            <br />
            Flags: {flags.reduce((r, s) => (r += ", " + s))}
          </div>
        )}
      </Terminal>
    </div>
  );
};

export default Game;
