const config = require('./src/tailwind.config');

module.exports = {
  ...config,
  safelist: [
    {
      pattern: /./,
    },
  ],
  mode: 'jit',
};
