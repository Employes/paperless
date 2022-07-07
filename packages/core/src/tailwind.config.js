const colors = require('./tailwind/colors');
const shadows = require('./tailwind/shadows');
const borderRadius = require('./tailwind/border-radius');
const grid = require('./tailwind/grid');
const scale = require('./tailwind/scale');
const rotate = require('./tailwind/rotate');

module.exports = {
  important: true,
  theme: {
    colors,
    boxShadow: shadows,
    dropShadow: shadows,
    borderRadius,
    extend: {
      grid,
      scale,
      rotate,
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
};
