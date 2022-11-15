const ts = require("rollup-plugin-ts");

const pkg = require("./package.json");
const config = require("./tsconfig.json");

export default {
  input: "./index.ts",
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: "OneTimeRnd",
      sourcemap: true,
    },
  ],
  plugins: [ts(config)],
};
