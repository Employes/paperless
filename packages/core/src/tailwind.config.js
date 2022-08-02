const colors = require('./tailwind/colors');
const shadows = require('./tailwind/shadows');
const borderRadius = require('./tailwind/border-radius');
const grid = require('./tailwind/grid');
const scale = require('./tailwind/scale');
const rotate = require('./tailwind/rotate');
const typeograhpy = require('./tailwind/typography');
const backdropBlur = require('./tailwind/backdrop-blur');
const zIndex = require('./tailwind/z-index');
const animation = require('./tailwind/animation');

module.exports = {
    important: true,
    theme: {
        colors,
        boxShadow: shadows,
        dropShadow: shadows,
        borderRadius,
        extend: {
            ...grid,
            ...animation,
            scale,
            rotate,
            fontSize: typeograhpy.fontSize,
            lineHeight: typeograhpy.lineHeight,
            backdropBlur,
            zIndex,
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};
