# FITKLE 프로젝트 구조 분석

## 1. 프로젝트 개요

### 기술 스택
- **프레임워크**: Next.js 15.3.5 (App Router)
- **런타임**: React 19.0.0
- **언어**: TypeScript 5.x
- **스타일링**: Tailwind CSS 4.1.11
- **상태 관리**: Zustand 5.0.6
- **서버 상태**: TanStack Query 5.81.5
- **HTTP 클라이언트**: Axios 1.10.0
- **UI 라이브러리**: Material-UI 7.2.0 (부분적 사용)
- **테스팅**: Jest 30.0.4, React Testing Library 16.3.0

### 프로젝트 특징
- **아키텍처**: Clean Architecture 기반 Feature-First 구조
- **반응형**: Desktop/Mobile 대응 (Desktop 우선 구현)
- **타입 안정성**: 엄격한 TypeScript 설정
- **개발 환경**: Turbopack 사용으로 빠른 개발 서버

## 2. 폴더 구조 및 각 폴더의 역할

```
fitkle/
├── public/                    # 정적 파일
│   ├── assets/               # 이미지, 아이콘 등
│   │   └── logo/            # 브랜드 로고
│   └── fonts/               # 커스텀 폰트 (Pretendard JP)
├── src/                      # 소스 코드
│   ├── app/                 # Next.js App Router
│   ├── components/          # 공통 컴포넌트
│   ├── constants/           # 상수 정의
│   ├── features/            # 기능별 모듈
│   ├── context/             # React Context (현재 미사용)
│   ├── core/                # 핵심 유틸리티 (현재 미사용)
│   ├── theme/               # 테마 관련
│   └── need/                # 임시 파일 (삭제 예정)
├── tailwind.config.js       # Tailwind CSS 설정
├── next.config.ts           # Next.js 설정
├── tsconfig.json           # TypeScript 설정
└── package.json            # 프로젝트 의존성
```

## 3. 주요 파일들과 그 역할

### 설정 파일
- **`next.config.ts`**: 외부 이미지 도메인 설정 (picsum.photos, api.dicebear.com)
- **`tailwind.config.js`**: 커스텀 색상 팔레트, 폰트 설정
- **`tsconfig.json`**: 경로 별칭 설정 (`@/*` -> `./src/*`)
- **`globals.css`**: 전역 스타일, 폰트 정의, CSS 변수

### 핵심 파일
- **`src/app/layout.tsx`**: 루트 레이아웃, 폰트 설정
- **`src/app/page.tsx`**: 홈페이지 진입점
- **`src/constants/routes.ts`**: 라우트 경로 상수 관리
- **`src/features/store/index.ts`**: Zustand 스토어 통합 관리

## 4. 아키텍처 패턴

### Page vs Screen 컴포넌트 구조
```
src/app/page.tsx              # Next.js 페이지 (라우팅)
    ↓
src/features/home/presentation/screens/HomeScreen.tsx  # 비즈니스 로직
    ↓
src/components/layouts/MainLayout.tsx                  # 레이아웃
    ↓
src/components/home/HomeHeroSection.tsx               # UI 컴포넌트
```

### Clean Architecture 적용
```
features/
├── domain/          # 엔티티, 유스케이스
├── data/           # 데이터 레이어 (DTO, Repository)
├── presentation/   # 프레젠테이션 레이어 (Screen, Components)
└── store/          # 상태 관리
```

## 5. 상태 관리 (Zustand)

### 스토어 구조
```typescript
// src/features/store/index.ts - 통합 Export
export * from '../auth/store/authStore';
export * from '../app/store/appStore';

// 각 스토어별 역할
- authStore: 인증 상태 관리 (로그인, 로그아웃, 사용자 정보)
- appStore: 앱 전역 상태 (테마, 언어, 첫 실행 여부)
- tutorSearchStore: 튜터 검색 상태 관리
```

### 특징
- **타입 안정성**: TypeScript 인터페이스 활용
- **로컬 스토리지**: 상태 지속성 보장
- **에러 처리**: 각 액션별 에러 상태 관리
- **셀렉터**: 성능 최적화를 위한 개별 셀렉터 제공

## 6. 스타일링 (Tailwind CSS)

### 커스텀 색상 팔레트
```javascript
// tailwind.config.js
colors: {
  // 브랜드 색상
  primary: '#B7C774',
  primaryLight: '#F7FBEA',
  primaryDark: '#8A9E4E',
  
  // 중립 계열
  grayDark: '#4B5563',
  gray: '#6B7280',
  grayLight: '#D1D5DB',
  
  // 텍스트 색상
  textDefault: '#6B7280',
  textHeading: '#000000',
}
```

### 폰트 시스템
- **기본 폰트**: Pretendard JP (한국어 최적화)
- **웹 폰트**: Geist Sans, Geist Mono (Google Fonts)
- **가중치**: 100-900 전 범위 지원

