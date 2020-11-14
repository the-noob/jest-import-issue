import faker from "faker"; // eslint-disable-line
import sample from "lodash/sample.js";
import { basename } from "path";

import describeValue, {
  createErrorObject,
  invalidPaymentTypeNames,
  validPaymentTypeNames,
} from "../../utils.js";

import {
  validationSchema,
  validationOptions,
  errorName,
} from "../../../paymentType/validation/AddPaymentTypeInput.js";

const entity = basename(__filename, ".test.js");

const validInput = [
  {
    name: sample(validPaymentTypeNames),
  },
];

describe(`"${entity}" validation rules`, () => {
  test("Fails with empty input", () => {
    const result = validationSchema.validate({}, validationOptions);

    expect(result.error.details.length).toBe(1);
    expect(result.error.details).toContainObject(createErrorObject(errorName));
  });

  invalidPaymentTypeNames.forEach(name => {
    const input = sample(validInput);

    test(`Fails with invalid 'name' ${describeValue(name)}`, () => {
      const result = validationSchema.validate(
        { ...input, name },
        validationOptions,
      );
      expect(result.error.details.length).toBe(1);

      expect(result.error.details).toContainObject(
        createErrorObject(errorName),
      );
    });
  });

  validInput.forEach(input =>
    test(`Passes with valid input ${describeValue(input)}`, () => {
      const result = validationSchema.validate(input, validationOptions);
      expect(result.error).toBeNull();
    }),
  );
});
