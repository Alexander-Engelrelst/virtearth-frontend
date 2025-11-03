import js from '@eslint/js'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfig } from 'eslint/config'
import ImportPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default defineConfig([{
  files: ["**/*.{js,mjs,cjs}"],
  languageOptions: {
    globals: globals.browser,
  },
  plugins: {
    js,
    vue: pluginVue,
    import: ImportPlugin
  },
  extends: ["js/recommended", skipFormatting],
  rules: {
    "no-console": ["warn", { "allow": ["error", "table"] }],
    "eqeqeq": "error",
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "prefer-const": "error",
    "no-var": "error",
    "camelcase": ["error", { "properties": "never" }],
    "no-trailing-spaces": "error",
    "curly": ["error", "multi-line", "consistent"],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "block-like", "next": "block-like" },
      { "blankLine": "always", "prev": ["if", "for", "while", "switch", "try"], "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "return" },
      { "blankLine": "always", "prev": ["const", "let"], "next": "for" },
      { "blankLine": "always", "prev": ["const", "let"], "next": "if" },
    ],
    "max-depth": ["error", { "max": 2 }],
    "no-lonely-if": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^e$" }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
        alphabetize: {order: "asc", caseInsensitive: true},
      },
    ],
  },
},
  {
    files: ["src/**/config.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
]);
