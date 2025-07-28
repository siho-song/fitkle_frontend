import { Portfolio } from '@/types';

export const samplePortfolios: Portfolio[] = [
  // 김민수 (프로그래밍) 포트폴리오
  {
    id: 'portfolio_001_1',
    tutorId: 'tutor_001',
    title: '네이버 메인 페이지 리뉴얼',
    content: 'React와 Next.js를 활용한 네이버 메인 페이지 전면 리뉴얼 프로젝트입니다. 사용자 경험 개선과 성능 최적화에 중점을 두었으며, 월 1억 방문자가 사용하는 서비스의 안정성과 속도를 크게 개선했습니다. 새로운 컴포넌트 시스템 도입으로 개발 효율성을 40% 향상시켰습니다.',
    period: '2023년 9월 - 2023년 12월',
    media: [
      {
        id: 'media_001_1_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
        description: '리뉴얼된 네이버 메인 페이지의 새로운 디자인과 레이아웃'
      },
      {
        id: 'media_001_1_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
        description: '개발팀과 함께 코드 리뷰 및 성능 최적화를 논의하는 모습'
      }
    ],
    createdAt: '2023-12-15T09:00:00Z',
    updatedAt: '2023-12-15T09:00:00Z'
  },
  {
    id: 'portfolio_001_2',
    tutorId: 'tutor_001',
    title: 'E-commerce 플랫폼 구축',
    content: '중소기업을 위한 완전한 E-commerce 솔루션을 개발했습니다. 결제 시스템부터 관리자 대시보드까지 포함하며, 모바일 우선 반응형 디자인으로 구현했습니다. 6개월 운영 결과 매출 300% 증가와 고객 만족도 95%를 달성했습니다.',
    period: '2023년 6월 - 2023년 8월',
    media: [
      {
        id: 'media_001_2_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        description: '완성된 E-commerce 플랫폼의 메인 쇼핑 인터페이스'
      },
      {
        id: 'media_001_2_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        description: '관리자 대시보드에서 실시간 판매 데이터를 확인하는 화면'
      }
    ],
    createdAt: '2023-08-20T14:00:00Z',
    updatedAt: '2023-08-20T14:00:00Z'
  },

  // 이영희 (디자인) 포트폴리오
  {
    id: 'portfolio_002_1',
    tutorId: 'tutor_002',
    title: 'Google Material Design 3.0',
    content: 'Google의 Material Design 3.0 시스템 구축에 핵심 멤버로 참여했습니다. 새로운 컴포넌트 디자인과 가이드라인을 제작하여 전 세계 수백만 개발자들이 사용하는 디자인 시스템을 개선했습니다. 특히 접근성과 다크모드 지원을 강화했습니다.',
    period: '2023년 7월 - 2023년 10월',
    media: [
      {
        id: 'media_002_1_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
        description: 'Material Design 3.0의 새로운 컴포넌트 시스템 설계안'
      },
      {
        id: 'media_002_1_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop',
        description: 'Google 디자인팀과 함께 새로운 가이드라인을 검토하는 장면'
      }
    ],
    createdAt: '2023-10-25T11:00:00Z',
    updatedAt: '2023-10-25T11:00:00Z'
  },
  {
    id: 'portfolio_002_2',
    tutorId: 'tutor_002',
    title: '핀테크 모바일 앱 디자인',
    content: '핀테크 스타트업의 모바일 뱅킹 앱 전체 UI/UX를 디자인했습니다. 사용자 테스트를 통해 최적화된 인터페이스를 구현했으며, 금융 서비스의 복잡함을 직관적인 디자인으로 해결했습니다. 출시 후 앱스토어 평점 4.8점을 기록했습니다.',
    period: '2023년 4월 - 2023년 6월',
    media: [
      {
        id: 'media_002_2_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
        description: '모바일 뱅킹 앱의 직관적인 메인 대시보드 화면'
      },
      {
        id: 'media_002_2_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
        description: '사용자 테스트를 진행하며 피드백을 수집하는 과정'
      }
    ],
    createdAt: '2023-06-30T16:00:00Z',
    updatedAt: '2023-06-30T16:00:00Z'
  },

  // 박철수 (영어) 포트폴리오
  {
    id: 'portfolio_003_1',
    tutorId: 'tutor_003',
    title: '삼성전자 비즈니스 영어 교육',
    content: '삼성전자 임직원 200명을 대상으로 한 비즈니스 영어 교육 프로그램을 설계하고 진행했습니다. 프레젠테이션, 미팅, 이메일 작성 등 실무 중심의 커리큘럼으로 구성했으며, 3개월 과정 후 참가자들의 비즈니스 영어 실력이 평균 40% 향상되었습니다.',
    period: '2023년 6월 - 2023년 9월',
    media: [
      {
        id: 'media_003_1_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop',
        description: '삼성전자 임직원들과 함께하는 비즈니스 영어 프레젠테이션 수업'
      },
      {
        id: 'media_003_1_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
        description: '실무 상황을 재현한 영어 미팅 시뮬레이션 진행 모습'
      }
    ],
    createdAt: '2023-09-15T13:00:00Z',
    updatedAt: '2023-09-15T13:00:00Z'
  },
  {
    id: 'portfolio_003_2',
    tutorId: 'tutor_003',
    title: 'TOEIC 점수 향상 프로그램',
    content: '3개월 만에 평균 200점 이상 점수 향상을 달성한 TOEIC 집중 과정입니다. 개인별 맞춤 학습 계획과 주 2회 모의고사를 통해 효과적인 성과를 거두었습니다. 총 50명의 수강생 중 80%가 목표 점수를 달성했습니다.',
    period: '2023년 3월 - 2023년 6월',
    media: [
      {
        id: 'media_003_2_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
        description: 'TOEIC 실전 모의고사를 진행하는 교실 풍경'
      },
      {
        id: 'media_003_2_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        description: '개별 학습 상담을 통해 맞춤형 학습 계획을 수립하는 모습'
      }
    ],
    createdAt: '2023-06-20T10:00:00Z',
    updatedAt: '2023-06-20T10:00:00Z'
  },

  // 한지수 (수학) 포트폴리오 - 이미 변환된 것들
  {
    id: 'portfolio_014_1',
    tutorId: 'tutor_014',
    title: '수학 올림피아드 출제 및 운영',
    content: '2020-2023년 한국수학올림피아드 출제위원으로 참여하여 창의적 사고력을 기르는 수학 문제를 출제했습니다. 전국 수학 영재들의 실력 향상에 기여했으며, 4년간 총 120개의 창의적 문제를 출제하고 심사 과정을 담당했습니다. 특히 기하학과 정수론 분야에서 혁신적인 문제 유형을 개발하여 수학계의 주목을 받았습니다.',
    period: '2020년 3월 - 2023년 12월',
    media: [
      {
        id: 'media_014_1_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
        description: '올림피아드 출제 회의 중 창의적 문제 아이디어를 논의하는 모습'
      },
      {
        id: 'media_014_1_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=400&fit=crop',
        description: '출제된 수학 문제들과 해설서를 검토하고 있는 장면'
      }
    ],
    createdAt: '2023-12-15T10:00:00Z',
    updatedAt: '2023-12-15T10:00:00Z'
  },
  {
    id: 'portfolio_014_2',
    tutorId: 'tutor_014',
    title: '고등학교 수학 커리큘럼 개발',
    content: '강남구 소재 고등학교의 수학 심화과정 커리큘럼을 개발하고 운영했습니다. 학생들의 수학 성적이 평균 25% 향상되는 놀라운 성과를 거두었습니다. 개별 맞춤형 학습 경로 설계와 단계별 평가 시스템을 도입하여 학생들의 수학적 사고력을 체계적으로 향상시켰습니다.',
    period: '2022년 3월 - 2022년 12월',
    media: [
      {
        id: 'media_014_2_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=400&fit=crop',
        description: '개발된 수학 커리큘럼 교재와 학습 자료들을 정리한 모습'
      },
      {
        id: 'media_014_2_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
        description: '학생들과 함께 새로운 커리큘럼으로 수업하는 교실 풍경'
      }
    ],
    createdAt: '2022-12-20T14:00:00Z',
    updatedAt: '2022-12-20T14:00:00Z'
  },
  {
    id: 'portfolio_014_3',
    tutorId: 'tutor_014',
    title: '대학 수학 선행학습 프로그램',
    content: '고등학생을 대상으로 한 대학 수학 선행학습 프로그램을 개발했습니다. 미적분학과 선형대수학의 기초 개념을 고등학생 수준에 맞게 재구성하여, 대학 진학 후 수학 학습에 어려움을 겪지 않도록 체계적인 기초를 다졌습니다. 총 50명의 학생이 참여하여 95%의 높은 만족도를 기록했습니다.',
    period: '2023년 6월 - 2023년 10월',
    media: [
      {
        id: 'media_014_3_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&h=400&fit=crop',
        description: 'Mathematica를 활용한 미적분 개념 시각화 자료 제작 중인 모습'
      },
      {
        id: 'media_014_3_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&h=400&fit=crop',
        description: '온라인으로 선행학습 프로그램을 진행하며 학생들과 소통하는 장면'
      }
    ],
    createdAt: '2023-10-15T16:00:00Z',
    updatedAt: '2023-10-15T16:00:00Z'
  },
  {
    id: 'portfolio_014_4',
    tutorId: 'tutor_014',
    title: '수학 학습 앱 콘텐츠 제작',
    content: '수학 학습 앱을 위한 고등수학 콘텐츠를 제작했습니다. 단계별 해설과 시각적 자료를 통해 어려운 개념을 쉽게 이해할 수 있도록 구성했으며, 3D 모델링과 인터랙티브 학습 요소를 도입하여 학생들의 흥미와 이해도를 크게 향상시켰습니다. 총 200개의 학습 모듈을 제작하여 앱 다운로드 수 10만건을 달성했습니다.',
    period: '2023년 9월 - 2023년 12월',
    media: [
      {
        id: 'media_014_4_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        description: '수학 학습 앱의 3D 모델링 콘텐츠 제작 중인 화면'
      },
      {
        id: 'media_014_4_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop',
        description: '완성된 앱에서 학생들이 인터랙티브 학습을 하는 모습'
      }
    ],
    createdAt: '2023-12-25T09:00:00Z',
    updatedAt: '2023-12-25T09:00:00Z'
  },
  {
    id: 'portfolio_014_5',
    tutorId: 'tutor_014',
    title: '온라인 수학 튜터링 시스템',
    content: 'AI를 활용한 개인 맞춤형 온라인 수학 학습 시스템을 설계했습니다. 학생의 학습 패턴을 분석하여 각자에게 최적화된 문제를 제공하며, 실시간 피드백 시스템을 통해 학습 효과를 극대화했습니다. 6개월간 베타 테스트 결과 학습 성취도가 평균 40% 향상되었습니다.',
    period: '2023년 3월 - 2023년 9월',
    media: [
      {
        id: 'media_014_5_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        description: 'AI 학습 분석 시스템의 대시보드 화면'
      },
      {
        id: 'media_014_5_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        description: '학생들이 온라인 시스템으로 개별 맞춤 학습을 하는 모습'
      }
    ],
    createdAt: '2023-09-20T11:00:00Z',
    updatedAt: '2023-09-20T11:00:00Z'
  },
  {
    id: 'portfolio_014_6',
    tutorId: 'tutor_014',
    title: '수학 콘텐츠 유튜브 채널',
    content: '고등학생들을 위한 수학 개념 설명 유튜브 채널 "수학지수"를 운영하고 있습니다. 복잡한 수학 개념을 쉽고 재미있게 설명하여 구독자 5만명을 달성했으며, 누적 조회수 200만회를 기록했습니다. 매주 2편의 영상을 업로드하며 학생들과 소통하고 있습니다.',
    period: '2021년 1월 - 현재',
    media: [
      {
        id: 'media_014_6_1',
        type: 'video',
        url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
        description: '미적분 개념을 쉽게 설명하는 유튜브 영상 촬영 현장'
      },
      {
        id: 'media_014_6_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
        description: '유튜브 채널 구독자들과의 라이브 Q&A 세션 진행 중'
      }
    ],
    createdAt: '2024-01-15T18:00:00Z',
    updatedAt: '2024-01-15T18:00:00Z'
  }
];

