export const gqlTransformer = (input, parentIsArray = false) =>
  Object.keys(input)
    .map(key => {
      let value = "";
      if (input[key] === null) {
        value = null;
      } else if (typeof input[key] === "function") {
        value = input[key]();
      } else if (Array.isArray(input[key])) {
        value = `[ ${gqlTransformer(input[key], true)} ]`;
      } else if (typeof input[key] === "object") {
        value = `{${gqlTransformer(input[key])}}`;
      } else {
        value = JSON.stringify(input[key]);
      }
      if (parentIsArray) {
        return `${value}`;
      }
      return `${key}: ${value}`;
    })
    .join(", ");

export default { gqlTransformer };
