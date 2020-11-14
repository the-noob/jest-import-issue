module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    jest: true,
  },
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["import", "react-hooks"],
  rules: {
    "lines-between-class-members": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "react/sort-comp": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "react/jsx-wrap-multilines": [
      "error",
      { declaration: false, assignment: false },
    ],
    "react/jsx-handler-names": [
      "error",
      {
        // airbnb disables this but we want it
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
