const postcss = require('postcss');

module.exports = {
    staticDirs: ['../packages/core/src'],
    stories: [
        '../stories/**/*.story.mdx',
        '../stories/**/*.story.@(js|jsx|ts|tsx)',
    ],
    addons: [
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-actions',
        '@storybook/addon-controls',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null,
                transcludeMarkdown: true,
            },
        },
        '@geometricpanda/storybook-addon-badges',
    ],
    framework: '@storybook/html',
};
