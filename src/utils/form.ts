export const getDefaultValue = (type: string) => {
  switch (type) {
    case "string":
      return "";
    case "boolean":
      return false;
    case "object":
      return {};
    case "table":
      return [];
    default:
      return "";
  }
};