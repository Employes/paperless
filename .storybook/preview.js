import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
// import 'codemirror/lib/codemirror.css';
import './codemirror.css';
import './custom.css';

import { defineCustomElements } from '../packages/core/loader';
defineCustomElements();

import '../packages/core/dist/paperless/paperless.css';

export const parameters = {
    options: {
        storySort: {
            order: [
                'Introduction',
                ['Welcome', 'Changelog'],
                'Foundation',
                'Design system',
                [
                    'Typography',
                    'Grid',
                    'Bosons',
                    'Atoms',
                    'Molecules',
                    'Organisms',
                ],
            ],
        },
    },
    previewTabs: {
        'storybook/docs/panel': {
            title: 'Documentation',
            hidden: true,
        },
        canvas: {
            title: 'Story',
            hidden: true,
        },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
    badgesConfig: {
        stable: {
            contract: '#fff',
            color: '#1da360',
            title: 'Stable',
        },
        beta: {
            contract: '#fff',
            color: '#ffa231',
            title: 'Beta',
        },
        deprecated: {
            contract: '#fff',
            color: '#e63241',
            title: 'Deprecated',
        },
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
