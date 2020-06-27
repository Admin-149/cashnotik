module.exports = {
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
};
