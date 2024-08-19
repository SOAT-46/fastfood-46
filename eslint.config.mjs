import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    rules: {
      'eqeqeq': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'never'],
      'prefer-const': ['error', {'ignoreReadBeforeAssign': true}],
      'no-dupe-args': 'error',
    }
  },
  {files: ['**/*.js', '**/*.ts']},
  {ignores: ['node_modules/**']},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
