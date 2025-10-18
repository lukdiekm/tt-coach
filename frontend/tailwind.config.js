/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B4F9C',
        'primary-light': '#1562b8',
        success: '#2d9c0b',
        'success-light': '#35b80d',
        background: '#1e1e1e',
        'background-light': '#2d2d2d',
        'background-lighter': '#3d3d3d',
      },
    },
  },
  plugins: [],
}