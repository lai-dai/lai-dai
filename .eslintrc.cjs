/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "import/no-anonymous-default-export": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-for-in-array": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
}
module.exports = config
