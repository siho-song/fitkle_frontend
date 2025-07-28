export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ 기본 색상
        white: '#ffffff',
        black: '#0f172a',  // 더 부드러운 검정
        red: '#ef4444',
        limeOlive: '#84cc16',  // 더 현대적인 라임그린

        // ✅ 브랜드 색상 (더욱 세련된 그린)
        primary: '#84cc16',      // Lime-500
        primaryLight: '#f7fee7', // Lime-50
        primaryDark: '#65a30d',  // Lime-600

        // ✅ 확장된 중립 계열 (Modern Gray Scale)
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        grayDark: '#334155',    // slate-700
        gray: '#64748b',        // slate-500
        grayLight: '#cbd5e1',   // slate-300
        grayLighter: '#f1f5f9', // slate-100
        grayBackground: '#f8fafc', // slate-50
        hintText: '#94a3b8',    // slate-400
        hoverBackground: '#f1f5f9', // slate-100

        // ✅ 상태 색상 (더 현대적)
        success: '#22c55e',     // green-500
        warning: '#f59e0b',     // amber-500
        error: '#ef4444',       // red-500
        info: '#3b82f6',        // blue-500

        // ✅ Divider, Border
        divider: '#e2e8f0',     // slate-200
        dividerGray: '#64748b', // slate-500

        // ✅ 텍스트 컬러 (더 읽기 좋게)
        textDefault: '#64748b',   // slate-500
        textMuted: '#94a3b8',     // slate-400
        textHeading: '#0f172a',   // slate-900
        textSecondary: '#475569', // slate-600
      },
      fontFamily: {
        pretendard: ['Pretendard JP', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Pretendard JP', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}; 
