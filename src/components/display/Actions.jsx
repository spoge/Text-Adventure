import { useContext } from "react";

import { isVisible } from "../../utils/CheckFlag";
import GameContext from "../GameContext";

const Actions = ({ actions, onActionClick }) => {
  const { saveState, instanceState, instanceDispatch } =
    useContext(GameContext);

  const flags = saveState.flags;

  return (
    <div className="actions">
      {actions &&
        actions
          .filter((a) => isVisible(flags, a))
          .map((action, index) => (
            <div
              className={`action ${
                instanceState.actionIndex === index ? "selected" : ""
              }`}
              key={index}
              onClick={() => onActionClick(index)}
              onMouseEnter={() =>
                instanceDispatch({
                  type: "set_selected_index",
                  payload: index,
                })
              }
            >
              {`> ${action.text}`}
            </div>
          ))}
    </div>
  );
};

export default Actions;
