// eslint-disable-next-line
import faker from "faker";

export const createErrorObject = message => ({ message });

export default value => {
  if (Number.isNaN(value)) {
    return "NaN [Not-A-Number]";
  }

  if (value === null) {
    return "null [Null]";
  }

  if (value === "") {
    return '"" [empty string]';
  }

  switch (typeof value) {
    case "string":
      return `"${value}" [string]`;
    case "number":
      return `${value} [number]`;
    case "undefined":
      return `[undefined]`;
    case "boolean":
      return `${value ? "true" : "false"} [boolean]`;
    case "symbol":
      return `[symbol]`;
    case "object":
      return `${JSON.stringify(value)} [object]`;
    default:
      throw new Error(`Unexpected value type [${typeof value}]`);
  }
};

export const invalidDates = [
  {},
  [],

  "",
  " ",
  "",
  null,
  undefined,
  faker.lorem.word(),
  faker.lorem.words(),
  faker.lorem.sentence(),
  faker.random.uuid(),
];

export const invalidIds = [
  {},
  "",
  " ",
  faker.lorem.word(),
  faker.lorem.words(),
  faker.lorem.sentence(),
  faker.random.uuid().substring(1),
  "",
  0,
  "0",
  null,
  undefined,
];

export const invalidPaymentTypeNames = [
  null,
  undefined,
  0,
  1,
  "0",
  "a",
  "",
  faker.lorem.word().substring(0, 1),
];

export const validPaymentTypeNames = [
  "Visa",
  "MasterCard",
  "Visa Debit Card",
  "Visa Business",
  faker.lorem.words(2),
];
