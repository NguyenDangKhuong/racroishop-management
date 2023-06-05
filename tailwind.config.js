module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          // primary: '#a991f7',
          // secondary: '#f6d860',
          // accent: '#37cdbe',
          // neutral: '#3d4451',
          // 'base-100': '#ffffff'
        }
      },
      'light'
    ]
  }
}
