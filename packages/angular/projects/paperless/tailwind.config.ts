import * as config from '@paperless/core/src/tailwind.config';
import path from 'path';

export default {
	...config,
	content: [path.join(__dirname, './src/**/*.{html,scss,ts}')],
};
