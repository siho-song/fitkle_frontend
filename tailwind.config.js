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
        black: '#000000',
        red: '#FF3B30',
        limeOlive: '#B7C774',

        // ✅ 브랜드 색상
        primary: '#B7C774',
        primaryLight: '#F7FBEA',
        primaryDark: '#8A9E4E',

        // ✅ 중립 계열 (Gray Scale)
        grayDark: '#4B5563',
        gray: '#6B7280',
        grayLight: '#D1D5DB',
        grayLighter: '#F3F4F6',
        grayBackground: '#FAFAFA',
        hintText: '#9CA3AF',
        hoverBackground: '#F3F4F6',

        // ✅ 상태 색상
        error: '#EF4444',

        // ✅ Divider, Border
        divider: '#D1D5DB',
        dividerGray: '#6B7280',

        // ✅ 텍스트 컬러
        textDefault: '#6B7280',      // gray
        textMuted: '#D1D5DB',        // grayLight
        textHeading: '#000000',      // black
      },
      fontFamily: {
        pretendard: ['Pretendard JP', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 