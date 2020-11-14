import gqlTools from "graphql-tools";
import merge from "lodash/merge.js";

import root from "./root/index.js";

import currency from "./currency/index.js";

const { makeExecutableSchema } = gqlTools;

const typeDefs = [root.definitions, currency.definitions];

export default makeExecutableSchema({
  typeDefs,
  resolvers: merge(root.resolvers, currency.resolvers),
});
