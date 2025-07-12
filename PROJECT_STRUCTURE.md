# Fitkle Frontend - 프로젝트 구조

## 개요

Fitkle Frontend는 튜터링 플랫폼을 위한 Next.js 기반 웹 애플리케이션입니다. 본 문서는 프로젝트의 전체적인 구조와 아키텍처를 상세히 설명합니다.

## 기술 스택

### 주요 기술
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Material-UI Icons
- **Package Manager**: npm

### 개발 도구
- **IDE**: Visual Studio Code 권장
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript

## 프로젝트 디렉토리 구조

```
fitkle_frontend/
├── public/                          # 정적 파일
├── src/                            # 소스 코드
│   ├── app/                        # Next.js App Router 페이지
│   │   ├── globals.css            # 글로벌 스타일
│   │   ├── layout.tsx             # 루트 레이아웃
│   │   ├── page.tsx               # 홈 페이지
│   │   ├── chat/                  # 채팅 페이지
│   │   ├── community/             # 커뮤니티 페이지
│   │   ├── customer-center/       # 고객센터 페이지
│   │   ├── favorites/             # 찜 목록 페이지
│   │   ├── friend-invite/         # 친구 초대 페이지
│   │   ├── login/                 # 로그인 페이지
│   │   ├── my-posts/              # 내가 쓴 글 페이지
│   │   ├── notification-settings/ # 알림 설정 페이지
│   │   ├── orders/                # 주문 관리 페이지
│   │   ├── post/                  # 게시글 페이지
│   │   │   ├── [id]/             # 게시글 상세
│   │   │   └── write/            # 게시글 작성
│   │   ├── profile/               # 프로필 페이지
│   │   │   ├── edit/             # 프로필 편집
│   │   │   ├── manage/           # 프로필 관리
│   │   │   └── user/             # 사용자 프로필
│   │   ├── signup/                # 회원가입 페이지
│   │   ├── tutor/                 # 튜터 상세 페이지
│   │   │   └── [id]/
│   │   └── tutors/                # 튜터 목록 페이지
│   ├── components/                # 재사용 가능한 UI 컴포넌트
│   │   ├── auth/                  # 인증 관련 컴포넌트
│   │   ├── chat/                  # 채팅 관련 컴포넌트
│   │   ├── common/                # 공통 컴포넌트
│   │   ├── community/             # 커뮤니티 관련 컴포넌트
│   │   ├── customer-center/       # 고객센터 관련 컴포넌트
│   │   ├── favorites/             # 찜 목록 관련 컴포넌트
│   │   ├── friend-invite/         # 친구 초대 관련 컴포넌트
│   │   ├── home/                  # 홈 페이지 관련 컴포넌트
│   │   ├── layouts/               # 레이아웃 컴포넌트
│   │   ├── login/                 # 로그인 관련 컴포넌트
│   │   ├── my-posts/              # 내가 쓴 글 관련 컴포넌트
│   │   ├── notification-settings/ # 알림 설정 관련 컴포넌트
│   │   ├── notification/          # 알림 관련 컴포넌트
│   │   ├── orders/                # 주문 관련 컴포넌트
│   │   ├── profile/               # 프로필 관련 컴포넌트
│   │   └── tutors/                # 튜터 관련 컴포넌트
│   ├── constants/                 # 상수 정의
│   │   ├── categories.ts          # 카테고리 정의
│   │   ├── postTypes.ts           # 게시글 유형
│   │   ├── regionMap.ts           # 지역 데이터
│   │   └── routes.ts              # 라우트 상수
│   ├── data/                      # 샘플/목업 데이터
│   │   ├── sampleCommunityData.ts # 커뮤니티 샘플 데이터
│   │   ├── sampleFavorites.ts     # 찜 목록 샘플 데이터
│   │   ├── sampleOrders.ts        # 주문 샘플 데이터
│   │   └── sampleTutors.ts        # 튜터 샘플 데이터
│   ├── dto/                       # 백엔드 연동용 DTO
│   │   ├── auth/                  # 인증 관련 DTO
│   │   ├── chat/                  # 채팅 관련 DTO
│   │   ├── common/                # 공통 DTO
│   │   ├── community/             # 커뮤니티 관련 DTO
│   │   ├── order/                 # 주문 관련 DTO
│   │   ├── tutor/                 # 튜터 관련 DTO
│   │   └── index.ts               # DTO 통합 익스포트
│   ├── features/                  # 기능별 모듈
│   │   ├── app/                   # 앱 전역 기능
│   │   ├── auth/                  # 인증 기능
│   │   ├── chat/                  # 채팅 기능
│   │   ├── community/             # 커뮤니티 기능
│   │   ├── customer-center/       # 고객센터 기능
│   │   ├── favorites/             # 찜 목록 기능
│   │   ├── friend-invite/         # 친구 초대 기능
│   │   ├── home/                  # 홈 페이지 기능
│   │   ├── my-posts/              # 내가 쓴 글 기능
│   │   ├── notification-settings/ # 알림 설정 기능
│   │   ├── orders/                # 주문 관리 기능
│   │   ├── profile/               # 프로필 관리 기능
│   │   ├── store/                 # 스토어 통합
│   │   ├── survey/                # 설문 기능
│   │   └── tutors/                # 튜터 관련 기능
│   ├── hooks/                     # 커스텀 React 훅
│   │   ├── useFormValidation.ts   # 폼 유효성 검사 훅
│   │   └── useMessageTemplates.ts # 메시지 템플릿 훅
│   ├── store/                     # Zustand 전역 상태 관리
│   │   ├── communityStore.ts      # 커뮤니티 스토어
│   │   ├── customerCenterStore.ts # 고객센터 스토어
│   │   ├── favoritesStore.ts      # 찜 목록 스토어
│   │   ├── friendInviteStore.ts   # 친구 초대 스토어
│   │   ├── myPostsStore.ts        # 내가 쓴 글 스토어
│   │   ├── notificationSettingsStore.ts # 알림 설정 스토어
│   │   ├── ordersStore.ts         # 주문 스토어
│   │   ├── postStore.ts           # 게시글 스토어
│   │   └── tutorsStore.ts         # 튜터 스토어
│   ├── types/                     # TypeScript 타입 정의
│   │   ├── api/                   # API 관련 타입
│   │   ├── components/            # 컴포넌트 관련 타입
│   │   ├── constants/             # 상수 관련 타입
│   │   ├── entities/              # 엔티티 타입
│   │   ├── store/                 # 스토어 관련 타입
│   │   ├── index.ts               # 타입 통합 익스포트
│   │   └── messageTemplate.ts     # 메시지 템플릿 타입
│   └── utils/                     # 유틸리티 함수
│       └── validation.ts          # 유효성 검사 유틸리티
├── API_SPECIFICATION.md           # API 명세서
├── PROJECT_STRUCTURE.md           # 프로젝트 구조 문서 (본 문서)
├── CLAUDE.md                      # 프로젝트 가이드라인
├── README.md                      # 프로젝트 소개
├── next.config.js                 # Next.js 설정
├── tailwind.config.ts             # Tailwind CSS 설정
├── tsconfig.json                  # TypeScript 설정
└── package.json                   # 패키지 의존성
```

