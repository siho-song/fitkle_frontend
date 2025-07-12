# API Specification

## 개요

Fitkle Frontend 프로젝트를 위한 RESTful API 명세서입니다. 이 문서는 프론트엔드와 백엔드 간의 데이터 통신을 위한 표준을 정의합니다.

## 기본 정보

- **Base URL**: `https://api.fitkle.com/v1`
- **인증 방식**: JWT Bearer Token
- **데이터 형식**: JSON
- **문자 인코딩**: UTF-8
- **API 버전**: v1

## 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": {}, // 응답 데이터
  "message": "성공 메시지 (선택사항)",
  "timestamp": "2024-01-15T09:30:00Z",
  "path": "/api/v1/endpoint",
  "method": "GET",
  "statusCode": 200
}
```

### 오류 응답
```json
{
  "success": false,
  "message": "오류 메시지",
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "필수 필드가 누락되었습니다",
      "field": "email"
    }
  ],
  "timestamp": "2024-01-15T09:30:00Z",
  "path": "/api/v1/endpoint",
  "method": "POST",
  "statusCode": 400
}
```

### 페이지네이션 응답
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## 인증 (Authentication)

### 1. 이메일 로그인
- **Endpoint**: `POST /auth/login`
- **설명**: 이메일과 비밀번호로 로그인
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": false
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "nickname": "사용자닉네임",
      "userType": "student",
      "avatar": "https://avatar.url"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  }
}
```

### 2. 회원가입
- **Endpoint**: `POST /auth/signup`
- **설명**: 새 계정 생성
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "nickname": "사용자닉네임",
  "userType": "student",
  "termsAccepted": true,
  "privacyAccepted": true,
  "marketingAccepted": false
}
```

### 3. 토큰 갱신
- **Endpoint**: `POST /auth/refresh`
- **설명**: 액세스 토큰 갱신
- **Request Body**:
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

### 4. 로그아웃
- **Endpoint**: `POST /auth/logout`
- **설명**: 로그아웃 및 토큰 무효화
- **Headers**: `Authorization: Bearer {accessToken}`

### 5. 이메일 인증
- **Endpoint**: `POST /auth/verify-email`
- **설명**: 이메일 인증 코드 발송
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```

### 6. 소셜 로그인
- **Endpoint**: `POST /auth/social`
- **설명**: 소셜 계정으로 로그인
- **Request Body**:
```json
{
  "provider": "google",
  "accessToken": "social_access_token",
  "userType": "student"
}
```

## 사용자 관리 (Users)

### 1. 프로필 조회
- **Endpoint**: `GET /users/profile`
- **설명**: 현재 사용자 프로필 조회
- **Headers**: `Authorization: Bearer {accessToken}`

### 2. 프로필 수정
- **Endpoint**: `PUT /users/profile`
- **설명**: 사용자 프로필 수정
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "nickname": "새닉네임",
  "bio": "자기소개",
  "location": {
    "country": "Korea",
    "city": "Seoul"
  },
  "preferences": {
    "notifications": {
      "email": true,
      "push": false,
      "marketing": false,
      "lesson": true
    }
  }
}
```

### 3. 비밀번호 변경
- **Endpoint**: `PUT /users/password`
- **설명**: 비밀번호 변경
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password",
  "confirmPassword": "new_password"
}
```

### 4. 아바타 업로드
- **Endpoint**: `POST /users/avatar`
- **설명**: 프로필 이미지 업로드
- **Headers**: `Authorization: Bearer {accessToken}`
- **Content-Type**: `multipart/form-data`
- **Request Body**: FormData with file

## 튜터 관리 (Tutors)

### 1. 튜터 검색
- **Endpoint**: `GET /tutors`
- **설명**: 튜터 목록 조회 및 검색
- **Query Parameters**:
  - `page`: 페이지 번호 (기본값: 1)
  - `limit`: 페이지당 항목 수 (기본값: 20)
  - `category`: 카테고리 필터
  - `search`: 검색어
  - `minPrice`: 최소 가격
  - `maxPrice`: 최대 가격
  - `minRating`: 최소 평점
  - `isOnline`: 온라인 상태 필터
  - `sortBy`: 정렬 기준 (rating, price, popularity, newest)
  - `sortOrder`: 정렬 순서 (asc, desc)

