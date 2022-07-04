import { create } from '@storybook/theming/create';
import logo from '../packages/core/src/assets/images/paperless.png';

export default create({
    base: 'light',

    colorPrimary: '#528afa',
    colorSecondary: '#528afa',

    // UI
    appBg: 'white',
    appContentBg: 'white',
    appBorderColor: 'white',
    appBorderRadius: 4,

    // Typography
    fontBase: '"IBM Plex Sans", sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: '#51536b',
    textInverseColor: '#fcfdfe',

    // Toolbar default and active colors
    barTextColor: '#b0b2cb',
    barSelectedColor: '#528afa',
    barBorderColor: '#528afa',
    barBg: '#fcfdfe',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 3,

    brandTitle: 'Employes Style',
    brandUrl: 'https://employes.nl',
    brandImage: logo,
});
