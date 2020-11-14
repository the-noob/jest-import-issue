import { graphql } from "graphql";
import { basename } from "path";

import schema from "../../../schema";

const entity = basename(__filename, ".test.js");

/* eslint-disable no-underscore-dangle */
describe(`"${entity}" regression testing`, () => {
  test("Custom definition is present", async () => {
    const query = `
      query {
        __type(name: "${entity}") {
          name
          kind
        }
      }
    `;
    const expected = {
      name: "DateTime",
      kind: "SCALAR",
    };

    const result = await graphql(schema, query);
    expect(result.data.__type).toEqual(expected);
  });
});
