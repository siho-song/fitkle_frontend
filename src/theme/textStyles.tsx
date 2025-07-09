// src/theme/textStyles.tsx
// Flutter AppTextStyles 마이그레이션: Tailwind CSS className 조합으로 텍스트 스타일 유틸리티

export const textStyles = {
  // General Styles
  body1: 'font-pretendard text-[14px] font-medium text-textDefault',
  body2: 'font-pretendard text-[13px] font-normal text-textDefault',
  caption: 'font-pretendard text-[12px] font-normal text-textMuted',

  // Header / LogoSearchSection (Desktop)
  logoTitleDesktop: 'font-pretendard text-[32px] font-bold text-black',
  headerLeftMenuDesktop: 'font-pretendard text-[14px] font-extrabold text-black',
  headerRightMenuDesktop: 'font-pretendard text-[13px] font-semibold text-black',
  // Header / LogoSearchSection (Mobile)
  logoActionTextCompact: 'font-pretendard text-[12px] text-gray',

  // Header / CategoryBar
  categoryBarGroupTextDesktop: 'font-pretendard text-[13px] font-medium text-black',

  // Home / Hero Section
  homeHeroCategoryLabelStyle: 'font-pretendard text-[12px] font-medium text-textDefault',
  homeHeroSearchHintStyle: 'font-pretendard text-[14px] text-gray',
  homeHeroSearchInputStyle: 'font-pretendard text-[14px] text-textDefault',

  // Home / Slider Title
  sliderSectionTitleStyleMobile: 'font-pretendard text-[14px] font-bold text-textHeading',
  sliderSectionTitleStyleDesktop: 'font-pretendard text-[16px] font-bold text-textHeading',

  // Home / ProductCardSlider
  productNameStyleMobile: 'font-pretendard text-[12px] font-normal',
  productNameStyleDesktop: 'font-pretendard text-[13px] font-normal',
  productPriceStyleDesktop: 'font-pretendard text-[13px] text-red font-bold',

  // Home / KeywordTrendWidget
  keywordChipTextStyleMobile: 'font-pretendard text-[12px] font-medium text-black',

  // SearchPage (Mobile)
  searchPageTitleStyleMobile: 'font-pretendard text-[14px] font-bold text-textHeading',
  searchPageRecentWordStyleMobile: 'font-pretendard text-[12px] text-gray',

  // Footer
  footerInfoStyle: (isCompact: boolean) =>
    `font-pretendard ${isCompact ? 'text-[11px]' : 'text-[12px]'} text-grayDark`,
  footerLinkStyle: (isCompact: boolean) =>
    `font-pretendard ${isCompact ? 'text-[12px]' : 'text-[13px]'} text-gray font-medium`,
  footerDividerStyle: (isCompact: boolean) =>
    `font-pretendard ${isCompact ? 'text-[12px]' : 'text-[13px]'} text-grayLight`,
};

// 사용 예시:
// <p className={textStyles.body1}>본문</p>
// <span className={textStyles.footerInfoStyle(true)}>푸터</span> 