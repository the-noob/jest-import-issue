import gqlResolvers from "graphql-resolvers";

import { createdModified, isAuthenticated } from "../resolvers.js";

const { combineResolvers } = gqlResolvers;
/**
 * Get a currency record
 */
export const getCurrency = () => null;

/**
 * Get a list of currencies
 */
export const getCurrencies = () => {
  return [
    {
      id: "a8d45ece-6fb7-47ba-bd6f-a78344e641dd",
      name: "Pound sterling",
      code: "GBP",
      numeric: "826",
      digits: 2,
      symbol: "£",
      createdAt: "2020-11-14 21:00:47",
      createdBy: "4f207fb0-c543-4de7-a6d5-0720a3ad5261",
    },
    {
      id: "fd5eb82f-860e-4a54-b329-79275a7811a6",
      name: "Euro",
      code: "EUR",
      numeric: "978",
      digits: 2,
      symbol: "€",
      createdAt: "2020-11-14 21:00:47",
      createdBy: "4f207fb0-c543-4de7-a6d5-0720a3ad5261",
    },
    {
      id: "82bd2721-6fdd-4f92-ad7f-0f47fe603834",
      name: "Dollars",
      code: "USD",
      numeric: "840",
      digits: 2,
      symbol: "$",
      createdAt: "2020-11-14 21:00:47",
      createdBy: "4f207fb0-c543-4de7-a6d5-0720a3ad5261",
    },
  ];
};

const resolverMap = {
  Query: {
    currency: combineResolvers(isAuthenticated, getCurrency),
    currencies: combineResolvers(isAuthenticated, getCurrencies),
  },
  Currency: createdModified,
};

export default resolverMap;
