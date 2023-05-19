module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],  // SwitchCase is default 0, which confuses IDEs and looks ugly at the default } brace - http://bit.ly/2BtM2k1
    semi: ['error', 'always'],
    quotes: ['warn', 'single', { avoidEscape: true }],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'no-trailing-spaces': 'warn',
    'spaced-comment': ['warn', 'always'],  // start comment with a space
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'prefer-const': 'warn',
    'no-use-before-define': 'error',
    'no-shadow': 'warn',
  }
};
