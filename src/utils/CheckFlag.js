const hideIfAnyFlagMatches = (flags, obj) =>
  flags.map((f) => obj.hideIfAnyFlagMatches.includes(f)).filter((f) => f)
    .length > 0;
const hideIfAllFlagsMatches = (flags, obj) =>
  obj.hideIfAllFlagsMatches.map((f) => flags.includes(f)).filter((f) => f)
    .length === obj.hideIfAllFlagsMatches.length;

const showIfAnyFlagMatches = (flags, obj) =>
  flags.map((f) => obj.showIfAnyFlagMatches.includes(f)).filter((f) => f)
    .length > 0;
const showIfAllFlagsMatches = (flags, obj) =>
  obj.showIfAllFlagsMatches.map((f) => flags.includes(f)).filter((f) => f)
    .length === obj.showIfAllFlagsMatches.length;

const isVisible = (flags, obj) => {
  if (
    obj.hideIfAnyFlagMatches !== undefined &&
    hideIfAnyFlagMatches(flags, obj)
  ) {
    return false;
  }
  if (
    obj.hideIfAllFlagsMatches !== undefined &&
    hideIfAllFlagsMatches(flags, obj)
  ) {
    return false;
  }
  if (obj.showIfAnyFlagMatches !== undefined) {
    return showIfAnyFlagMatches(flags, obj);
  }
  if (obj.showIfAllFlagsMatches !== undefined) {
    return showIfAllFlagsMatches(flags, obj);
  }
  return true;
};

const hasShowFlags = (obj) => hasShowAnyFlags(obj) || hasShowAllFlags(obj);
const hasShowAnyFlags = (obj) => obj.showIfAnyFlagMatches !== undefined;
const hasShowAllFlags = (obj) => obj.showIfAllFlagsMatches !== undefined;

const getActiveShowFlagIndex = (flags, obj) =>
  hasShowAnyFlags(obj)
    ? showAnyFlagsIndex(flags, obj)
    : hasShowAllFlags(obj)
    ? showAllFlagsIndex(flags, obj)
    : flags.length;

const showAnyFlagsIndex = (flags, obj) => {
  if (
    obj.showIfAnyFlagMatches === undefined &&
    !showIfAnyFlagMatches(flags, obj)
  ) {
    return flags.length;
  }
  return flags.findIndex((flag) => obj.showIfAnyFlagMatches.includes(flag));
};

const showAllFlagsIndex = (flags, obj) => {
  if (
    obj.showIfAllFlagsMatches === undefined &&
    !showIfAllFlagsMatches(flags, obj)
  )
    return flags.length;

  const lastFlag = [...flags]
    .sort(() => -1)
    .find((flag) => obj.showIfAllFlagsMatches.includes(flag));

  return flags.findIndex((flag) => flag === lastFlag);
};

export { isVisible, hasShowFlags, getActiveShowFlagIndex };
