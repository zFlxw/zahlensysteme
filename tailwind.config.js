/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      boxShadowColor: {
        'success': '#6ab04c',
      },
      textColor: {
        'success': '#6ab04c',
        'wrong': '#eb4d4b',
        'neutral': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#262626',
        },
      },
      screens: {
        '2xs': '380px',
        'xs': '450px'
      }
    },
  },
  plugins: [],
}

