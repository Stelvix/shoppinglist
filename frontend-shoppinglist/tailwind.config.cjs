/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        primaryLight: '#DBEAFE',
        success: '#22C55E',
        bg: '#F8FAFC',
        textPrimary: '#1E293B',
        textSecondary: '#64748B'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        xl: '12px'
      }
    }
  },
  plugins: []
}
