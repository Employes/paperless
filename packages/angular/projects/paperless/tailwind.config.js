const config = require('@paperless/core/src/tailwind.config');
const path = require('path');

module.exports = {
    ...config,
    content: [path.join(__dirname, './src/**/*.{scss,ts}')],
};
