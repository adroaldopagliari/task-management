module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "no-underscore-dangle": "off",
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "@typescript-eslint/camelcase": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "_"
    }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
};
