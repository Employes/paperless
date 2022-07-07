const colors = require('./tailwind/colors');
const shadows = require('./tailwind/shadows');
const borderRadius = require('./tailwind/border-radius');
const grid = require('./tailwind/grid');

module.exports = {
  important: true,
  theme: {
    colors,
    boxShadow: shadows,
    dropShadow: shadows,
    borderRadius,
    extends: {
      grid,
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
};