## 아키텍처 패턴

### 1. 기능 기반 아키텍처 (Feature-Based Architecture)

프로젝트는 기능별로 모듈을 분리하여 관리합니다:

- **features/**: 각 기능별로 완전히 독립된 모듈
- **components/**: 기능별로 분류된 재사용 가능한 UI 컴포넌트
- **store/**: 기능별 상태 관리
- **types/**: 중앙 집중식 타입 관리

### 2. 레이어드 아키텍처 (Layered Architecture)

```
┌─────────────────────────────────┐
│        Presentation Layer       │ ← pages/, components/
├─────────────────────────────────┤
│        Business Logic Layer     │ ← features/, hooks/
├─────────────────────────────────┤
│        Data Access Layer        │ ← store/, dto/
├─────────────────────────────────┤
│        Infrastructure Layer     │ ← utils/, constants/
└─────────────────────────────────┘
```

## 주요 모듈 상세 설명

### 1. 페이지 라우팅 (`src/app/`)

Next.js 14 App Router를 사용하여 파일 기반 라우팅을 구현합니다.

**주요 페이지:**
- `/`: 홈 페이지
- `/tutors`: 튜터 목록
- `/tutor/[id]`: 튜터 상세 페이지
- `/community`: 커뮤니티 게시판
- `/post/[id]`: 게시글 상세
- `/chat`: 채팅 페이지
- `/orders`: 주문 관리
- `/profile/manage`: 프로필 관리

### 2. 컴포넌트 시스템 (`src/components/`)

재사용 가능한 UI 컴포넌트들을 기능별로 분류하여 관리합니다.

**분류 기준:**
- **common/**: 프로젝트 전반에서 사용되는 공통 컴포넌트
- **layouts/**: 페이지 레이아웃 컴포넌트
- **기능별 폴더**: 특정 기능에서만 사용되는 컴포넌트

**주요 공통 컴포넌트:**
- `Calendar`: 달력 컴포넌트
- `DatePicker`: 날짜 선택기
- `Logo`: 로고 컴포넌트
- `AppButton`: 버튼 컴포넌트

### 3. 상태 관리 (`src/store/`)

Zustand를 사용한 전역 상태 관리:

**스토어 구조:**
- `authStore`: 인증 상태 관리
- `tutorsStore`: 튜터 목록 및 필터링
- `communityStore`: 커뮤니티 게시글 관리
- `ordersStore`: 주문 상태 관리
- `favoritesStore`: 찜 목록 관리

**특징:**
- 각 스토어는 독립적으로 동작
- localStorage를 통한 데이터 영속성
- TypeScript를 통한 타입 안정성

### 4. 타입 시스템 (`src/types/`)

중앙 집중식 TypeScript 타입 정의:

**구조:**
- `entities/`: 도메인 엔티티 타입
- `components/`: 컴포넌트 Props 타입
- `store/`: 스토어 상태 타입
- `api/`: API 요청/응답 타입

### 5. 데이터 전송 객체 (`src/dto/`)

백엔드 API 연동을 위한 DTO 정의:

**구조:**
- `auth/`: 인증 관련 요청/응답 DTO
- `tutor/`: 튜터 관련 DTO
- `community/`: 커뮤니티 관련 DTO
- `order/`: 주문 관련 DTO
- `chat/`: 채팅 관련 DTO
- `common/`: 공통 응답 구조 DTO

### 6. 기능 모듈 (`src/features/`)

각 기능별로 완전히 독립된 모듈:

**모듈 구조:**
```
features/[feature-name]/
├── presentation/
│   └── screens/           # 페이지 레벨 컴포넌트
├── store/                 # 기능별 상태 관리
└── types/                 # 기능별 타입 정의
```

### 7. 상수 관리 (`src/constants/`)

애플리케이션 전반에서 사용되는 상수:

- `routes.ts`: 라우트 경로 상수
- `categories.ts`: 카테고리 정의
- `postTypes.ts`: 게시글 유형
- `regionMap.ts`: 지역 데이터

### 8. 샘플 데이터 (`src/data/`)

개발 및 테스트용 모의 데이터:

- `sampleTutors.ts`: 튜터 샘플 데이터
- `sampleCommunityData.ts`: 커뮤니티 게시글 샘플
- `sampleOrders.ts`: 주문 샘플 데이터
- `sampleFavorites.ts`: 찜 목록 샘플

## 데이터 플로우

### 1. 사용자 인터랙션 플로우

```
User Action → Component → Store → API (Future) → Store Update → UI Re-render
```

### 2. 상태 관리 플로우

```
Local State (useState) → Global State (Zustand) → Persistent Storage (localStorage)
```

### 3. 라우팅 플로우

```
URL Change → Next.js Router → Page Component → Feature Module → UI Components
```

## 스타일링 가이드

### Tailwind CSS 활용

**색상 시스템:**
- Primary: 라임 올리브 계열
- 글로벌 색상 변수를 tailwind.config.ts에서 관리

**반응형 디자인:**
- 모바일 퍼스트 접근
- Tailwind의 반응형 유틸리티 활용 (sm:, md:, lg:, xl:)

**컴포넌트 스타일:**
- 재사용 가능한 스타일 클래스 정의
- hover, focus 상태 일관성 유지

## 개발 가이드라인

### 1. 코딩 스타일

**함수형 프로그래밍:**
- React 함수 컴포넌트 사용
- 커스텀 훅을 통한 로직 분리
- 불변성 원칙 준수

**네이밍 컨벤션:**
- 컴포넌트: PascalCase
- 파일명: camelCase
- 상수: UPPER_SNAKE_CASE
- 함수/변수: camelCase

### 2. 폴더 구조 규칙

**컴포넌트 조직:**
- 기능별 폴더 분리
- index.ts를 통한 깔끔한 import
- 컴포넌트별 타입 정의 분리

**파일 명명:**
- 컴포넌트: ComponentName.tsx
- 스토어: featureStore.ts
- 타입: types.ts 또는 index.ts
- 유틸리티: functionName.ts

### 3. 상태 관리 규칙

**Zustand 스토어:**
- 기능별 스토어 분리
- 액션과 상태를 명확히 구분
- TypeScript 타입 정의 필수

**로컬 상태:**
- 컴포넌트 단위의 UI 상태만 로컬 관리
- 전역적으로 필요한 데이터는 스토어 활용

## 성능 최적화

### 1. 코드 분할

- Next.js의 자동 코드 분할 활용
- dynamic import를 통한 지연 로딩
- 페이지별 번들 최적화

### 2. 이미지 최적화

- Next.js Image 컴포넌트 사용
- 적절한 이미지 포맷 선택
- Lazy loading 적용

### 3. 상태 최적화

- 불필요한 리렌더링 방지
- 메모이제이션 적절히 활용
- 상태 구조 최적화

## 테스트 전략

### 1. 단위 테스트
- 컴포넌트 단위 테스트
- 유틸리티 함수 테스트
- 스토어 로직 테스트

### 2. 통합 테스트
- 페이지 레벨 테스트
- 사용자 시나리오 테스트
- API 연동 테스트

### 3. E2E 테스트
- 핵심 사용자 플로우 테스트
- 크로스 브라우저 테스트

## 배포 및 DevOps

### 1. 빌드 프로세스
```bash
npm run build     # 프로덕션 빌드
npm run start     # 프로덕션 서버 실행
npm run dev       # 개발 서버 실행
npm run lint      # 코드 품질 검사
```

### 2. 환경 변수
- `.env.local`: 로컬 개발 환경
- `.env.production`: 프로덕션 환경
- Next.js 환경 변수 규칙 준수

### 3. CI/CD
- Git 기반 워크플로우
- 자동화된 테스트 실행
- 배포 파이프라인 구축

## 확장성 고려사항

### 1. 모듈화
- 기능별 독립적인 모듈 구조
- 의존성 최소화
- 플러그인 형태의 기능 확장

### 2. 국제화 (i18n)
- 다국어 지원 준비
- 지역별 설정 대응
- 문화적 차이 고려

### 3. 접근성 (a11y)
- WCAG 가이드라인 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성

## 보안 고려사항

### 1. 클라이언트 보안
- XSS 방지
- CSRF 토큰 관리
- 민감한 정보 노출 방지

### 2. 데이터 검증
- 클라이언트 사이드 유효성 검사
- 서버 사이드 검증 의존
- 타입 안정성 확보

## 마이그레이션 가이드

### 1. 레거시 코드 통합
- 점진적 마이그레이션 전략
- 기존 API와의 호환성 유지
- 단계적 기능 전환

### 2. 버전 업그레이드
- 의존성 관리 전략
- 호환성 테스트
- 롤백 계획 수립

---

이 문서는 Fitkle Frontend 프로젝트의 구조를 이해하고 개발을 진행하는 데 필요한 모든 정보를 포함하고 있습니다. 프로젝트가 발전함에 따라 이 문서도 지속적으로 업데이트될 예정입니다.