### 2. 튜터 상세 조회
- **Endpoint**: `GET /tutors/{tutorId}`
- **설명**: 특정 튜터의 상세 정보 조회
- **Response**: 튜터 정보, 포트폴리오, 리뷰, 관련 튜터 목록

### 3. 튜터 프로필 생성
- **Endpoint**: `POST /tutors/profile`
- **설명**: 튜터 프로필 생성
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "category": "programming",
  "specialties": ["React", "TypeScript"],
  "pricePerHour": 50000,
  "currency": "KRW",
  "experience": "5년",
  "education": [
    {
      "institution": "서울대학교",
      "degree": "학사",
      "field": "컴퓨터공학",
      "year": "2020"
    }
  ],
  "languages": [
    {
      "language": "Korean",
      "level": "native"
    }
  ],
  "availability": {
    "timezone": "Asia/Seoul",
    "schedule": {
      "mon": ["09:00", "10:00", "14:00"],
      "tue": ["09:00", "10:00"]
    }
  },
  "introduction": "안녕하세요..."
}
```

### 4. 튜터 포트폴리오 관리
- **Endpoint**: `POST /tutors/{tutorId}/portfolio`
- **설명**: 포트폴리오 항목 추가
- **Headers**: `Authorization: Bearer {accessToken}`

### 5. 튜터 통계
- **Endpoint**: `GET /tutors/{tutorId}/statistics`
- **설명**: 튜터 활동 통계 조회
- **Headers**: `Authorization: Bearer {accessToken}`

## 커뮤니티 (Community)

### 1. 게시글 목록
- **Endpoint**: `GET /community/posts`
- **설명**: 커뮤니티 게시글 목록 조회
- **Query Parameters**:
  - `page`: 페이지 번호
  - `limit`: 페이지당 항목 수
  - `category`: 카테고리 필터
  - `postType`: 게시글 유형 (question, tip, review, discussion)
  - `search`: 검색어
  - `tags`: 태그 필터
  - `expertOnly`: 전문가 게시글만 조회
  - `hasAnswer`: 답변 있는 게시글만 조회
  - `sortBy`: 정렬 기준

### 2. 게시글 상세 조회
- **Endpoint**: `GET /community/posts/{postId}`
- **설명**: 특정 게시글 상세 정보 조회
- **Response**: 게시글 정보, 댓글, 관련 게시글

### 3. 게시글 작성
- **Endpoint**: `POST /community/posts`
- **설명**: 새 게시글 작성
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "title": "게시글 제목",
  "content": "게시글 내용",
  "category": "programming",
  "postType": "question",
  "tags": ["React", "TypeScript"],
  "images": ["image_url_1", "image_url_2"],
  "isAnonymous": false,
  "allowComments": true
}
```

### 4. 댓글 작성
- **Endpoint**: `POST /community/posts/{postId}/comments`
- **설명**: 댓글 작성
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "content": "댓글 내용",
  "parentCommentId": "parent_comment_id",
  "isExpertAnswer": true
}
```

### 5. 게시글/댓글 상호작용
- **Endpoint**: `POST /community/posts/{postId}/interactions`
- **설명**: 좋아요, 북마크 등 상호작용
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "action": "like"
}
```

### 6. 트렌딩 콘텐츠
- **Endpoint**: `GET /community/trending`
- **설명**: 인기 게시글, 태그, 전문가 조회

## 주문/예약 (Orders)

