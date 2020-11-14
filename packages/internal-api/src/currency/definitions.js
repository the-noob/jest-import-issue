import defaultDefinitions from "../base/defaultDefinitions.js";

const definition = `

extend type Query {
  currencies: [Currency]!
  currency(id: ID!): Currency
}

type Currency {
  id: ID!
  """
  Currency name (en_UK)
  """
  name: String!
  """
  ISO_4217 Alphabetic code
  """
  code: String!
  """
  ISO_4217 Numeric code
  """
  numeric: String!
  """
  Number of digits after the decimal separator
  """
  digits: Int!
  symbol: String!

  ${defaultDefinitions}
}


`;

export default definition;
