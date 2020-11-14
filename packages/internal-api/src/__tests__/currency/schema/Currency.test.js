import { graphql } from "graphql";
import { basename } from "path";

import schema from "../../../schema";

const entity = basename(__filename, ".test.js");

/* eslint-disable no-underscore-dangle */
describe(`"${entity}" regression testing`, () => {
  test(`Fields are as advertised`, async () => {
    const query = `
      query {
        __type(name: "${entity}") {
          name
          fields {
            name
            type {
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    `;
    const expected = [
      {
        name: "id",
        type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "ID" } },
      },
      {
        name: "name",
        type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "String" } },
      },
      {
        name: "code",
        type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "String" } },
      },
      {
        name: "numeric",
        type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "String" } },
      },
      {
        name: "digits",
        type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Int" } },
      },
      {
        name: "symbol",
        type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "String" } },
      },
      {
        name: "createdBy",
        type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "User" } },
      },
      {
        name: "createdAt",
        type: {
          kind: "NON_NULL",
          ofType: { kind: "SCALAR", name: "DateTime" },
        },
      },
      { name: "lastModifiedBy", type: { kind: "OBJECT", ofType: null } },
      { name: "lastModifiedAt", type: { kind: "SCALAR", ofType: null } },
    ];

    const result = await graphql(schema, query);
    expect(result.data.__type.fields).toEqual(expected);
  });
});