### 1. 주문 생성
- **Endpoint**: `POST /orders`
- **설명**: 새 수업 주문 생성
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "tutorId": "tutor_id",
  "serviceType": "single",
  "sessionCount": 1,
  "pricePerSession": 50000,
  "totalPrice": 50000,
  "currency": "KRW",
  "scheduledDate": "2024-01-20",
  "scheduledTime": "14:00",
  "duration": 60,
  "timezone": "Asia/Seoul",
  "notes": "수업 요청사항",
  "paymentMethod": "card"
}
```

### 2. 주문 목록
- **Endpoint**: `GET /orders`
- **설명**: 사용자의 주문 목록 조회
- **Headers**: `Authorization: Bearer {accessToken}`
- **Query Parameters**:
  - `page`: 페이지 번호
  - `limit`: 페이지당 항목 수
  - `status`: 주문 상태 필터
  - `dateFrom`: 시작 날짜
  - `dateTo`: 종료 날짜

### 3. 주문 상세 조회
- **Endpoint**: `GET /orders/{orderId}`
- **설명**: 특정 주문의 상세 정보 조회
- **Headers**: `Authorization: Bearer {accessToken}`

### 4. 주문 취소
- **Endpoint**: `POST /orders/{orderId}/cancel`
- **설명**: 주문 취소
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "reason": "schedule_conflict",
  "description": "취소 사유 설명"
}
```

### 5. 주문 일정 변경
- **Endpoint**: `POST /orders/{orderId}/reschedule`
- **설명**: 수업 일정 변경 요청
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "newDate": "2024-01-25",
  "newTime": "15:00",
  "reason": "일정 변경 사유"
}
```

### 6. 리뷰 작성
- **Endpoint**: `POST /orders/{orderId}/review`
- **설명**: 수업 후 리뷰 작성
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "rating": 5,
  "comment": "훌륭한 수업이었습니다",
  "tags": ["친절함", "전문성"],
  "isAnonymous": false
}
```

## 채팅 (Chat)

### 1. 채팅방 목록
- **Endpoint**: `GET /chat/rooms`
- **설명**: 사용자의 채팅방 목록 조회
- **Headers**: `Authorization: Bearer {accessToken}`
- **Query Parameters**:
  - `page`: 페이지 번호
  - `limit`: 페이지당 항목 수
  - `type`: 채팅방 유형 (direct, group, order_related)
  - `hasUnread`: 읽지 않은 메시지 있는 방만 조회

