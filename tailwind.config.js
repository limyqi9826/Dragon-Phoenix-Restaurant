module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: '#D4AF37',
        'golden-dark': '#B38B2D',
        'red-900': '#7F1D1D',
      },
      fontFamily: {
        cursive: ['"Ma Shan Zheng"', 'cursive'],
      },
      backgroundImage: {
        'hero-bg': "url('../public/images/hero-bg.jpg')",
        'chinese-pattern': "url('../public/images/chinese-pattern.jpg')",
        'watercolor-pattern': "url('../public/images/watercolor-pattern.jpg')",
      },
    },
  },
  plugins: [],
};