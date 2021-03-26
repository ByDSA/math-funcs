module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["import", "jest", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "@typescript-eslint/type-annotation-spacing": ["error", {
      after: true,
      before: false,
    }],
    "@typescript-eslint/space-infix-ops": ["error", {
      int32Hint: false,
    }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    curly: ["error", "multi-or-nest"],
    "no-plusplus": ["off"],
    "import/no-cycle": [
      "error",
      {
        maxDepth: 1,
      },
    ],
    "newline-per-chained-call": [
      "error",
      {
        ignoreChainWithDepth: 2,
      },
    ],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "object-curly-newline": [
      "error",
      {
        ImportDeclaration: "never",
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
        ObjectExpression: "always",
        ObjectPattern: "never",
      },
    ],
    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    quotes: ["error", "double"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      {
        blankLine: "never",
        prev: ["case", "default"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: ["if", "for", "while", "do"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["if", "for", "while", "do"],
      },
    ],
    "newline-before-return": "error",
    "nonblock-statement-body-position": ["error", "below"],
    "padded-blocks": ["error", "never"],
    "max-statements-per-line": [
      "error",
      {
        max: 1,
      },
    ],
    camelcase: "error",
    "no-multiple-empty-lines": "error",
    "space-in-parens": ["error", "never", {
      exceptions: ["{}"],
    }],
    "no-var": "error",
    "prefer-destructuring": "error",
    "prefer-exponentiation-operator": "error",
    "operator-assignment": ["error", "always"],
    "require-await": "error",
    "no-new-wrappers": "error",
    "no-multi-spaces": "error",
    "dot-location": "error",
    "rest-spread-spacing": ["error", "never"],
    "default-case-last": "error",
    "accessor-pairs": ["error", {
      getWithoutSet: true,
    }],
    "no-cond-assign": ["error", "always"],
    "no-mixed-operators": "error",
    "multiline-ternary": ["error", "always-multiline"],
    "space-infix-ops": "error",
    "keyword-spacing": [
      "error",
      {
        after: true,
        before: true,
      },
    ],
  },
  settings: {
    "import/no-cycle": false,
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        paths: ["src"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
