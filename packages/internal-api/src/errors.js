import apolloError from "apollo-errors";

const { createError } = apolloError;

// Mask any internal errors
export const UnknownError = createError("UnknownError", {
  message: "An unknown error has occurred",
});

// User should be authenticated
export const UnauthenticatedError = createError("UnauthenticatedError", {
  message: "This operation requires authentication",
});

export const UnauthorizedError = createError("UnauthorizedError", {
  message: "You don't have authorization for this operation",
});

// User is already logged in
export const AlreadyAuthenticatedError = createError(
  "AlreadyAuthenticatedError",
  {
    message: "You are already authenticated",
  },
);

// User is trying to perform an admin function
export const ForbiddenError = createError("ForbiddenError", {
  message: "You are not allowed to do that",
});
