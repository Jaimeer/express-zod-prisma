module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'standard', 'plugin:@typescript-eslint/recommended',"turbo", 'prettier'],
  // extends: ["next",  "prettier"],
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
