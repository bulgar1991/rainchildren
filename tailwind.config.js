/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
    './node_modules/flowbite/**/*.js',
  ],
  // Отключаем Preflight чтобы не конфликтовал с Angular Material
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1704px',
        '4xl': '1920px',
      },
      colors: {
        primary: {
          DEFAULT: '#5B8AF0',
          50: '#EEF3FD',
          100: '#D4E2FB',
          200: '#A9C5F7',
          300: '#7EA8F3',
          400: '#5B8AF0',
          500: '#3A6CE8',
          600: '#2754D0',
          700: '#1D3FA6',
          800: '#142E7C',
          900: '#0B1D52',
        },
        secondary: {
          DEFAULT: '#52C99A',
          50: '#EDFAF3',
          100: '#D0F4E4',
          200: '#A1E9C9',
          300: '#72DEAE',
          400: '#52C99A',
          500: '#32B482',
          600: '#269169',
          700: '#1B6D4F',
          800: '#114A34',
          900: '#07261A',
        },
        accent: {
          DEFAULT: '#FFB547',
          50: '#FFF8EC',
          100: '#FFEFD0',
          200: '#FFDFA0',
          300: '#FFCF71',
          400: '#FFB547',
          500: '#FF9F1A',
          600: '#E08200',
          700: '#A86100',
          800: '#704100',
          900: '#382000',
        },
        success: {
          DEFAULT: '#22C55E',
          light: '#BBF7D0',
          dark: '#15803D',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FECACA',
          dark: '#B91C1C',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FDE68A',
          dark: '#B45309',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#BFDBFE',
          dark: '#1D4ED8',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      maxWidth: {
        'screen-3xl': '1704px',
        'screen-4xl': '1920px',
      },
      padding: {
        mobile: '16px',
        desktop: '32px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
