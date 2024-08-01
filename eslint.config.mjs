import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "quotes": ['error', 'single'],
    }
  },
  {files: ['**/*.js', '**/*.ts']},
  {ignores: ['node_modules/**']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
