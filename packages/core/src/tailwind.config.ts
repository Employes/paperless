import colors from './tailwind/colors';
import shadows from './tailwind/shadows';
import borderRadius from './tailwind/border-radius';
import scale from './tailwind/scale';
import rotate from './tailwind/rotate';
import typeograhpy from './tailwind/typography';
import backdropBlur from './tailwind/backdrop-blur';
import zIndex from './tailwind/z-index';
import animation from './tailwind/animation';
import screens from './tailwind/screens';
import width from './tailwind/width';
import height from './tailwind/height';
import spacing from './tailwind/spacing';

import safeArea from './tailwind/plugins/safe-area';

export default {
	important: true,
	theme: {
		colors,
		boxShadow: shadows,
		dropShadow: shadows,
		borderRadius,
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
	],
};
