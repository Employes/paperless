const colors = require('./tailwind/colors');
const shadows = require('./tailwind/shadows');
const borderRadius = require('./tailwind/border-radius');

module.exports = {
  theme: {
    colors,
    boxShadow: shadows,
    dropShadow: shadows,
    borderRadius,
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
};
