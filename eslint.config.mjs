import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
    "dist",
    "node_modules",
    "coverage",
    "packages/react-component-bundle/dist",
    "packages/react-component-bundle/node_modules",
    "packages/vue-component-bundle/dist",
    "packages/vue-component-bundle/node_modules",
  ],
  rules: {
    // rule overrides
    "unicorn/filename-case": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