### 반응형 설계
- **브레이크포인트**: `sm:`, `md:`, `lg:` 활용
- **컨테이너**: `max-w-7xl mx-auto` 중심 정렬
- **패딩**: `px-4 py-4` 기본 여백

## 7. 라우팅 구조

### App Router 구조
```
src/app/
├── page.tsx                  # 홈페이지 (/)
├── login/page.tsx           # 로그인 (/login)
├── signup/page.tsx          # 회원가입 (/signup)
├── search/page.tsx          # 검색 (/search)
├── profile/
│   └── user/
│       ├── page.tsx         # 프로필 조회 (/profile/user)
│       └── edit/page.tsx    # 프로필 편집 (/profile/user/edit)
└── test-*/                  # 개발/테스트 페이지들
```

### 라우트 관리
```typescript
// src/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_MANAGE: (nickname = ':nickname') => `/profile/${nickname}`,
  TUTOR_DETAIL: (id = ':id') => `/tutor/${id}`,
};
```

## 8. 컴포넌트 구조

### 공통 컴포넌트 (src/components/)
```
components/
├── common/                  # 기본 UI 컴포넌트
│   ├── AppButton.tsx       # 공통 버튼
│   ├── AppFormBox.tsx      # 폼 컨테이너
│   ├── Logo.tsx            # 로고 컴포넌트
│   └── NativeInputBox.tsx  # 입력 필드
├── layouts/                # 레이아웃 컴포넌트
│   ├── MainLayout.tsx      # 메인 레이아웃
│   ├── Header.tsx          # 헤더
│   └── Footer.tsx          # 푸터
├── home/                   # 홈 페이지 전용
├── login/                  # 로그인 관련
└── profile/                # 프로필 관련
```

### 기능별 컴포넌트 (src/features/)
```
features/
├── auth/                   # 인증 기능
│   ├── presentation/screens/
│   ├── store/
│   └── types/
├── search/                 # 검색 기능
│   ├── data/              # 데이터 레이어
│   ├── domain/            # 비즈니스 로직
│   ├── presentation/      # UI 컴포넌트
│   └── store/             # 상태 관리
└── tutor/                 # 튜터 관련
```

## 9. 데이터 계층 구조

### Repository Pattern
```typescript
// src/features/search/data/repositories/tutorSearchRepository.ts
- API 통신 추상화
- DTO 변환 처리
- 에러 핸들링
```

### DTO 시스템
```typescript
// src/features/search/data/dto/
- tutorSearchResponseDto.ts     # API 응답 타입
- tutorSearchDtoMapper.ts       # DTO ↔ Entity 변환
```

### Mock 데이터
```typescript
// src/features/search/data/mock/
- 개발 단계 테스트 데이터
- API 구현 전 프론트엔드 개발 지원
```

## 10. 주요 기능별 아키텍처

### 검색 기능 (features/search)
- **Domain**: 검색 파라미터, 결과 엔티티
- **Data**: API 통신, DTO 변환
- **Presentation**: 검색 화면, 결과 목록, 필터 UI
- **Store**: 검색 상태, 필터 상태 관리

### 인증 기능 (features/auth)
- **Store**: 로그인 상태, 사용자 정보
- **Presentation**: 로그인/회원가입 화면
- **Types**: 인증 관련 타입 정의

### 튜터 기능 (features/tutor)
- **Domain**: 튜터 엔티티, 유스케이스
- **Data**: 튜터 정보 API, DTO
- **Presentation**: 튜터 상세, 프로필 설정

## 11. 개발 환경 설정

### TypeScript 설정
- **엄격 모드**: `strict: true`
- **경로 별칭**: `@/*` 패턴
- **타겟**: ES2017

### 린팅 및 테스팅
- **ESLint**: Next.js 권장 설정
- **Jest**: 단위 테스트
- **React Testing Library**: 컴포넌트 테스트

### 빌드 최적화
- **Turbopack**: 개발 서버 성능 향상
- **PostCSS**: CSS 처리 파이프라인
- **자동 타입 체크**: `typecheck` 스크립트

## 12. 향후 확장 계획

### 미구현 기능
- 모바일 버전 UI
- 다국어 지원 (i18n)
- 실시간 알림
- 결제 시스템

### 최적화 계획
- 코드 스플리팅
- 이미지 최적화
- SEO 개선
- 접근성 향상

## 13. 개발 가이드라인

### 컴포넌트 작성 원칙
- 함수형 컴포넌트 사용
- 단일 책임 원칙 준수
- 재사용성 고려
- 타입 안정성 보장

### 스타일 가이드
- Tailwind CSS 우선 사용
- 일관된 색상 팔레트 활용
- 반응형 디자인 필수
- 접근성 고려

### 상태 관리 패턴
- Zustand 중심 상태 관리
- 기능별 스토어 분리
- 셀렉터 패턴 활용
- 에러 상태 관리

이 구조는 확장 가능하고 유지보수가 용이한 현대적인 React/Next.js 애플리케이션을 위한 베스트 프랙티스를 따르고 있습니다.