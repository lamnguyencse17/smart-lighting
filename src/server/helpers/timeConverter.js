const timeConverter = (time) => {
  let d = new Date(time);

  return "in " + Math.round((d.getTime() - Date.now()) / 1000) + " seconds";
};

export default timeConverter;
