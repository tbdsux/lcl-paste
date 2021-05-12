module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  extends: ['eslint:recommend'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {
          version: 'detect',
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },

      extends: [
        'eslint:recommend',
        'plugin:@typescript-eslint/recommend',
        'plugin:react/recommend',
        'plugin/react-hooks/recommend',
        'plugin:jsx-a11y/recommend',
        'plugin:prettier/recommend',
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },
  ],
};
