const config = require('./packages/core/src/tailwind.config');

module.exports = {
    ...config,
    content: ['./stories/**/*.{mdx,tsx}'],
};
