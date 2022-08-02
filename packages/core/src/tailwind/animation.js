module.exports = {
    animation: {
        'fade-in': 'fadeIn .2s ease-in-out',
        'fade-out': 'fadeOut .2s ease-in-out',
    },

    keyframes: {
        fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 100 },
        },
        fadeOut: {
            '0%': { opacity: 100 },
            '100%': { opacity: 0 },
        },
    },
};
