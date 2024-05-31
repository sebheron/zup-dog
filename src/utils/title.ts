const titleCase = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
};

export default titleCase;