### 2. 채팅방 생성
- **Endpoint**: `POST /chat/rooms`
- **설명**: 새 채팅방 생성
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "participants": ["user_id_1", "user_id_2"],
  "type": "direct",
  "orderId": "order_id",
  "title": "채팅방 제목"
}
```

### 3. 채팅방 상세 조회
- **Endpoint**: `GET /chat/rooms/{roomId}`
- **설명**: 채팅방 정보 및 메시지 조회
- **Headers**: `Authorization: Bearer {accessToken}`

### 4. 메시지 전송
- **Endpoint**: `POST /chat/rooms/{roomId}/messages`
- **설명**: 메시지 전송
- **Headers**: `Authorization: Bearer {accessToken}`
- **Request Body**:
```json
{
  "content": "메시지 내용",
  "type": "text",
  "replyToMessageId": "message_id",
  "attachments": [
    {
      "name": "file.pdf",
      "url": "file_url",
      "type": "application/pdf",
      "size": 1024000
    }
  ]
}
```

### 5. 메시지 읽음 처리
- **Endpoint**: `POST /chat/rooms/{roomId}/read`
- **설명**: 메시지 읽음 상태 업데이트
- **Headers**: `Authorization: Bearer {accessToken}`

### 6. 파일 업로드
- **Endpoint**: `POST /chat/upload`
- **설명**: 채팅용 파일 업로드
- **Headers**: `Authorization: Bearer {accessToken}`
- **Content-Type**: `multipart/form-data`

## 파일 관리 (Files)

### 1. 파일 업로드
- **Endpoint**: `POST /files/upload`
- **설명**: 일반 파일 업로드
- **Headers**: `Authorization: Bearer {accessToken}`
- **Content-Type**: `multipart/form-data`
- **Request Body**: FormData with file and metadata

### 2. 파일 정보 조회
- **Endpoint**: `GET /files/{fileId}`
- **설명**: 업로드된 파일 정보 조회

### 3. 파일 삭제
- **Endpoint**: `DELETE /files/{fileId}`
- **설명**: 파일 삭제
- **Headers**: `Authorization: Bearer {accessToken}`

## 알림 (Notifications)

### 1. 알림 목록
- **Endpoint**: `GET /notifications`
- **설명**: 사용자 알림 목록 조회
- **Headers**: `Authorization: Bearer {accessToken}`

### 2. 알림 읽음 처리
- **Endpoint**: `POST /notifications/{notificationId}/read`
- **설명**: 알림 읽음 처리
- **Headers**: `Authorization: Bearer {accessToken}`

### 3. 알림 설정
- **Endpoint**: `PUT /notifications/preferences`
- **설명**: 알림 설정 업데이트
- **Headers**: `Authorization: Bearer {accessToken}`

## 검색 (Search)

### 1. 통합 검색
- **Endpoint**: `GET /search`
- **설명**: 튜터, 게시글 통합 검색
- **Query Parameters**:
  - `q`: 검색어
  - `type`: 검색 대상 (tutors, posts, all)
  - `page`: 페이지 번호
  - `limit`: 페이지당 항목 수

### 2. 자동완성
- **Endpoint**: `GET /search/autocomplete`
- **설명**: 검색어 자동완성
- **Query Parameters**:
  - `q`: 입력된 검색어
  - `limit`: 결과 수 제한

## 통계 및 분석 (Analytics)

### 1. 대시보드 데이터
- **Endpoint**: `GET /analytics/dashboard`
- **설명**: 사용자 대시보드용 통계 데이터
- **Headers**: `Authorization: Bearer {accessToken}`

### 2. 시스템 상태
- **Endpoint**: `GET /health`
- **설명**: 시스템 상태 확인

## 오류 코드

| 코드 | 설명 |
|------|------|
| 400 | Bad Request - 잘못된 요청 |
| 401 | Unauthorized - 인증 실패 |
| 403 | Forbidden - 권한 없음 |
| 404 | Not Found - 리소스를 찾을 수 없음 |
| 409 | Conflict - 리소스 충돌 |
| 422 | Unprocessable Entity - 유효성 검사 실패 |
| 429 | Too Many Requests - 요청 한도 초과 |
| 500 | Internal Server Error - 서버 오류 |

## Rate Limiting

- **제한**: 분당 100회 요청
- **헤더**: 
  - `X-RateLimit-Limit`: 제한 수
  - `X-RateLimit-Remaining`: 남은 요청 수
  - `X-RateLimit-Reset`: 리셋 시간

## WebSocket 연결 (실시간 기능)

### 연결 URL
`wss://api.fitkle.com/ws`

### 인증
연결 시 쿼리 파라미터로 토큰 전달: `?token={accessToken}`

### 이벤트 유형

#### 채팅 관련
- `chat:message` - 새 메시지
- `chat:typing` - 타이핑 상태
- `chat:read` - 메시지 읽음
- `chat:online` - 온라인 상태

#### 주문 관련
- `order:status_change` - 주문 상태 변경
- `order:new_message` - 주문 관련 메시지

#### 알림 관련
- `notification:new` - 새 알림

## 보안

### HTTPS
모든 API 요청은 HTTPS를 통해 암호화됩니다.

### CORS
허용된 도메인에서만 API 접근이 가능합니다.

### 토큰 보안
- Access Token: 1시간 유효
- Refresh Token: 30일 유효
- JWT 알고리즘: RS256

### 입력 검증
모든 입력 데이터는 서버에서 유효성 검사를 수행합니다.

---

이 API 명세서는 Fitkle Frontend 프로젝트의 백엔드 개발을 위한 기준 문서입니다. 실제 구현 시 세부사항은 변경될 수 있습니다.