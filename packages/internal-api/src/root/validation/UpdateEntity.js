import Joi from "joi";

export const errorId = "Invalid 'id', expecting UUID v4";
export const errorVersion = "Invalid version reference";

/**
 *
 */
export const updateBaseSchema = Joi.object().keys({
  id: Joi.string()
    .guid({
      version: "uuidv4",
    })
    .required()
    .error(
      () => ({
        message: errorId,
      }),
      { self: true },
    ),
  // version: Joi.string()
  //   .guid({
  //     version: "uuidv4",
  //   })
  //   .required()
  //   .error(() => ({
  //     message: errorVersion,
  //   })),
});
