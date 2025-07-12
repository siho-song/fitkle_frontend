import { CommunityPost, CommunityComment } from '@/types';
import { getCategoryById } from '@/constants/categories';

// 샘플 사용자들
export const sampleUsers = {
  current: {
    id: 'user_current',
    name: '김학습자',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    type: 'student' as const
  },
  cookingExpert: {
    id: 'user_cooking_expert',
    name: '요리마스터김',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    type: 'expert' as const
  },
  fitnessExpert: {
    id: 'user_fitness_expert',
    name: '헬스트레이너박',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    type: 'expert' as const
  },
  musicExpert: {
    id: 'user_music_expert',
    name: '음악선생님이',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    type: 'expert' as const
  },
  student1: {
    id: 'user_student_1',
    name: '요리초보맘',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    type: 'student' as const
  },
  student2: {
    id: 'user_student_2',
    name: '운동좋아',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    type: 'student' as const
  }
};

// 샘플 게시글들
export const samplePosts: CommunityPost[] = [
  {
    id: 'post_1',
    title: '기타 F코드 완벽 마스터하기 - 3일만에 성공한 비법',
    content: `기타 초보자들이 가장 어려워하는 F코드! 저도 처음엔 정말 힘들었는데 이 방법으로 3일만에 깔끔하게 잡을 수 있었어요.

**1. 손가락 위치가 핵심**
- 검지손가락을 1번 프렛 전체에 올려놓기
- 중지는 3번줄 2번프렛
- 약지와 소지는 4,5번줄 3번프렛

**2. 연습 순서**
1) 먼저 검지만으로 바레 연습
2) 나머지 손가락 하나씩 추가
3) 천천히 전체 코드 완성

**3. 꿀팁들**
- 손목을 앞으로 내밀어서 압력 향상
- 엄지손가락 위치를 낮춰잡기
- 매일 5분씩이라도 꾸준히!

포기하지 마세요! 연습하면 반드시 됩니다 🎸`,
    type: 'guide',
    category: 'music',
    categoryEmoji: getCategoryById('music')?.emoji || '🎵',
    tags: ['기타', 'F코드', '초보자', '연습법'],
    authorId: sampleUsers.musicExpert.id,
    authorName: sampleUsers.musicExpert.name,
    authorAvatar: sampleUsers.musicExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
    viewCount: 234,
    likeCount: 45,
    commentCount: 12,
    bookmarkCount: 23,
    isPublished: true,
    expertInfo: {
      experience: '기타 강사 5년차',
      specialties: ['기타', '우쿨렐레', '음악이론'],
      rating: 4.9,
      studentsHelped: 150,
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'post_2',
    title: '홈트로 10kg 감량 성공한 만능 운동 루틴 공개',
    content: `안녕하세요! 6개월 동안 집에서만 운동하며 10kg 감량에 성공한 후기를 나누려고 합니다.

**운동 루틴 (주 5일, 40분)**
- 월/수/금: 근력 운동 (30분) + 유산소 (10분)
- 화/목: 전신 유산소 40분
- 주말: 스트레칭 또는 요가

**다이어트 핵심**
1. 하루 1500-1600kcal 섭취
2. 단백질 청소하고 채소 많이
3. 저녁 6시 이후 금식

**성공 비결**
- 꿈의 멸치 사진 붙여두기
- 매일 아침 체중 측정 및 기록
- 스트레스 받을 때 운동으로 해소!

포기하지 말고 꿈의 몸매 만들어요! 💪`,
    type: 'guide',
    category: 'fitness',
    categoryEmoji: getCategoryById('fitness')?.emoji || '💪',
    tags: ['홈트', '다이어트', '운동', '감량'],
    authorId: sampleUsers.fitnessExpert.id,
    authorName: sampleUsers.fitnessExpert.name,
    authorAvatar: sampleUsers.fitnessExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-14T14:20:00.000Z',
    updatedAt: '2024-01-14T14:20:00.000Z',
    viewCount: 189,
    likeCount: 32,
    commentCount: 8,
    bookmarkCount: 18,
    isPublished: true,
    expertInfo: {
      experience: '퍼스널트레이너 7년차',
      specialties: ['홈트레이닝', '요가', '필라테스'],
      rating: 4.8,
      studentsHelped: 98,
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'post_3',
    title: '아보카도 최고 마요네즈 만드는 비법 알려주세요',
    content: `안녕하세요! 요리 초보인데 SNS에서 보는 그 부드럽고 크리미한 아보카도 마요네즈를 만들고 싶어요!

**지금까지 시도해본 것들:**
- 아보카도 + 마요네즈 섞기 → 너무 묽어짐
- 아보카도 으깨서 + 올리브오일 → 맛이 이상함
- 레몬즙 넣어봤는데 → 색깔이 변해버림

**궁금한 점들:**
1. 아보카도 숙성도는 어느 정도가 좋나요?
2. 마요네즈 비율은 어떻게 맞춰야 하나요?
3. 색깔 변하지 않게 보관하는 방법은?
4. 다른 비밀 재료가 있나요?

진짜 맛있는 아보카도 마요네즈 레시피 좀 알려주세요! 🥑`,
    type: 'question',
    category: 'cooking',
    categoryEmoji: getCategoryById('cooking')?.emoji || '🍳',
    tags: ['아보카도', '마요네즈', '요리', '레시피'],
    authorId: sampleUsers.student1.id,
    authorName: sampleUsers.student1.name,
    authorAvatar: sampleUsers.student1.avatar,
    authorType: 'student',
    createdAt: '2024-01-13T16:45:00.000Z',
    updatedAt: '2024-01-13T16:45:00.000Z',
    viewCount: 156,
    likeCount: 8,
    commentCount: 15,
    bookmarkCount: 5,
    isPublished: true,
  },
  {
    id: 'post_4',
    title: '오늘 첫 기타 온라인 수업을 들었습니다! 🎉',
    content: `안녕하세요! 오늘 Fitkle에서 첫 번째 기타 수업을 들었는데 정말 좋았어요!

**수업 내용:**
- 기타 기초 자세와 피크 잡는 법
- 기본 코드 3개 배우기 (C, G, Am)
- 간단한 스트로킹 패턴

**느낀 점:**
- 튜터님이 정말 친절하고 이해하기 쉽게 설명해주셨어요
- 실습 위주라서 지루하지 않았습니다
- 질문할 때마다 자세히 답변해주셔서 감사했어요

다음 주에는 F코드에 도전해볼 예정인데 벌써 기대됩니다!

같이 음악 공부하시는 분들, 화이팅! 🎸`,
    type: 'tip',
    category: 'music',
    categoryEmoji: getCategoryById('music')?.emoji || '🎵',
    tags: ['후기', '기타', '온라인수업', '초보자'],
    authorId: sampleUsers.current.id,
    authorName: sampleUsers.current.name,
    authorAvatar: sampleUsers.current.avatar,
    authorType: 'student',
    createdAt: '2024-01-12T20:30:00.000Z',
    updatedAt: '2024-01-12T20:30:00.000Z',
    viewCount: 89,
    likeCount: 12,
    commentCount: 6,
    bookmarkCount: 2,
    isPublished: true,
  },
  {
    id: 'post_5',
    title: '김치볶음밥 완벽하게 만드는 꿀팁 5가지',
    content: `집에서 만드는 김치볶음밥, 맛집 저리가라! 10년 요리 경력으로 터득한 꿀팁들을 공유해요.

**1. 김치가 핵심이다**
- 신김치보다는 묵은김치 사용
- 김치 국물까지 함께 넣기
- 김치는 잘게 썰어서 볶아주기

**2. 밥 준비의 기술**
- 차가운 밥이 더 좋아요 (냉장고에서 하룻밤)
- 밥알이 뭉치지 않게 미리 풀어두기
- 밥에 참기름 1방울 섞어두기

**3. 볶는 순서가 중요**
1) 팬에 기름 → 김치 먼저 볶기
2) 고기나 햄 추가 → 김치와 볶기
3) 밥 넣고 고루 섞기 → 간장으로 색내기

**4. 마지막 마무리**
- 계란후라이는 따로 구워서 올리기
- 참기름 한 방울과 통깨 뿌리기

이렇게 하면 진짜 맛있는 김치볶음밥 완성! 🍚`,
    type: 'tip',
    category: 'cooking',
    categoryEmoji: getCategoryById('cooking')?.emoji || '🍳',
    tags: ['김치볶음밥', '요리팁', '한식', '집밥'],
    authorId: sampleUsers.cookingExpert.id,
    authorName: sampleUsers.cookingExpert.name,
    authorAvatar: sampleUsers.cookingExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-11T11:15:00.000Z',
    updatedAt: '2024-01-11T11:15:00.000Z',
    viewCount: 203,
    likeCount: 28,
    commentCount: 9,
    bookmarkCount: 15,
    isPublished: true,
    expertInfo: {
      experience: '요리 강사 7년차',
      specialties: ['한식', '중식', '양식'],
      rating: 4.8,
      studentsHelped: 98,
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'post_6',
    title: '운동 초보자 체중 감량 언제부터 시작해야 할까요?',
    content: `운동을 시작하려고 하는데 체중 감량에 대해 질문이 있습니다.

**현재 상황:**
- 운동 경험이 전혀 없는 완전 초보에요
- 키 165cm에 몸무게 70kg 정도
- 앉아서 일하는 직업이라 체력이 많이 부족해요

**구체적인 질문:**
1. 운동과 다이어트 중 어떤 걸 먼저 시작해야 하나요?
2. 헬스장 vs 홈트레이닝 뭐가 더 좋을까요?
3. 몇 개월 정도 해야 효과를 볼 수 있나요?

완전 초보도 따라할 수 있는 팁 좀 알려주세요! 🙏`,
    type: 'question',
    category: 'fitness',
    categoryEmoji: getCategoryById('fitness')?.emoji || '💪',
    tags: ['운동', '다이어트', '초보자', '체중감량'],
    authorId: sampleUsers.student2.id,
    authorName: sampleUsers.student2.name,
    authorAvatar: sampleUsers.student2.avatar,
    authorType: 'student',
    createdAt: '2024-01-10T09:20:00.000Z',
    updatedAt: '2024-01-10T09:20:00.000Z',
    viewCount: 134,
    likeCount: 6,
    commentCount: 11,
    bookmarkCount: 8,
    isPublished: true,
    isResolved: true,
  },
  {
    id: 'post_7',
    title: '이음악 선생님과 첫 피아노 수업 후기',
    content: `안녕하세요! 오늘 이음악 선생님과 첫 번째 피아노 수업을 받았는데 정말 만족스러웠어요!

**수업 내용:**
- 피아노 기본 자세와 손가락 위치
- 도레미파솔라시도 계이름
- 간단한 동요 "나비야" 연주
- 악보 읽는 기초 방법

**선생님에 대한 평가:**
⭐⭐⭐⭐⭐ (5/5점)

**좋았던 점:**
- 어려운 개념을 쉽게 설명해주셨어요
- 실습 위주로 진행해서 지루하지 않았습니다
- 질문할 때마다 친절하게 답변해주셨어요
- 개인 맞춤형 피드백을 받을 수 있었어요

**아쉬웠던 점:**
- 시간이 너무 빨리 지나갔어요 (좋은 의미에서!)
- 더 많은 실습 문제를 풀어보고 싶었어요

**다음 수업 계획:**
- 양손으로 간단한 곡 연주하기
- 리듬감 익히기

정말 추천드리는 선생님이에요! 다음 수업도 기대됩니다 🎹✨`,
    type: 'tip',
    category: 'music',
    categoryEmoji: '🎵',
    tags: ['후기', '피아노', '음악', '이음악', '온라인수업'],
    authorId: sampleUsers.current.id,
    authorName: sampleUsers.current.name,
    authorAvatar: sampleUsers.current.avatar,
    authorType: 'student',
    createdAt: '2024-01-16T19:30:00.000Z',
    updatedAt: '2024-01-16T19:30:00.000Z',
    viewCount: 67,
    likeCount: 15,
    commentCount: 4,
    bookmarkCount: 3,
    isPublished: true,
  },
  {
    id: 'post_8',
    title: '박헬스 선생님 요가 수업 2주차 후기',
    content: `박헬스 선생님과 함께한 요가 수업 2주차 후기를 남겨요!

**이번 주 수업 내용:**
- 기본 요가 자세 심화 과정
- 호흡법과 명상 기법
- 스트레칭 시퀀스 배우기
- 체형별 맞춤 요가 동작

**선생님 평가:**
⭐⭐⭐⭐⭐ (5/5점)

**새로 배운 것들:**
1. **올바른 호흡법** - 복식호흡이 이렇게 중요할 줄 몰랐어요!
2. **자세 교정** - 일상생활에서 틀어진 자세를 바로잡는 방법
3. **몸과 마음의 연결** - 요가는 단순한 운동이 아니라는 것을 깨달았어요

**실습 내용:**
- 태양 인사 동작 마스터하기
- 개별 체형에 맞는 자세 찾기
- 집에서도 할 수 있는 루틴 구성

**성장한 부분:**
- 전보다 유연성이 눈에 띄게 좋아졌어요
- 스트레스 해소와 집중력이 향상되었습니다
- 일상에서도 자연스럽게 올바른 자세를 유지해요!

다음 주에는 고급 요가 동작에 도전한다고 하니 더욱 기대됩니다! 🧘‍♀️`,
    type: 'tip',
    category: 'fitness',
    categoryEmoji: getCategoryById('fitness')?.emoji || '💪',
    tags: ['후기', '요가', '운동', '박헬스', '스트레칭'],
    authorId: sampleUsers.current.id,
    authorName: sampleUsers.current.name,
    authorAvatar: sampleUsers.current.avatar,
    authorType: 'student',
    createdAt: '2024-01-09T21:15:00.000Z',
    updatedAt: '2024-01-09T21:15:00.000Z',
    viewCount: 89,
    likeCount: 12,
    commentCount: 3,
    bookmarkCount: 5,
    isPublished: true,
  }
];

// 샘플 댓글들
export const sampleComments: CommunityComment[] = [
  // post_1 (기타 F코드 가이드)의 댓글들
  {
    id: 'comment_1_1',
    postId: 'post_1',
    content: '정말 유용한 가이드네요! 특히 손가락 위치 부분이 도움이 많이 되었어요. 바레 코드 연습할 때 주의할 점이 더 있을까요?',
    authorId: sampleUsers.student1.id,
    authorName: sampleUsers.student1.name,
    authorAvatar: sampleUsers.student1.avatar,
    authorType: 'student',
    createdAt: '2024-01-15T11:15:00.000Z',
    updatedAt: '2024-01-15T11:15:00.000Z',
    likeCount: 3,
    childrenCount: 1,
    isDeleted: false
  },
  {
    id: 'comment_1_2',
    postId: 'post_1',
    content: 'useCallback은 함수를 자식 컴포넌트에 props로 전달할 때 주로 사용합니다. 함수가 매번 새로 생성되는 것을 방지해서 불필요한 리렌더링을 막아줘요!\n\n```javascript\nconst memoizedCallback = useCallback(\n  () => {\n    doSomething(a, b);\n  },\n  [a, b],\n);\n```\n\n이렇게 사용하시면 a, b가 변경될 때만 함수가 새로 생성됩니다.',
    authorId: sampleUsers.musicExpert.id,
    authorName: sampleUsers.musicExpert.name,
    authorAvatar: sampleUsers.musicExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-15T11:45:00.000Z',
    updatedAt: '2024-01-15T11:45:00.000Z',
    likeCount: 8,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_1_1',
    expertInfo: {
      experience: '기타 강사 5년차',
      specialties: ['기타', '우쿨렐레', '음악이론'],
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'comment_1_3',
    postId: 'post_1',
    content: '저도 의존성 배열 때문에 버그가 많이 생겼었는데, 이 글 보고 많이 배웠습니다. ESLint 규칙 설정도 꼭 해봐야겠어요!',
    authorId: sampleUsers.student2.id,
    authorName: sampleUsers.student2.name,
    authorAvatar: sampleUsers.student2.avatar,
    authorType: 'student',
    createdAt: '2024-01-15T14:20:00.000Z',
    updatedAt: '2024-01-15T14:20:00.000Z',
    likeCount: 2,
    childrenCount: 0,
    isDeleted: false
  },

  // post_3 (JavaScript 비동기 질문)의 댓글들
  {
    id: 'comment_3_1',
    postId: 'post_3',
    content: '좋은 질문이네요! Promise와 async/await는 사실 같은 비동기 처리를 다른 문법으로 표현한 것입니다.\n\n**주요 차이점:**\n1. **가독성**: async/await가 더 직관적\n2. **에러 처리**: try/catch vs .catch()\n3. **디버깅**: async/await가 더 쉬움\n\n일반적으로 async/await 사용을 권장합니다!',
    authorId: sampleUsers.musicExpert.id,
    authorName: sampleUsers.musicExpert.name,
    authorAvatar: sampleUsers.musicExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-13T17:30:00.000Z',
    updatedAt: '2024-01-13T17:30:00.000Z',
    likeCount: 12,
    childrenCount: 2,
    isDeleted: false,
    isMarkedAsAnswer: true,
    expertInfo: {
      experience: '기타 강사 5년차',
      specialties: ['기타', '우쿨렐레', '음악이론'],
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'comment_3_2',
    postId: 'post_3',
    content: '에러 처리 예시도 보여드릴게요!\n\n```javascript\n// async/await 에러 처리\ntry {\n  const response = await fetch(\'/api/data\');\n  const data = await response.json();\n  console.log(data);\n} catch (error) {\n  console.error(\'에러 발생:\', error);\n}\n\n// Promise 에러 처리\nfetch(\'/api/data\')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(\'에러 발생:\', error));\n```',
    authorId: sampleUsers.musicExpert.id,
    authorName: sampleUsers.musicExpert.name,
    authorAvatar: sampleUsers.musicExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-13T17:45:00.000Z',
    updatedAt: '2024-01-13T17:45:00.000Z',
    likeCount: 7,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_3_1',
    expertInfo: {
      experience: '기타 강사 5년차',
      specialties: ['기타', '우쿨렐레', '음악이론'],
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'comment_3_3',
    postId: 'post_3',
    content: '와! 정말 자세한 설명 감사합니다. 이제 차이점이 확실히 이해되었어요. async/await로 연습해보겠습니다! 🙏',
    authorId: sampleUsers.student1.id,
    authorName: sampleUsers.student1.name,
    authorAvatar: sampleUsers.student1.avatar,
    authorType: 'student',
    createdAt: '2024-01-13T18:10:00.000Z',
    updatedAt: '2024-01-13T18:10:00.000Z',
    likeCount: 1,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_3_1'
  },

  // post_4 (첫 수업 후기)의 댓글들
  {
    id: 'comment_4_1',
    postId: 'post_4',
    content: '첫 수업 완주 축하드려요! 🎉 저도 처음 시작할 때가 생각나네요. 계속 꾸준히 하시면 분명 실력이 늘 거예요!',
    authorId: sampleUsers.student2.id,
    authorName: sampleUsers.student2.name,
    authorAvatar: sampleUsers.student2.avatar,
    authorType: 'student',
    createdAt: '2024-01-12T21:00:00.000Z',
    updatedAt: '2024-01-12T21:00:00.000Z',
    likeCount: 4,
    childrenCount: 1,
    isDeleted: false
  },
  {
    id: 'comment_4_2',
    postId: 'post_4',
    content: '감사합니다! 정말 재미있어서 다음 수업이 기대돼요. 같이 열심히 해봐요! 💪',
    authorId: sampleUsers.current.id,
    authorName: sampleUsers.current.name,
    authorAvatar: sampleUsers.current.avatar,
    authorType: 'student',
    createdAt: '2024-01-12T21:15:00.000Z',
    updatedAt: '2024-01-12T21:15:00.000Z',
    likeCount: 2,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_4_1'
  },

  // post_6 (TypeScript Generic 질문)의 댓글들
  {
    id: 'comment_6_1',
    postId: 'post_6',
    content: 'Generic은 "재사용 가능한 컴포넌트"를 만들 때 사용합니다!\n\n**간단한 예시:**\n```typescript\n// Generic 없이\nfunction getFirstString(arr: string[]): string {\n  return arr[0];\n}\n\nfunction getFirstNumber(arr: number[]): number {\n  return arr[0];\n}\n\n// Generic 사용\nfunction getFirst<T>(arr: T[]): T {\n  return arr[0];\n}\n\nconst firstString = getFirst([\"a\", \"b\", \"c\"]); // string\nconst firstNumber = getFirst([1, 2, 3]); // number\n```\n\n하나의 함수로 여러 타입을 다룰 수 있어요!',
    authorId: sampleUsers.musicExpert.id,
    authorName: sampleUsers.musicExpert.name,
    authorAvatar: sampleUsers.musicExpert.avatar,
    authorType: 'expert',
    createdAt: '2024-01-10T10:30:00.000Z',
    updatedAt: '2024-01-10T10:30:00.000Z',
    likeCount: 15,
    childrenCount: 1,
    isDeleted: false,
    isMarkedAsAnswer: true,
    expertInfo: {
      experience: '기타 강사 5년차',
      specialties: ['기타', '우쿨렐레', '음악이론'],
      badgeType: 'verified_tutor'
    }
  },
  {
    id: 'comment_6_2',
    postId: 'post_6',
    content: '오! 이제 이해됐어요. 같은 로직을 여러 타입에 적용할 때 사용하는 거군요. 정말 감사합니다! 🙏',
    authorId: sampleUsers.student2.id,
    authorName: sampleUsers.student2.name,
    authorAvatar: sampleUsers.student2.avatar,
    authorType: 'student',
    createdAt: '2024-01-10T11:00:00.000Z',
    updatedAt: '2024-01-10T11:00:00.000Z',
    likeCount: 3,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_6_1'
  },

  // post_7 (이코딩 선생님 프로그래밍 수업 후기)의 댓글들
  {
    id: 'comment_7_1',
    postId: 'post_7',
    content: '정말 좋은 후기네요! 저도 이코딩 선생님 수업을 고려하고 있었는데 도움이 되었어요. 혹시 수업료는 어느 정도인지 물어봐도 될까요?',
    authorId: sampleUsers.student1.id,
    authorName: sampleUsers.student1.name,
    authorAvatar: sampleUsers.student1.avatar,
    authorType: 'student',
    createdAt: '2024-01-16T20:15:00.000Z',
    updatedAt: '2024-01-16T20:15:00.000Z',
    likeCount: 2,
    childrenCount: 1,
    isDeleted: false
  },
  {
    id: 'comment_7_2',
    postId: 'post_7',
    content: '수업료는 개인 메시지로 알려드릴게요! 정말 추천드려요 😊',
    authorId: sampleUsers.current.id,
    authorName: sampleUsers.current.name,
    authorAvatar: sampleUsers.current.avatar,
    authorType: 'student',
    createdAt: '2024-01-16T20:30:00.000Z',
    updatedAt: '2024-01-16T20:30:00.000Z',
    likeCount: 1,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_7_1'
  },
  {
    id: 'comment_7_3',
    postId: 'post_7',
    content: '이런 상세한 후기 정말 도움이 돼요! 저도 선생님께 수업 문의 드려봐야겠어요 👍',
    authorId: sampleUsers.student2.id,
    authorName: sampleUsers.student2.name,
    authorAvatar: sampleUsers.student2.avatar,
    authorType: 'student',
    createdAt: '2024-01-16T21:00:00.000Z',
    updatedAt: '2024-01-16T21:00:00.000Z',
    likeCount: 0,
    childrenCount: 0,
    isDeleted: false
  },

  // post_8 (박디자인 선생님 UI/UX 수업 후기)의 댓글들
  {
    id: 'comment_8_1',
    postId: 'post_8',
    content: 'UI/UX 수업 후기 잘 읽었어요! Auto Layout 부분이 특히 궁금한데, 어떤 부분이 가장 유용했나요?',
    authorId: sampleUsers.student1.id,
    authorName: sampleUsers.student1.name,
    authorAvatar: sampleUsers.student1.avatar,
    authorType: 'student',
    createdAt: '2024-01-09T22:00:00.000Z',
    updatedAt: '2024-01-09T22:00:00.000Z',
    likeCount: 1,
    childrenCount: 1,
    isDeleted: false
  },
  {
    id: 'comment_8_2',
    postId: 'post_8',
    content: 'Auto Layout으로 버튼 크기가 자동으로 조절되는 부분이 정말 신기했어요! 반응형 디자인할 때 시간이 엄청 단축되더라구요 ✨',
    authorId: sampleUsers.current.id,
    authorName: sampleUsers.current.name,
    authorAvatar: sampleUsers.current.avatar,
    authorType: 'student',
    createdAt: '2024-01-09T22:15:00.000Z',
    updatedAt: '2024-01-09T22:15:00.000Z',
    likeCount: 2,
    childrenCount: 0,
    isDeleted: false,
    parentCommentId: 'comment_8_1'
  }
];

// 샘플 상호작용들 (좋아요, 북마크 등)
export const sampleInteractions = [
  // 현재 사용자의 상호작용
  { userId: 'user_current', postId: 'post_1', type: 'like' as const, createdAt: '2024-01-15T12:00:00.000Z' },
  { userId: 'user_current', postId: 'post_1', type: 'bookmark' as const, createdAt: '2024-01-15T12:00:00.000Z' },
  { userId: 'user_current', postId: 'post_2', type: 'like' as const, createdAt: '2024-01-14T15:00:00.000Z' },
  { userId: 'user_current', postId: 'post_5', type: 'bookmark' as const, createdAt: '2024-01-11T12:00:00.000Z' },
  { userId: 'user_current', commentId: 'comment_3_1', type: 'like' as const, createdAt: '2024-01-13T18:00:00.000Z' },
  { userId: 'user_current', commentId: 'comment_7_1', type: 'like' as const, createdAt: '2024-01-16T20:45:00.000Z' },
  { userId: 'user_current', commentId: 'comment_8_2', type: 'like' as const, createdAt: '2024-01-09T22:30:00.000Z' },
  
  // 다른 사용자들의 상호작용 (통계용)
  { userId: 'user_student_1', postId: 'post_1', type: 'like' as const, createdAt: '2024-01-15T11:00:00.000Z' },
  { userId: 'user_student_2', postId: 'post_1', type: 'like' as const, createdAt: '2024-01-15T13:00:00.000Z' },
  { userId: 'user_expert_2', postId: 'post_3', type: 'like' as const, createdAt: '2024-01-13T18:30:00.000Z' },
];

// 초기 데이터 로딩 함수
export const loadSampleData = () => {
  return {
    posts: samplePosts,
    comments: sampleComments,
    interactions: sampleInteractions,
    users: sampleUsers
  };
};