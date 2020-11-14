// import Joi from "joi";

import {
  errorId,
  updateBaseSchema,
} from "../../root/validation/UpdateEntity.js";
import {
  errorName,
  validationSchema as AddValidationSchema,
} from "./AddPaymentTypeInput.js";

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
};

const validationSchema = updateBaseSchema
  .concat(AddValidationSchema)
  .optionalKeys("name");

export { errorId, errorName, validationOptions, validationSchema };
