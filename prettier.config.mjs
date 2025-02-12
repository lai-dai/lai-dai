/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],

  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  trailingComma: "all",
  semi: false,
  jsxSingleQuote: false,
  bracketSameLine: true,
  arrowParens: "avoid",
  endOfLine: "lf",
  bracketSpacing: true,
};

export default config;
