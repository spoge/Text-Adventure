import isVisible from "../../scripts/CheckFlag";

const Actions = ({ actions, flags, onActionClick }) => {
  return (
    <div className="actions">
      {actions &&
        actions
          .filter((a) => isVisible(flags, a))
          .map((action, index) => (
            <div
              className="action text-buzz"
              key={index}
              onClick={() => onActionClick(index)}
            >
              {`> ${action.actionText}`}
            </div>
          ))}
    </div>
  );
};

export default Actions;
