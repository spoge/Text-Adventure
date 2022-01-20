import { isVisible } from "../../scripts/CheckFlag";

const Actions = ({
  actions,
  flags,
  onActionClick,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <div className="actions">
      {actions &&
        actions
          .filter((a) => isVisible(flags, a))
          .map((action, index) => (
            <div
              className={`action ${selectedIndex === index ? "selected" : ""}`}
              key={index}
              onClick={() => onActionClick(index)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {`> ${action.text}`}
            </div>
          ))}
    </div>
  );
};

export default Actions;
