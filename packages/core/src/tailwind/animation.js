module.exports = {
    animation: {
        'fade-in': 'fadeIn .2s ease',
        'fade-out': 'fadeOut .2s ease',
        'slide-in-right': 'slideInRight .2s ease',
        'slide-in-left': 'slideInLeft .2s ease',
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
        slideInRight: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' },
        },
    },
};
