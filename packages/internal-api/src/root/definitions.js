export const versionDocumentation = `
"""
Identifier for the current version of the entity
"""
`;

export const updateInputVersionDocumentation = `
"""
Last known version of the entity, used to prevent stale update overrides
"""
`;

const definition = `

scalar DateTime

type Query {
  """
  Necessary for later extension
  """
  dummy: String
}

type Mutation {
  """
  Necessary for later extension
  """
  dummy: String
}

type Subscription {
  """
  Necessary for later extension
  """
  dummy: String
}

type User {
  name: String
}

`;

export default definition;
