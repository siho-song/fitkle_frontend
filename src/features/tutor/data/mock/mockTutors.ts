import { TutorDTO } from '../dto/tutorDTO';

export const mockTutors: TutorDTO[] = [
  {
    id: '1',
    name: '김보컬',
    profileImageUrl: 'https://picsum.photos/seed/tutor1_profile/200/200',
    shortIntro: '압도적인 실력으로 증명하는 보컬 레슨',
    descriptionTitle: '🎤  김보컬 튜터의 보컬 레슨',
    descriptionText: '개인의 목소리 특성을 정밀하게 분석하여 최적의 발성법을 찾아드립니다. 기초부터 심화까지, 탄탄한 커리큘럼으로 여러분의 노래 실력을 책임지겠습니다. 더 이상 노래방이 두렵지 않게 만들어 드릴게요!',
    certificateTitle: '자격증 및 수료증',
    certificateImageUrls: [
      'https://picsum.photos/seed/tutor1_cert1/600/400',
      'https://picsum.photos/seed/tutor1_cert2/600/400',
    ],
    averageRating: 4.8,
    totalLessons: 150,
    careerYears: 5,
    tags: ['보컬', 'K-POP', '축가', '발성 교정'],
    region: '서울 전체',
    statsItems: [
      { label: '리뷰', value: '70', icon: 'star' },
      { label: '고용', value: '150', icon: 'person_outline' },
      { label: '경력', value: '5년', icon: 'access_time' },
      { label: '자격증', value: '2개', icon: 'business_center_outlined' },
    ],
    infoItems: [
      { label: '경력', value: '5년', icon: 'access_time' },
      { label: '고용 수', value: '150회', icon: 'person_outline' },
      { label: '활동 지역', value: '서울 전체', icon: 'business_center_outlined' },
    ],
    portfolio: [
      {
        id: 'p1',
        title: '이사청소는 이렇게 진행되요✨',
        imageUrls: [
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1541123437800-1a730214c5b2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1600585152220-903636b66d09?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
        serviceType: '이사/입주 청소업체',
        region: '서울 송파구',
        price: 370000,
        duration: '5시간',
        year: 2023,
        description: '신축 입주청소는 그 무엇보다 공사후 잔해, 분진을 얼마나 전문적으로 제거하냐에 따라 청소의 완성도가 결정됩니다. 저희는 최고급 장비와 친환경 약품을 사용하여 보이지 않는 곳까지 완벽하게 청소합니다.',
      },
      {
        id: 'p2',
        title: '강남 오피스텔 입주 청소',
        imageUrls: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
        serviceType: '오피스텔 청소',
        region: '서울 강남구',
        price: 250000,
        duration: '3시간',
        year: 2022,
        description: '강남의 20평 오피스텔 입주 청소를 진행했습니다. 작업 전후 사진으로 깨끗함을 확인하세요.',
      },
    ],
    reviewSummary: {
      ratingDistribution: { '5': 27, '4': 22, '3': 15, '2': 5, '1': 1 },
      tags: ['친절해요', '시간을 잘 지켜요', '꼼꼼해요', '이해가 잘돼요', '도움이 많이 됐어요'],
    },
    reviews: [
      {
        id: 'r1',
        reviewer: '김**',
        reviewerProfileImageUrl: 'https://picsum.photos/seed/reviewer1/100/100',
        rating: 5,
        comment: '정말 최고의 강의입니다! 목소리가 완전히 달라졌어요.',
        date: '2023-10-26',
        tags: ['친절해요', '도움이 많이 됐어요'],
        imageUrl: 'https://picsum.photos/seed/reviewimg1/600/400',
      },
      {
        id: 'r2',
        reviewer: '박**',
        reviewerProfileImageUrl: 'https://picsum.photos/seed/reviewer2/100/100',
        rating: 4,
        comment: '덕분에 자신감이 많이 붙었습니다. 감사합니다!',
        date: '2023-10-22',
        tags: ['시간을 잘 지켜요'],
      },
    ],
    qnaList: [
      {
        question: '서비스가 시작되기 전 어떤 절차로 진행하나요?',
        answer: '픽클 메시지를 통해 레슨 일정을 조율하여 방문해 주시면, 레벨테스트와 면담을 진행한 뒤 개인에게 맞는 맞춤형 커리큘럼을 설명드리고 레슨이 시작됩니다.',
      },
      {
        question: '어떤 서비스를 전문적으로 제공하나요?',
        answer: '취미, 입시, 오디션, 축가, 유튜버, 공연 준비 관련 보컬레슨을 진행합니다.',
      },
      {
        question: '서비스의 견적은 어떤 방식으로 산정 되나요?',
        answer: '🌰 단기반 : 축가, 오디션, 대회 준비를 위한 집중적인 디렉팅 위주의 레슨입니다.\n장기반 : 발성, 음정, 박자, 표현력 등 기초부터 심화까지 체계적으로 실력을 쌓을 수 있습니다.',
      },
    ],
    features: [
      { icon: 'star', description: '1:1 맞춤 커리큘럼 제공' },
      { icon: 'star', description: '음정, 박자, 발성 등 기본기 집중 교정' },
      { icon: 'star', description: '자신감 있는 무대 매너 코칭' },
    ],
    services: [
      { name: '취미 보컬' },
      { name: '오디션 대비' },
      { name: '축가 레슨' },
      { name: '발성 교정' },
    ],
    careers: [
      { title: '전) YG엔터테인먼트 보컬 트레이너', startDate: '2018-03', endDate: '2021-02' },
      { title: "가수 '원포인트' 앨범 코러스 참여", startDate: '2020-07', endDate: '2020-12' },
      { title: "실용음악학원 '피치' 출강", startDate: '2017-09' },
    ],
  },
]; 