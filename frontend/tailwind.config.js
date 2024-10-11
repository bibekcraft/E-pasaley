/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		keyframes: {
			fadeScale: {
			  '0%, 100%': { opacity: 0, transform: 'scale(0.9)' },
			  '50%': { opacity: 1, transform: 'scale(1)' },
			},
		  },
		  animation: {
			'fade-scale': 'fadeScale 3s ease-in-out infinite',
		  },
		fontFamily: {
		  sans: ['Poppins', 'sans-serif'],
		},
	  },
	},
	plugins: [],
  }