const colors = require('./tailwind/colors');
const shadows = require('./tailwind/shadows');
const borderRadius = require('./tailwind/border-radius');
const scale = require('./tailwind/scale');
const rotate = require('./tailwind/rotate');
const typeograhpy = require('./tailwind/typography');
const backdropBlur = require('./tailwind/backdrop-blur');
const zIndex = require('./tailwind/z-index');
const animation = require('./tailwind/animation');
const screens = require('./tailwind/screens');
const width = require('./tailwind/width');
const height = require('./tailwind/height');
const spacing = require('./tailwind/spacing');

module.exports = {
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
            maxWidth: width.maxWidth,
            height: height.height,
            spacing,
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};
