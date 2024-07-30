import plugin from 'tailwindcss/plugin';

import colors from './theme/colors';
import shadows from './theme/shadows';
import borderRadius from './theme/border-radius';
import scale from './theme/scale';
import rotate from './theme/rotate';
import typeograhpy from './theme/typography';
import backdropBlur from './theme/backdrop-blur';
import zIndex from './theme/z-index';
import animation from './theme/animation';
import screens from './theme/screens';
import width from './theme/width';
import height from './theme/height';
import spacing from './theme/spacing';

import safeArea from './plugins/safe-area';
import hover from './plugins/hover';

export const paperless = plugin(
	(pluginAPI) => {
		safeArea(pluginAPI);
		hover(pluginAPI);
	},
	{
		theme: {
			colors,
			// @ts-ignore
			boxShadow: shadows,
			dropShadow: shadows,
			borderRadius,
			// @ts-ignore
			extend: {
				...animation,
				scale,
				rotate,
				fontSize: typeograhpy.fontSize,
				lineHeight: typeograhpy.lineHeight,
				backdropBlur,
				zIndex,
				screens,
				width: width.width,
				height: height.height,
				spacing,
			},
		},
		plugins: [
			require('@tailwindcss/aspect-ratio'),
			require('tailwind-scrollbar-hide'),
			safeArea,
			hover,
		],
	}
);
