// C:\Users\ganil\Documents\Web_Design\React\Projects\tchala-app\eslint.config.js

// Change 'require' to 'import'
import globals from "globals";
import pluginJs from "@eslint/js";
// If you are using eslint-config-google, you likely need a specific import for it
// For example, if it exposes its config as a flat config:
// import googleConfig from "eslint-config-google"; // This might not be right, need to check its docs

export default [ // Change module.exports = to export default
  {
    // Global config (e.g., for the root of tchala-app if it has JS files)
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // Any other rules for your main project
    }
  },
  {
    // Configuration specifically for your Firebase Functions
    files: ["functions/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs", // Still 'commonjs' for your functions code
      globals: {
        ...globals.node, // Still enable Node.js globals for functions
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // If you were using 'google' from the old config:
      // This is the tricky part for flat config.
      // 'eslint-config-google' is generally for legacy configs.
      // You might need to manually port rules or find a flat-config-compatible alternative.
      // For now, leave it out or stick to eslint:recommended + custom rules for functions.
      // If you MUST use Google's config, you'd extend an existing rule set here.
      // e.g. ...someGoogleFlatConfig.rules,
    },
  },
];