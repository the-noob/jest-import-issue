import moment from "moment";
import gql from "graphql";

const { GraphQLScalarType, Kind, GraphQLError } = gql;

const dateFormats = [
  "YYYY-MM-DD HH:mm:ssZ",
  "YYYY-MM-DDTHH:mm:ssZ",
  "YYYY-MM-DD HH:mm:ss.SSSZ",
  "YYYY-MM-DDTHH:mm:ss.SSSZ",
  "YYYY-MM-DD HH:mm:ss.SSS+0000",
  "YYYY-MM-DDTHH:mm:ss.SSS+0000",
  "YYYY-MM-DD HH:mm:ss.SSS+00:00",
  "YYYY-MM-DDTHH:mm:ss.SSS+00:00",
];

const dateFormatsDoc = dateFormats.map(format => `> \`${format}\`  `);

const resolverMap = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: `UTC date in ISO8601 format  
${dateFormatsDoc.join("\n")}
`,
    parseValue: value => moment.utc(value, dateFormats, true).toISOString(),
    serialize: value => value, // value sent to the client
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Can only parse strings got a: ${ast.kind}`, [
          ast,
        ]);
      }

      const dateTime = moment.utc(ast.value, dateFormats, true);
      if (!dateTime.isValid()) {
        throw new GraphQLError("Not a valid ISO8601 DateTime (UTC)", [ast]);
      }

      return dateTime.toISOString();
    },
  }),
};

export default resolverMap;
