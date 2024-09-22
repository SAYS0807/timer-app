import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "rubik": ["Rubik Mono One", 'monospace']
      },
      animation: {
        'bg-moving': 'bg-move 8s ease-in-out infinite',
      },
      keyframes: {
        'bg-move': {
          '0%, 100%': {
            'background-position': '0 50%',
            'background-size': "300%",
          },
          '50%': {
            'background-position': '100% 0',
            'background-size': '300%',
          },
        }
      }
    },
  },
  plugins: [],
}
// 0%,
//   100% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
