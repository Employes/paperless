const config = require('@paperless/core/src/tailwind.config');

module.exports = {
    ...config,
    content: ['./projects/paperless/src/**/*.{scss,ts}'],
};
