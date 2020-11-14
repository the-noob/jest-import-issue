module.exports = {
  rules: {
    /**
     * https://nodejs.org/api/packages.html#packages_determining_module_system
     *
     * Node.js will treat the following as ES modules when passed to node as the initial input,
     * or when referenced by import statements within ES module code:
     * - Files ending in .mjs.
     * - Files ending in .js when the nearest parent package.json file contains a top-level "type" field with a value of "module".
     * - Strings passed in as an argument to --eval, or piped to node via STDIN, with the flag --input-type=module.
     */
    "import/extensions": ["error", "always", { js: "ignorePackages" }],
  },
};
