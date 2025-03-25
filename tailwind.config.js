export default {
    content: [
        './resources/views/**/*.edge', // Inclut tous les fichiers Edge
        './resources/js/**/*.js',     // Inclut vos fichiers JavaScript
    ],
    theme: {
        extend: {
        colors: {
            primary: {
            DEFAULT: '#5A45FF',
            lighter: '#a599ff',
            },
            secondary: {
            DEFAULT: '#FF5A45',
            lighter: '#ff9999',
            },
        },
        },
    },
    plugins: [],
};