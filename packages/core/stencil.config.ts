import { angularOutputTarget as angular } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';
import tailwindConf from './src/tailwind.config';

export const config: Config = {
    namespace: 'paperless',
    globalStyle: 'src/style/paperless.scss',
    extras: {
        experimentalImportInjection: true,
    },
    plugins: [
        sass(),
        tailwind({
            // enableDebug: true,
            tailwindCssContents:
                '@tailwind utilities;@tailwind components; * { @apply box-border; }',
            tailwindConf: tailwindConf as any,
        }),
        tailwindHMR(),
        inlineSvg(),
    ],
    devServer: {
        address: '0.0.0.0',
        port: 8080,
        reloadStrategy: 'pageReload',
    },
    testing: {
        browserArgs: ['--no-sandbox'],
    },
    outputTargets: [
        angular({
            componentCorePackage: '@paperless/core',
            directivesProxyFile:
                '../angular/projects/paperless/src/lib/stencil/components.ts',
            directivesArrayFile:
                '../angular/projects/paperless/src/lib/stencil/index.ts',
            excludeComponents: ['p-table', 'p-table-definition'],
        }),
        react({
            componentCorePackage: '@paperless/core',
            proxiesFile: '../react/src/components/stencil/index.ts',
            includeDefineCustomElements: true,
        }),
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'dist-custom-elements',
        },
        {
            type: 'docs-readme',
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
        {
            type: 'www',
            dir: 'dist',
            copy: [
                { src: 'assets' },
                { src: 'tailwind.config.js' },
                { src: 'tailwind' },
                {
                    src: '**/*.i18n.*.json',
                    dest: 'assets/i18n',
                },
            ],
        },
    ],
};
