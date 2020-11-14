/**
 * Check that all schema defined types have tests (except the built in types)
 */
import { lstatSync, readdirSync, existsSync } from "fs";
import { join, basename, dirname } from "path";
import { graphql } from "graphql";
import { fileURLToPath } from "url";

import schema from "../schema.js";

const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle
const __dirname = dirname(__filename); // eslint-disable-line no-underscore-dangle

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const existingTests = [];
getDirectories(__dirname).forEach(directory => {
  const schemaDir = join(directory, "schema");

  if (existsSync(schemaDir)) {
    readdirSync(schemaDir).forEach(filename => {
      existingTests.push(basename(filename, ".test.js"));
    });
  }
});

const builtInTypes = ["ID", "String", "Int", "Boolean", "Float"];

/* eslint-disable no-underscore-dangle */
const getTypes = async () => {
  const query = `
    query {
        __schema {
          types {
            name
          }
        }
      }
    `;

  const result = await graphql(schema, query);

  return result.data.__schema.types;
};

expect.extend({
  toHaveTests(received) {
    if (builtInTypes.indexOf(received) !== -1) {
      return {
        message: () => `Type '${received}' is built-in`,
        pass: true,
      };
    }
    if (existingTests.indexOf(received) !== -1) {
      return {
        message: () => `Type '${received}' has tests`,
        pass: true,
      };
    }
    return {
      message: () => `Type '${received}' has no tests`,
      pass: false,
    };
  },
});

const skip = ["Query", "Mutation", "Subscription"];

describe("Check that all schema types have regression tests", () => {
  test("check all", done => {
    getTypes().then(types => {
      types.forEach(type => {
        /**
         * *Theoretically* entities preceded by 2 underscores
         * are part of the introspection system
         *
         * @todo remove Query / Mutation / Subscription restrictions
         */
        if (!/^__/.test(type.name) && skip.indexOf(type.name) === -1) {
          expect(type.name).toHaveTests();
        }
      });
      done();
    });
  });
});
