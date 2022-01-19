const hideIfFlag = (flags, obj) => flags.includes(obj.hideIfFlag);
const hideIfAnyFlag = (flags, obj) =>
  flags.map((f) => obj.hideIfAnyFlag.includes(f)).filter((f) => f).length > 0;
const hideIfAllFlags = (flags, obj) =>
  obj.hideIfAllFlags.map((f) => flags.includes(f)).filter((f) => f).length ===
  obj.hideIfAllFlags.length;

const showIfFlag = (flags, obj) => flags.includes(obj.showIfFlag);
const showIfAnyFlag = (flags, obj) =>
  flags.map((f) => obj.showIfAnyFlag.includes(f)).filter((f) => f).length > 0;
const showIfAllFlags = (flags, obj) =>
  obj.showIfAllFlags.map((f) => flags.includes(f)).filter((f) => f).length ===
  obj.showIfAllFlags.length;

const isVisible = (flags, obj) => {
  if (obj.hideIfFlag !== undefined && hideIfFlag(flags, obj)) {
    return false;
  }
  if (obj.hideIfAnyFlag !== undefined && hideIfAnyFlag(flags, obj)) {
    return false;
  }
  if (obj.hideIfAllFlags !== undefined && hideIfAllFlags(flags, obj)) {
    return false;
  }
  if (obj.showIfFlag !== undefined) {
    return showIfFlag(flags, obj);
  }
  if (obj.showIfAnyFlag !== undefined) {
    return showIfAnyFlag(flags, obj);
  }
  if (obj.showIfAllFlags !== undefined) {
    return showIfAllFlags(flags, obj);
  }
  return true;
};

const hasShowFlags = (obj) => {
  return (
    obj.showIfFlag !== undefined ||
    obj.showIfAnyFlag !== undefined ||
    obj.showIfAllFlags !== undefined
  );
};

const hasShowFlag = (flag, obj) => {
  return (
    (obj.showIfFlag !== undefined && obj.showIfFlag === flag) ||
    (obj.showIfAnyFlag !== undefined && obj.showIfAnyFlag.includes(flag)) ||
    (obj.showIfAllFlags !== undefined && obj.showIfAllFlags.includes(flag))
  );
};

export { isVisible, hasShowFlags, hasShowFlag };
