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

const shouldShow = (flags, obj) => {
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

export default shouldShow;
