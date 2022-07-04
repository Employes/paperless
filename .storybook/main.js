module.exports = {
    stories: [
        '../stories/**/*.story.mdx',
        '../stories/**/*.story.@(js|jsx|ts|tsx)',
    ],
    addons: [
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
        '@geometricpanda/storybook-addon-iframe',
        '@geometricpanda/storybook-addon-badges',
    ],
    framework: '@storybook/html',
};
