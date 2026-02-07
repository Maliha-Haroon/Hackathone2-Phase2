module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#bd00ff',
          pink: '#ff136f',
          blue: '#4285f4',
          green: '#3cba54',
          yellow: '#f4b400',
          red: '#ff1744',
        }
      },
      boxShadow: {
        neon: '0 0 10px #bd00ff, 0 0 20px #bd00ff, 0 0 30px #bd00ff',
        'neon-pink': '0 0 10px #ff136f, 0 0 20px #ff136f, 0 0 30px #ff136f',
        'neon-blue': '0 0 10px #4285f4, 0 0 20px #4285f4, 0 0 30px #4285f4',
      }
    },
  },
  plugins: [],
};