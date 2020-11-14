import { UnauthenticatedError, AlreadyAuthenticatedError } from "./errors.js";

/* eslint-disable consistent-return */
export const isAuthenticated = (root, args, { viewer }) => {
  // if (!viewer) {
  //   return new UnauthenticatedError();
  // }
};

export const isNotAuthenticated = (root, args, { viewer }) => {
  if (viewer) {
    return new AlreadyAuthenticatedError();
  }
};

export const createdModified = {
  createdBy: (obj, args, { sequelize }) =>
    sequelize.users.findByPk(obj.createdBy),
  lastModifiedBy: (obj, args, { sequelize }) => {
    if (!obj.updatedBy || obj.updatedBy.length === 0) {
      return null;
    }
    return sequelize.users.findByPk(obj.updatedBy);
  },
};
