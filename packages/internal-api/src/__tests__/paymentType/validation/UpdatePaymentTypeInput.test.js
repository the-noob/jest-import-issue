import faker from "faker"; // eslint-disable-line
import sample from "lodash/sample.js";
import { basename } from "path";
import describeValue, {
  createErrorObject,
  invalidIds,
  invalidPaymentTypeNames,
  validPaymentTypeNames,
} from "../../utils.js";

import {
  validationSchema,
  validationOptions,
  errorId,
  errorName,
} from "../../../paymentType/validation/UpdatePaymentTypeInput.js";

const entity = basename(__filename, ".test.js");

const validInput = validPaymentTypeNames.map(name => ({
  id: faker.random.uuid(),
  name,
}));

validInput.push({
  id: faker.random.uuid(),
});

describe(`"${entity}" validation rules`, () => {
  test(`Fails with empty input`, () => {
    const result = validationSchema.validate({}, validationOptions);

    expect(result.error.details.length).toBe(1);
    expect(result.error.details).toContainObject(createErrorObject(errorId));
  });

  invalidIds.forEach(id => {
    const input = sample(validInput);

    test(`Fails with invalid 'id' ${describeValue(id)}`, () => {
      const result = validationSchema.validate(
        { ...input, id },
        validationOptions,
      );
      expect(result.error.details.length).toBe(1);

      expect(result.error.details).toContainObject(createErrorObject(errorId));
    });
  });

  invalidPaymentTypeNames.forEach(name => {
    const input = sample(validInput);
    // updating with undefined name is no-op
    if (name === undefined) {
      return;
    }

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