// 튜터별 포트폴리오 매핑
export const tutorPortfolioMap: Record<string, string[]> = {
  'tutor_001': ['portfolio_001_1', 'portfolio_001_2'], // 김민수
  'tutor_002': ['portfolio_002_1', 'portfolio_002_2'], // 이영희
  'tutor_003': ['portfolio_003_1', 'portfolio_003_2'], // 박철수
  'tutor_004': [], // 정수현 (음악) - 포트폴리오 없음
  'tutor_005': [], // 최지원 (요리) - 포트폴리오 없음
  'tutor_006': [], // 강민호 (운동) - 포트폴리오 없음
  'tutor_007': [], // 윤서연 (중국어) - 포트폴리오 없음
  'tutor_008': [], // 임태양 (사진) - 포트폴리오 없음
  'tutor_009': [], // 김소희 (Python) - 포트폴리오 없음
  'tutor_010': [], // 박준혁 (비즈니스) - 포트폴리오 없음
  'tutor_011': [], // 이하늘 (일본어) - 포트폴리오 없음
  'tutor_012': [], // 조현우 (데이터분석) - 포트폴리오 없음
  'tutor_013': [], // 송미라 (미술) - 포트폴리오 없음
  'tutor_014': ['portfolio_014_1', 'portfolio_014_2', 'portfolio_014_3', 'portfolio_014_4', 'portfolio_014_5', 'portfolio_014_6'], // 한지수
  'tutor_015': [], // 권태진 (투자) - 포트폴리오 없음
  'tutor_016': [], // 최연주 (건강) - 포트폴리오 없음
};

// 헬퍼 함수: 튜터의 포트폴리오 가져오기
export const getTutorPortfolios = (tutorId: string): Portfolio[] => {
  const portfolioIds = tutorPortfolioMap[tutorId] || [];
  return portfolioIds.map(id => samplePortfolios.find(p => p.id === id)).filter(Boolean) as Portfolio[];
};