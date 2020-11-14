import Joi from "joi";

import { errorId } from "../../root/validation/UpdateEntity.js";

const errorName = "Invalid name - min length 2 characters";

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
};

const validationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .trim()
    .required()
    .error(() => ({
      message: errorName,
    })),
});

export { errorId, errorName, validationOptions, validationSchema };
