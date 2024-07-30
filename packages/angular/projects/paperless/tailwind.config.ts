import { paperless } from '@paperless/core';
import path from 'path';

export default {
	important: true,
	content: [path.join(__dirname, './src/**/*.{html,scss,ts}')],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwind-scrollbar-hide'),
		paperless,
	],
};
