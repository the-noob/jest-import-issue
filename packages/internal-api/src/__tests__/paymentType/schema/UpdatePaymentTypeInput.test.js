import { graphql } from "graphql";
import { basename } from "path";

import schema from "../../../schema";

const entity = basename(__filename, ".test.js");

/* eslint-disable no-underscore-dangle */
describe(`"${entity}" regression testing`, () => {
  test("Fields are as advertised", async () => {
    const query = `
      query {
        __type(name: "${entity}") {
          kind
          inputFields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    `;
    const expected = {
      kind: "INPUT_OBJECT",
      inputFields: [
        {
          name: "id",
          type: {
            name: null,
            kind: "NON_NULL",
          },
        },
        {
          name: "name",
          type: {
            kind: "SCALAR",
            name: "String",
          },
        },
      ],
    };

    const result = await graphql(schema, query);
    expect(result.data.__type).toEqual(expected);
  });
});
