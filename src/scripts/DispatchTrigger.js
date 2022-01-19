const dispatchTrigger = (dispatch, trigger) => {
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

export default dispatchTrigger;
