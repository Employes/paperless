const config = require('@paperless/core/src/tailwind.config');
const path = require('path');

module.exports = {
    ...config,
    content: [
        path.join(__dirname, './src/**/*.{html,scss,ts}'),
        path.join(__dirname, '../paperless/src/**/*.{scss,ts}'),
    ],
};
