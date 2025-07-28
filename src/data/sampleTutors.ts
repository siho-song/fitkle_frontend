import { TutorItem, Education, Certification, Award, WorkExperience } from '@/types';
import { getTutorPortfolios } from './samplePortfolios';
import { getCategoryByName } from '@/constants/categories';

export const sampleTutors: TutorItem[] = [
  {
    id: 'tutor_001',
    name: '김민수',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('프로그래밍')!,
    specialties: ['React', 'JavaScript', 'TypeScript', 'Next.js'],
    rating: 4.9,
    reviewCount: 127,
    studentCount: 350,
    experience: '5년',
    pricePerHour: 50000,
    description: 'React 개발 실무 경험을 바탕으로 실전 프로젝트 중심의 수업을 진행합니다.',
    tags: ['프론트엔드', '웹개발', '실무경험', '프로젝트'],
    responseTime: 120,
    education: [
      {
        id: 'edu_001_1',
        tutorId: 'tutor_001',
        institution: '서울대학교',
        degree: '학사',
        major: '컴퓨터공학과',
        graduationYear: '2018',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_001_2',
        tutorId: 'tutor_001',
        institution: '카이스트',
        degree: '석사',
        major: '전산학과',
        graduationYear: '2020',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_001_1',
        tutorId: 'tutor_001',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        issuedDate: '2022-03-15',
        expiryDate: '2025-03-15',
        credentialId: 'AWS-DEV-2022-001',
        verificationUrl: 'https://aws.amazon.com/verification/cert_001_1',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_001_2',
        tutorId: 'tutor_001',
        name: 'Google Cloud Professional',
        issuer: 'Google Cloud',
        issuedDate: '2022-08-20',
        expiryDate: '2024-08-20',
        credentialId: 'GCP-PRO-2022-001',
        verificationUrl: 'https://cloud.google.com/certification/verify/cert_001_2',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [],
    workExperience: [
      {
        id: 'work_001_1',
        tutorId: 'tutor_001',
        company: '네이버',
        position: '시니어 프론트엔드 개발자',
        startDate: '2020-07-01',
        description: '메인 서비스 프론트엔드 개발 및 팀 리딩 담당',
        achievements: ['네이버 메인 페이지 리뉴얼 프로젝트 리드', '오픈소스 컨트리뷰터'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: '안녕하세요! 현재 네이버에서 프론트엔드 개발자로 일하고 있는 김민수입니다. 실무에서 쌓은 경험을 바탕으로 실전 중심의 수업을 제공합니다.',
    portfolio: getTutorPortfolios('tutor_001'),
    consultationGuide: '상담 시 현재 프로그래밍 경험 수준(초급/중급/고급), 관심 있는 기술 스택(React, JavaScript, TypeScript 등), 구체적인 학습 목표(취업 준비, 개인 프로젝트, 실무 스킬 향상 등)를 알려주시면 더욱 맞춤형 수업을 제공할 수 있습니다. 현재 진행 중인 프로젝트나 막히는 부분이 있다면 함께 공유해 주세요.',
    availability: {
      'mon': ['19:00', '20:00', '21:00'],
      'tue': ['19:00', '20:00', '21:00'],
      'wed': ['19:00', '20:00', '21:00'],
      'thu': ['19:00', '20:00', '21:00'],
      'fri': ['19:00', '20:00', '21:00'],
      'sat': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'sun': ['10:00', '11:00', '14:00', '15:00', '16:00']
    },
    services: [
      {
        id: 'service_001_1',
        name: 'React 개발 레슨',
        description: 'React 기초부터 고급 개념까지 실무 중심으로 학습합니다.',
        duration: 60,
        price: 50000,
        category: '프로그래밍',
        isActive: true
      },
      {
        id: 'service_001_2',
        name: 'JavaScript/TypeScript 마스터',
        description: 'JavaScript 핵심 개념과 TypeScript 활용법을 배웁니다.',
        duration: 90,
        price: 70000,
        category: '프로그래밍',
        isActive: true
      },
      {
        id: 'service_001_3',
        name: 'Next.js 프로젝트 개발',
        description: 'Next.js를 활용한 실제 프로젝트 개발 과정을 경험합니다.',
        duration: 120,
        price: 90000,
        category: '프로그래밍',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_002',
    name: '이영희',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('디자인')!,
    specialties: ['UI/UX 디자인', 'Figma', 'Adobe Creative Suite', '프로토타이핑'],
    rating: 4.8,
    reviewCount: 89,
    studentCount: 200,
    experience: '7년',
    pricePerHour: 45000,
    description: 'Google에서 UX 디자이너로 근무한 경험을 바탕으로 실무 중심의 디자인 교육을 제공합니다.',
    tags: ['UX디자인', 'UI디자인', '실무경험', 'Google'],
    responseTime: 60,
    education: [
      {
        id: 'edu_002_1',
        tutorId: 'tutor_002',
        institution: '홍익대학교',
        degree: '학사',
        major: '시각디자인과',
        graduationYear: '2015',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_002_2',
        tutorId: 'tutor_002',
        institution: 'Parsons School of Design',
        degree: '석사',
        major: 'UX Design',
        graduationYear: '2017',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_002_1',
        tutorId: 'tutor_002',
        name: 'Google UX Design Certificate',
        issuer: 'Google',
        issuedDate: '2021-05-10',
        credentialId: 'GUX-2021-002',
        verificationUrl: 'https://grow.google/certificates/ux-design/',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_002_2',
        tutorId: 'tutor_002',
        name: 'Adobe Certified Expert',
        issuer: 'Adobe',
        issuedDate: '2020-12-01',
        credentialId: 'ACE-2020-002',
        verificationUrl: 'https://www.adobe.com/training-services/certification.html',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_002_1',
        tutorId: 'tutor_002',
        title: 'UX Korea 컨퍼런스 연사',
        organization: 'UX Korea',
        awardDate: '2023-09-15',
        description: 'Google Material Design 가이드라인 참여 경험 발표',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [
      {
        id: 'work_002_1',
        tutorId: 'tutor_002',
        company: 'Google',
        position: 'UX Designer',
        startDate: '2018-03-01',
        endDate: '2023-07-31',
        description: 'Google 제품의 사용자 경험 디자인 및 Material Design 가이드라인 개발 참여',
        achievements: ['Google Material Design 가이드라인 참여', 'Android 앱 UX 개선 프로젝트 리드'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: 'Google에서 5년간 UX 디자이너로 일한 경험이 있습니다. 디자인 씽킹부터 프로토타이핑까지 전 과정을 가르쳐드립니다.',
    portfolio: getTutorPortfolios('tutor_002'),
    consultationGuide: '디자인 경험 수준과 사용해본 도구들(Figma, Adobe 제품군 등)에 대해 알려주세요. 어떤 분야의 디자인에 관심이 있는지(웹/앱 UI, UX 리서치, 브랜딩 등), 포트폴리오 제작이나 취업 준비 등 구체적인 목표를 공유해 주시면 체계적인 학습 로드맵을 제공해 드릴 수 있습니다.',
    availability: {
      'mon': ['09:00', '10:00', '14:00', '15:00'],
      'tue': ['09:00', '10:00', '14:00', '15:00'],
      'wed': ['09:00', '10:00', '14:00', '15:00'],
      'thu': ['09:00', '10:00', '14:00', '15:00'],
      'fri': ['09:00', '10:00', '14:00', '15:00'],
      'sat': ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      'sun': ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00']
    },
    services: [
      {
        id: 'service_002_1',
        name: 'UI/UX 디자인 기초',
        description: 'Figma를 활용한 UI/UX 디자인 기본기를 익힙니다.',
        duration: 60,
        price: 45000,
        category: '디자인',
        isActive: true
      },
      {
        id: 'service_002_2',
        name: '프로토타이핑 워크숍',
        description: '실제 프로젝트를 통한 프로토타이핑 과정을 학습합니다.',
        duration: 90,
        price: 60000,
        category: '디자인',
        isActive: true
      },
      {
        id: 'service_002_3',
        name: 'Adobe Creative Suite 마스터',
        description: 'Photoshop, Illustrator 등 Adobe 툴 활용법을 배웁니다.',
        duration: 50,
        price: 40000,
        category: '디자인',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_003',
    name: '박철수',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('언어')!,
    specialties: ['영어회화', '비즈니스 영어', 'TOEIC', 'IELTS'],
    rating: 4.7,
    reviewCount: 156,
    studentCount: 420,
    experience: '10년',
    pricePerHour: 35000,
    description: '10년간의 영어 교육 경험과 해외 거주 경험을 바탕으로 실용적인 영어를 가르칩니다.',
    tags: ['영어회화', '비즈니스영어', '토익', '해외거주'],
    responseTime: 30,
    education: [
      {
        id: 'edu_003_1',
        tutorId: 'tutor_003',
        institution: '연세대학교',
        degree: '학사',
        major: '영어영문학과',
        graduationYear: '2010',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_003_2',
        tutorId: 'tutor_003',
        institution: 'University of California, Berkeley',
        degree: '석사',
        major: 'TESOL',
        graduationYear: '2014',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_003_1',
        tutorId: 'tutor_003',
        name: 'TESOL Certificate',
        issuer: 'UC Berkeley Extension',
        issuedDate: '2014-06-01',
        credentialId: 'TESOL-2014-003',
        verificationUrl: 'https://extension.berkeley.edu/tesol/verify',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_003_2',
        tutorId: 'tutor_003',
        name: 'Cambridge CELTA',
        issuer: 'Cambridge University',
        issuedDate: '2015-01-15',
        credentialId: 'CELTA-2015-003',
        verificationUrl: 'https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_003_1',
        tutorId: 'tutor_003',
        title: 'YBM 우수 강사상',
        organization: 'YBM',
        awardDate: '2022-12-01',
        description: '우수한 영어 교육 성과를 인정받아 수상',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'award_003_2',
        tutorId: 'tutor_003',
        title: '토익 만점 달성자',
        organization: 'ETS',
        awardDate: '2021-03-15',
        description: 'TOEIC 990점 만점 달성',
        rank: '990/990',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [
      {
        id: 'work_003_1',
        tutorId: 'tutor_003',
        company: 'California Language Institute',
        position: 'ESL Instructor',
        startDate: '2014-09-01',
        endDate: '2019-06-30',
        description: '미국 현지 ESL 교육 기관에서 한국인 대상 영어 교육',
        achievements: ['연간 우수 강사상 3회 수상', '학생 만족도 95% 이상 유지'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: '미국에서 5년간 거주하며 현지에서 영어 교육을 담당했습니다. 자연스러운 영어 표현을 중심으로 가르쳐드립니다.',
    portfolio: getTutorPortfolios('tutor_003'),
    consultationGuide: '현재 영어 실력 수준(초급/중급/고급), 주요 학습 목표(회화, 비즈니스 영어, 시험 준비 등), 선호하는 학습 스타일을 알려주세요. TOEIC이나 IELTS 등 목표 점수가 있거나, 특정 상황에서 사용할 영어(프레젠테이션, 면접, 일상 대화 등)가 있다면 구체적으로 말씀해 주시면 효과적인 맞춤 수업을 진행할 수 있습니다.',
    availability: {
      'mon': ['06:00', '07:00', '08:00', '20:00', '21:00'],
      'tue': ['06:00', '07:00', '08:00', '20:00', '21:00'],
      'wed': ['06:00', '07:00', '08:00', '20:00', '21:00'],
      'thu': ['06:00', '07:00', '08:00', '20:00', '21:00'],
      'fri': ['06:00', '07:00', '08:00', '20:00', '21:00'],
      'sat': ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
      'sun': ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
    },
    services: [
      {
        id: 'service_003_1',
        name: '영어회화 레슨',
        description: '자연스러운 영어 표현과 발음 교정에 중점을 둔 회화 수업입니다.',
        duration: 50,
        price: 35000,
        category: '언어',
        isActive: true
      },
      {
        id: 'service_003_2',
        name: 'TOEIC 집중 코칭',
        description: 'TOEIC 고득점을 위한 문제 유형별 전략과 실전 연습입니다.',
        duration: 60,
        price: 40000,
        category: '언어',
        isActive: true
      },
      {
        id: 'service_003_3',
        name: '비즈니스 영어 마스터',
        description: '프레젠테이션, 미팅, 이메일 등 업무 상황별 영어를 학습합니다.',
        duration: 90,
        price: 55000,
        category: '언어',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_004',
    name: '정수현',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('음악')!,
    specialties: ['피아노', '작곡', '음악이론', '재즈'],
    rating: 4.9,
    reviewCount: 73,
    studentCount: 180,
    experience: '8년',
    pricePerHour: 60000,
    description: '클래식부터 재즈까지, 체계적인 피아노 교육과 음악 이론을 함께 가르쳐드립니다.',
    tags: ['피아노', '클래식', '재즈', '음악이론'],
    responseTime: 240,
    education: [
      {
        id: 'edu_004_1',
        tutorId: 'tutor_004',
        institution: '서울대학교',
        degree: '학사',
        major: '작곡과',
        graduationYear: '2012',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_004_2',
        tutorId: 'tutor_004',
        institution: 'Juilliard School',
        degree: '석사',
        major: 'Piano Performance',
        graduationYear: '2016',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_004_1',
        tutorId: 'tutor_004',
        name: '음악지도사 자격증',
        issuer: '한국음악협회',
        issuedDate: '2016-12-01',
        credentialId: 'MUS-2016-004',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_004_1',
        tutorId: 'tutor_004',
        title: '쇼팽 국제피아노 콩쿠르 본선 진출',
        organization: 'Chopin International Piano Competition',
        awardDate: '2015-10-15',
        description: '세계적인 피아노 콩쿠르 본선 진출',
        rank: '본선 진출',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'award_004_2',
        tutorId: 'tutor_004',
        title: '국제피아노콩쿠르 입상',
        organization: 'International Piano Competition',
        awardDate: '2014-08-20',
        description: '국제 피아노 콩쿠르에서 입상',
        rank: '3등',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [
      {
        id: 'work_004_1',
        tutorId: 'tutor_004',
        company: 'KBS',
        position: '객원 연주자',
        startDate: '2017-01-01',
        description: 'KBS 클래식 음악회 정기 출연 및 연주',
        achievements: ['KBS 클래식 음악회 출연', '월간 정기 연주회 진행'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: '줄리어드 음대 출신으로 클래식부터 재즈까지 다양한 장르의 피아노를 가르칩니다. 학생 개인의 수준에 맞춘 맞춤 수업을 제공합니다.',
    portfolio: getTutorPortfolios('tutor_004'),
    consultationGuide: '피아노 연주 경험과 현재 수준을 알려주세요(완전 초보자, 기초 연주 가능, 중급 이상 등). 선호하는 음악 장르(클래식, 재즈, 팝 등)와 학습 목표(취미, 음대 입시, 연주회 준비 등)를 구체적으로 말씀해 주시면 개인 맞춤형 커리큘럼을 제공해 드릴 수 있습니다. 배우고 싶은 특정 곡이 있다면 함께 알려주세요.',
    availability: {
      'mon': ['14:00', '15:00', '16:00', '17:00'],
      'tue': ['14:00', '15:00', '16:00', '17:00'],
      'wed': ['14:00', '15:00', '16:00', '17:00'],
      'thu': ['14:00', '15:00', '16:00', '17:00'],
      'fri': ['14:00', '15:00', '16:00', '17:00'],
      'sat': ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      'sun': ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
    },
    services: [
      {
        id: 'service_004_1',
        name: '피아노 레슨',
        description: '클래식부터 재즈까지 개인 수준에 맞춘 피아노 연주법을 배웁니다.',
        duration: 60,
        price: 60000,
        category: '음악',
        isActive: true
      },
      {
        id: 'service_004_2',
        name: '음악 이론 & 작곡',
        description: '음악 이론 기초부터 작곡 실습까지 체계적으로 학습합니다.',
        duration: 90,
        price: 80000,
        category: '음악',
        isActive: true
      },
      {
        id: 'service_004_3',
        name: '재즈 피아노 특강',
        description: '재즈 화성과 즉흥연주 기법을 집중적으로 배웁니다.',
        duration: 50,
        price: 55000,
        category: '음악',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_005',
    name: '최지원',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('요리')!,
    specialties: ['한식', '베이킹', '디저트', '홈쿠킹'],
    rating: 4.6,
    reviewCount: 94,
    studentCount: 250,
    experience: '6년',
    pricePerHour: 45000,
    description: '르꼬르동 블루 출신 셰프가 알려주는 홈쿠킹부터 전문 요리까지 배워보세요.',
    tags: ['한식', '베이킹', '홈쿠킹', '르꼬르동블루'],
    responseTime: 120,
    education: [
      {
        id: 'edu_005_1',
        tutorId: 'tutor_005',
        institution: '경희대학교',
        degree: '학사',
        major: '조리학과',
        graduationYear: '2016',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_005_2',
        tutorId: 'tutor_005',
        institution: 'Le Cordon Bleu Paris',
        degree: '디플로마',
        major: 'Culinary Arts',
        graduationYear: '2018',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_005_1',
        tutorId: 'tutor_005',
        name: '조리기능장',
        issuer: '한국산업인력공단',
        issuedDate: '2019-05-15',
        credentialId: 'COOK-2019-005',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_005_2',
        tutorId: 'tutor_005',
        name: '제과제빵기능사',
        issuer: '한국산업인력공단',
        issuedDate: '2017-03-20',
        credentialId: 'BAKE-2017-005',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_005_1',
        tutorId: 'tutor_005',
        title: '요리 대회 금상 수상',
        organization: '한국요리학회',
        awardDate: '2020-11-15',
        description: '전국 요리 대회에서 금상 수상',
        rank: '금상',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [
      {
        id: 'work_005_1',
        tutorId: 'tutor_005',
        company: 'Michelin 1 Star Restaurant',
        position: '수셰프',
        startDate: '2018-09-01',
        endDate: '2022-12-31',
        description: '미슐랭 1스타 레스토랑에서 수셰프로 근무하며 메뉴 개발 및 운영 총괄',
        achievements: ['미슐랭 1스타 레스토랑 수셰프', '신메뉴 5개 개발', '매출 30% 증가 기여'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: '파리 르꼬르동 블루에서 수학한 후 미슐랭 레스토랑에서 근무했습니다. 기초부터 전문 요리까지 단계별로 가르쳐드립니다.',
    portfolio: getTutorPortfolios('tutor_005'),
    consultationGuide: '요리 경험 수준과 주방 환경(사용 가능한 도구, 오븐 유무 등)을 알려주세요. 관심 있는 요리 분야(한식, 베이킹, 디저트 등), 특별히 배우고 싶은 요리나 기법이 있는지 구체적으로 말씀해 주시면 단계별 맞춤 수업을 준비해 드릴 수 있습니다. 식재료 알레르기나 식단 제한사항이 있다면 미리 알려주세요.',
    availability: {
      'mon': ['10:00', '11:00', '15:00', '16:00'],
      'tue': ['10:00', '11:00', '15:00', '16:00'],
      'wed': ['10:00', '11:00', '15:00', '16:00'],
      'thu': ['10:00', '11:00', '15:00', '16:00'],
      'fri': ['10:00', '11:00', '15:00', '16:00'],
      'sat': ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00'],
      'sun': ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00']
    },
    services: [
      {
        id: 'service_005_1',
        name: '한식 요리 클래스',
        description: '전통 한식부터 현대적 한식까지 체계적으로 배웁니다.',
        duration: 120,
        price: 80000,
        category: '요리',
        isActive: true
      },
      {
        id: 'service_005_2',
        name: '베이킹 & 디저트',
        description: '기본 베이킹부터 고급 디저트 제작까지 단계별로 학습합니다.',
        duration: 90,
        price: 60000,
        category: '요리',
        isActive: true
      },
      {
        id: 'service_005_3',
        name: '홈쿠킹 마스터',
        description: '집에서 쉽게 만들 수 있는 실용적인 요리법을 배웁니다.',
        duration: 60,
        price: 45000,
        category: '요리',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_006',
    name: '강민호',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('운동')!,
    specialties: ['헬스', '요가', '필라테스', '홈트레이닝'],
    rating: 4.8,
    reviewCount: 112,
    studentCount: 300,
    experience: '7년',
    pricePerHour: 40000,
    description: '개인의 체력과 목표에 맞춘 맞춤형 운동 프로그램을 제공합니다.',
    tags: ['헬스', '요가', '필라테스', '다이어트'],
    responseTime: 60,
    education: [
      {
        id: 'edu_006_1',
        tutorId: 'tutor_006',
        institution: '체육대학교',
        degree: '학사',
        major: '운동학과',
        graduationYear: '2015',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_006_1',
        tutorId: 'tutor_006',
        name: '생활스포츠지도사',
        issuer: '문화체육관광부',
        issuedDate: '2016-02-10',
        credentialId: 'SPORT-2016-006',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_006_2',
        tutorId: 'tutor_006',
        name: '요가강사자격증',
        issuer: '한국요가협회',
        issuedDate: '2017-06-15',
        credentialId: 'YOGA-2017-006',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_006_3',
        tutorId: 'tutor_006',
        name: 'NSCA-CPT',
        issuer: 'National Strength and Conditioning Association',
        issuedDate: '2018-04-20',
        expiryDate: '2026-04-20',
        credentialId: 'NSCA-2018-006',
        verificationUrl: 'https://www.nsca.com/certification/nsca-cpt/',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_006_1',
        tutorId: 'tutor_006',
        title: '피트니스 대회 입상',
        organization: '한국피트니스협회',
        awardDate: '2019-08-25',
        description: '전국 피트니스 대회에서 입상',
        rank: '2등',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [
      {
        id: 'work_006_1',
        tutorId: 'tutor_006',
        company: '피트니스 센터',
        position: '퍼스널 트레이너',
        startDate: '2016-03-01',
        description: '7년간 피트니스 센터에서 퍼스널 트레이너로 근무',
        achievements: ['월 평균 PT 세션 200개 이상', '고객 만족도 98% 유지', '유튜브 운동채널 10만 구독자'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: '7년간 피트니스 센터에서 PT를 담당했습니다. 개인별 맞춤 운동 프로그램으로 건강한 몸만들기를 도와드립니다.',
    portfolio: getTutorPortfolios('tutor_006'),
    consultationGuide: '현재 운동 경험과 체력 수준, 주요 운동 목표(체중 감량, 근육 증가, 체력 향상, 자세 교정 등)를 알려주세요. 관심 있는 운동 종목(헬스, 요가, 필라테스 등)과 운동 가능한 환경(헬스장, 홈트레이닝 등), 부상 이력이나 건강상 주의사항이 있다면 미리 말씀해 주시면 안전하고 효과적인 맞춤 운동 프로그램을 제공해 드릴 수 있습니다.',
    availability: {
      'mon': ['06:00', '07:00', '18:00', '19:00', '20:00'],
      'tue': ['06:00', '07:00', '18:00', '19:00', '20:00'],
      'wed': ['06:00', '07:00', '18:00', '19:00', '20:00'],
      'thu': ['06:00', '07:00', '18:00', '19:00', '20:00'],
      'fri': ['06:00', '07:00', '18:00', '19:00', '20:00'],
      'sat': ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'sun': ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00']
    },
    services: [
      {
        id: 'service_006_1',
        name: '퍼스널 트레이닝',
        description: '개인 목표에 맞춘 1:1 맞춤형 운동 프로그램을 제공합니다.',
        duration: 60,
        price: 50000,
        category: '운동',
        isActive: true
      },
      {
        id: 'service_006_2',
        name: '요가 & 필라테스',
        description: '유연성과 코어 강화를 위한 요가와 필라테스 수업입니다.',
        duration: 50,
        price: 35000,
        category: '운동',
        isActive: true
      },
      {
        id: 'service_006_3',
        name: '홈트레이닝 코칭',
        description: '집에서 할 수 있는 효과적인 운동법과 동기부여를 제공합니다.',
        duration: 30,
        price: 25000,
        category: '운동',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_007',
    name: '윤서연',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('언어')!,
    specialties: ['중국어', 'HSK', '비즈니스 중국어', '중국 문화'],
    rating: 4.7,
    reviewCount: 68,
    studentCount: 160,
    experience: '5년',
    pricePerHour: 40000,
    description: '베이징대 출신이 알려주는 정통 중국어, HSK부터 비즈니스 중국어까지 완벽 마스터!',
    tags: ['중국어', 'HSK', '베이징대', '비즈니스중국어'],
    responseTime: 120,
    education: [
      {
        id: 'edu_007_1',
        tutorId: 'tutor_007',
        institution: '서울대학교',
        degree: '학사',
        major: '중어중문학과',
        graduationYear: '2016',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_007_2',
        tutorId: 'tutor_007',
        institution: '베이징대학교',
        degree: '석사',
        major: '중어중문학과',
        graduationYear: '2019',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_007_1',
        tutorId: 'tutor_007',
        name: 'HSK 6급',
        issuer: '공자학원 국가한반',
        issuedDate: '2019-12-15',
        credentialId: 'HSK6-2019-007',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_007_2',
        tutorId: 'tutor_007',
        name: '중국어교원자격증',
        issuer: '교육부',
        issuedDate: '2020-03-10',
        credentialId: 'TCH-2020-007',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_007_1',
        tutorId: 'tutor_007',
        title: 'HSK 만점 달성',
        organization: '공자학원',
        awardDate: '2019-12-15',
        description: 'HSK 6급 만점 달성',
        rank: '만점',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'award_007_2',
        tutorId: 'tutor_007',
        title: '중국어 번역대회 우수상',
        organization: '한중번역협회',
        awardDate: '2021-09-20',
        description: '전국 중국어 번역대회에서 우수상 수상',
        rank: '우수상',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [],
    introduction: '베이징대에서 5년간 수학하며 현지 문화와 언어를 완벽히 습득했습니다. 기초부터 고급까지 단계별 맞춤 수업을 제공합니다.',
    portfolio: getTutorPortfolios('tutor_007'),
    consultationGuide: '현재 중국어 수준(완전 초보자, 기초 회화 가능, 중급 이상 등)과 학습 목표(HSK 시험 준비, 비즈니스 중국어, 여행 회화 등)를 알려주세요. 선호하는 학습 방식(회화 중심, 문법 중심, 실용 표현 등)과 특별히 관심 있는 중국 문화 분야가 있다면 함께 말씀해 주시면 흥미롭고 실용적인 수업을 제공해 드릴 수 있습니다.',
    availability: {
      'mon': ['09:00', '10:00', '14:00', '15:00', '20:00'],
      'tue': ['09:00', '10:00', '14:00', '15:00', '20:00'],
      'wed': ['09:00', '10:00', '14:00', '15:00', '20:00'],
      'thu': ['09:00', '10:00', '14:00', '15:00', '20:00'],
      'fri': ['09:00', '10:00', '14:00', '15:00', '20:00'],
      'sat': ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      'sun': ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00']
    },
    services: [
      {
        id: 'service_007_1',
        name: '중글 회화 레슨',
        description: '자연스러운 중글 표현과 발음 교정에 중점을 둔 수업입니다.',
        duration: 50,
        price: 40000,
        category: '언어',
        isActive: true
      },
      {
        id: 'service_007_2',
        name: 'HSK 시험 대비',
        description: 'HSK 각 급수별 맞춤형 학습과 실전 문제 풀이를 제공합니다.',
        duration: 60,
        price: 45000,
        category: '언어',
        isActive: true
      },
      {
        id: 'service_007_3',
        name: '비즈니스 중글 & 문화',
        description: '비즈니스 상황에서 사용하는 중글과 중국 문화를 함께 배웁니다.',
        duration: 90,
        price: 60000,
        category: '언어',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_008',
    name: '임태양',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('사진')!,
    specialties: ['인물 사진', '풍경 사진', 'Lightroom', 'Photoshop'],
    rating: 4.9,
    reviewCount: 45,
    studentCount: 120,
    experience: '6년',
    pricePerHour: 55000,
    description: '사진 작가가 알려주는 전문적인 사진 촬영 기법과 보정 노하우를 배워보세요.',
    tags: ['사진촬영', '인물사진', '보정', '작가'],
    responseTime: 180,
    education: [
      {
        id: 'edu_008_1',
        tutorId: 'tutor_008',
        institution: '중앙대학교',
        degree: '학사',
        major: '사진학과',
        graduationYear: '2017',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'edu_008_2',
        tutorId: 'tutor_008',
        institution: '뉴욕 사진학교',
        degree: '디플로마',
        major: 'Professional Photography',
        graduationYear: '2019',
        status: 'graduated',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    certifications: [
      {
        id: 'cert_008_1',
        tutorId: 'tutor_008',
        name: '사진기능사',
        issuer: '한국산업인력공단',
        issuedDate: '2018-05-15',
        credentialId: 'PHOTO-2018-008',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'cert_008_2',
        tutorId: 'tutor_008',
        name: 'Adobe Certified Expert',
        issuer: 'Adobe',
        issuedDate: '2019-03-10',
        credentialId: 'ACE-2019-008',
        verificationUrl: 'https://www.adobe.com/training-services/certification.html',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    awards: [
      {
        id: 'award_008_1',
        tutorId: 'tutor_008',
        title: '사진공모전 대상 수상',
        organization: '한국사진학회',
        awardDate: '2021-10-15',
        description: '전국 사진공모전에서 대상 수상',
        rank: '대상',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    workExperience: [
      {
        id: 'work_008_1',
        tutorId: 'tutor_008',
        company: '프리랜스 사진스튜디오',
        position: '전문 사진작가',
        startDate: '2019-01-01',
        description: '6년간 프로 사진작가로 활동하며 다양한 분야의 사진 촬영',
        achievements: ['개인전 5회 개최', '상업 사진 촬영 500건 이상', '인물 사진 전문가 인증'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    introduction: '6년간 프로 사진작가로 활동하며 다양한 분야의 사진을 촬영했습니다. 기초부터 전문 기법까지 체계적으로 가르쳐드립니다.',
    portfolio: getTutorPortfolios('tutor_008'),
    consultationGuide: '사진 촬영 경험과 보유하고 계신 장비(카메라, 렌즈 등)를 알려주세요. 관심 있는 사진 분야(인물, 풍경, 상품, 스트리트 등)와 학습 목표(취미, 포트폴리오 제작, 전문 작가 준비 등)를 구체적으로 말씀해 주시면 단계별 맞춤 수업과 실습 프로젝트를 제공해 드릴 수 있습니다. 특히 배우고 싶은 촬영 기법이나 보정 스킬이 있다면 함께 알려주세요.',
    availability: {
      'mon': ['13:00', '14:00', '15:00', '16:00'],
      'tue': ['13:00', '14:00', '15:00', '16:00'],
      'wed': ['13:00', '14:00', '15:00', '16:00'],
      'thu': ['13:00', '14:00', '15:00', '16:00'],
      'fri': ['13:00', '14:00', '15:00', '16:00'],
      'sat': ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      'sun': ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    },
    services: [
      {
        id: 'service_008_1',
        name: '인물 사진 촬영법',
        description: '자연스러운 인물 사진 촬영을 위한 조명과 구도 기법을 배웁니다.',
        duration: 90,
        price: 70000,
        category: '사진',
        isActive: true
      },
      {
        id: 'service_008_2',
        name: 'Lightroom & Photoshop 보정',
        description: '전문적인 사진 보정과 색감 조정 기술을 익힙니다.',
        duration: 60,
        price: 55000,
        category: '사진',
        isActive: true
      },
      {
        id: 'service_008_3',
        name: '풍경 사진 마스터',
        description: '아름다운 풍경 사진을 위한 촬영 기법과 현장 노하우를 전수합니다.',
        duration: 120,
        price: 85000,
        category: '사진',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_009',
    name: '김소희',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('프로그래밍')!,
    specialties: ['Python', 'Django', '머신러닝', '데이터 분석'],
    rating: 4.8,
    reviewCount: 92,
    studentCount: 280,
    experience: '6년',
    pricePerHour: 55000,
    description: '네이버 AI 연구소 출신 개발자가 알려주는 실무 중심의 Python과 머신러닝을 배워보세요.',
    tags: ['Python', '머신러닝', '데이터분석', 'AI'],
    responseTime: 60,
    education: ['KAIST 전산학과', 'Stanford University AI 과정'],
    certifications: ['TensorFlow Developer Certificate', 'AWS ML Specialty'],
    introduction: '네이버 AI 연구소에서 5년간 머신러닝 엔지니어로 근무했습니다. 실무에서 사용하는 기술을 중심으로 가르쳐드립니다.',
    achievements: ['NIPS 논문 발표', 'Kaggle Competition 상위 1%'],
    portfolio: getTutorPortfolios('tutor_009'),
    consultationGuide: '프로그래밍 경험 수준과 Python 기초 지식 정도를 알려주세요. 관심 있는 분야(웹 개발, 데이터 분석, 머신러닝, AI 등)와 구체적인 학습 목표(취업 준비, 개인 프로젝트, 데이터 분석 업무 등)를 말씀해 주시면 실무 중심의 맞춤 교육을 제공해 드릴 수 있습니다. 특별히 해결하고 싶은 문제나 데이터가 있다면 함께 다뤄보겠습니다.',
    availability: {
      'mon': ['19:00', '20:00', '21:00', '22:00'],
      'tue': ['19:00', '20:00', '21:00', '22:00'],
      'wed': ['19:00', '20:00', '21:00', '22:00'],
      'thu': ['19:00', '20:00', '21:00', '22:00'],
      'fri': ['19:00', '20:00', '21:00', '22:00'],
      'sat': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'sun': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    services: [
      {
        id: 'service_009_1',
        name: 'Python 기초 & 실전',
        description: 'Python 기초 문법부터 실전 프로젝트까지 단계별로 학습합니다.',
        duration: 60,
        price: 55000,
        category: '프로그래밍',
        isActive: true
      },
      {
        id: 'service_009_2',
        name: '머신러닝 & 데이터 분석',
        description: '머신러닝 알고리즘과 데이터 분석 기법을 실무 예제로 배웁니다.',
        duration: 90,
        price: 75000,
        category: '프로그래밍',
        isActive: true
      },
      {
        id: 'service_009_3',
        name: 'Django 웹 개발',
        description: 'Django를 활용한 전문적인 웹 개발 방법을 배웁니다.',
        duration: 120,
        price: 95000,
        category: '프로그래밍',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_010',
    name: '박준혁',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('비즈니스')!,
    specialties: ['마케팅', '브랜딩', 'SNS 마케팅', '창업'],
    rating: 4.7,
    reviewCount: 134,
    studentCount: 450,
    experience: '8년',
    pricePerHour: 65000,
    description: '스타트업 창업 경험과 대기업 마케팅 경험을 바탕으로 실전 비즈니스 노하우를 전수합니다.',
    tags: ['마케팅', '창업', '브랜딩', '스타트업'],
    responseTime: 120,
    education: ['서울대학교 경영학과', 'Wharton MBA'],
    certifications: ['Google Ads 인증', 'Facebook Marketing 인증'],
    introduction: '3개의 스타트업 창업 경험과 삼성전자 마케팅팀 경력이 있습니다. 이론보다는 실제 성공 사례 중심으로 가르쳐드립니다.',
    achievements: ['스타트업 EXIT 경험', '마케팅 대상 수상'],
    portfolio: getTutorPortfolios('tutor_010'),
    consultationGuide: '비즈니스 경험과 현재 상황(창업 준비, 마케팅 담당자, 개인 사업 등)을 알려주세요. 특히 관심 있는 분야(디지털 마케팅, 브랜딩, 창업, SNS 마케팅 등)와 해결하고 싶은 구체적인 문제나 목표를 말씀해 주시면 실전 경험을 바탕으로 한 맞춤형 컨설팅을 제공해 드릴 수 있습니다. 현재 진행 중인 프로젝트나 사업이 있다면 함께 공유해 주세요.',
    availability: {
      'mon': ['10:00', '11:00', '15:00', '16:00', '20:00'],
      'tue': ['10:00', '11:00', '15:00', '16:00', '20:00'],
      'wed': ['10:00', '11:00', '15:00', '16:00', '20:00'],
      'thu': ['10:00', '11:00', '15:00', '16:00', '20:00'],
      'fri': ['10:00', '11:00', '15:00', '16:00', '20:00'],
      'sat': ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
      'sun': ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
    },
    services: [
      {
        id: 'service_010_1',
        name: '디지털 마케팅 전략',
        description: 'SNS 마케팅부터 브랜딩까지 실전 마케팅 전략을 배웁니다.',
        duration: 90,
        price: 80000,
        category: '비즈니스',
        isActive: true
      },
      {
        id: 'service_010_2',
        name: '창업 컨설팅',
        description: '스타트업 창업 과정과 성공 노하우를 실무 경험으로 전수합니다.',
        duration: 120,
        price: 120000,
        category: '비즈니스',
        isActive: true
      },
      {
        id: 'service_010_3',
        name: '브랜딩 & 포지셔닝',
        description: '브랜드 전략 수립과 시장 포지셔닝 방법을 배웁니다.',
        duration: 60,
        price: 65000,
        category: '비즈니스',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_011',
    name: '이하늘',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('언어')!,
    specialties: ['일본어', 'JLPT', '비즈니스 일본어', '일본 문화'],
    rating: 4.6,
    reviewCount: 78,
    studentCount: 190,
    experience: '7년',
    pricePerHour: 42000,
    description: '도쿄대 출신이 알려주는 정통 일본어! JLPT부터 비즈니스 일본어까지 완벽 마스터하세요.',
    tags: ['일본어', 'JLPT', '도쿄대', '비즈니스일본어'],
    responseTime: 60,
    education: ['도쿄대학교 언어학과', '고려대학교 일어일문학과'],
    certifications: ['JLPT N1', '일본어교원자격증'],
    introduction: '도쿄대에서 6년간 수학하며 일본 현지 문화와 언어를 완벽히 습득했습니다. 자연스러운 일본어 표현 중심으로 가르쳐드립니다.',
    achievements: ['JLPT N1 만점 달성', '일본어 번역대회 대상'],
    portfolio: getTutorPortfolios('tutor_011'),
    consultationGuide: '현재 일본어 수준(완전 초보자, 기초 회화 가능, JLPT 급수 등)과 학습 목표(JLPT 합격, 비즈니스 일본어, 일본 유학/취업 준비 등)를 알려주세요. 선호하는 학습 방식(회화 중심, 문법 체계적 학습, 실생활 표현 등)과 일본 문화나 특정 분야에 관심이 있다면 함께 말씀해 주시면 흥미롭고 실용적인 수업을 제공해 드릴 수 있습니다.',
    availability: {
      'mon': ['18:00', '19:00', '20:00', '21:00'],
      'tue': ['18:00', '19:00', '20:00', '21:00'],
      'wed': ['18:00', '19:00', '20:00', '21:00'],
      'thu': ['18:00', '19:00', '20:00', '21:00'],
      'fri': ['18:00', '19:00', '20:00', '21:00'],
      'sat': ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      'sun': ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
    },
    services: [
      {
        id: 'service_011_1',
        name: '일본어 회화 레슨',
        description: '자연스러운 일본어 표현과 발음에 중점을 둔 회화 수업입니다.',
        duration: 50,
        price: 42000,
        category: '언어',
        isActive: true
      },
      {
        id: 'service_011_2',
        name: 'JLPT 시험 대비',
        description: 'JLPT 각 급수별 맞춤형 학습과 실전 문제 풀이를 제공합니다.',
        duration: 60,
        price: 48000,
        category: '언어',
        isActive: true
      },
      {
        id: 'service_011_3',
        name: '비즈니스 일본어 & 문화',
        description: '비즈니스 상황에서 사용하는 일본어와 일본 문화를 함께 배웁니다.',
        duration: 90,
        price: 65000,
        category: '언어',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_012',
    name: '조현우',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('데이터 분석')!,
    specialties: ['Excel', 'SQL', 'Tableau', 'Power BI'],
    rating: 4.8,
    reviewCount: 156,
    studentCount: 520,
    experience: '9년',
    pricePerHour: 58000,
    description: '삼성전자 데이터 분석팀 출신이 알려주는 실무 데이터 분석! 엑셀부터 고급 BI 툴까지.',
    tags: ['데이터분석', 'Excel', 'SQL', 'BI툴'],
    responseTime: 60,
    education: ['연세대학교 통계학과', 'MIT 데이터사이언스 과정'],
    certifications: ['Microsoft Excel Expert', 'Tableau Certified Professional'],
    introduction: '삼성전자에서 9년간 데이터 분석 업무를 담당했습니다. 실무에서 바로 쓸 수 있는 데이터 분석 스킬을 가르쳐드립니다.',
    achievements: ['삼성전자 우수사원상', 'Tableau 공식 트레이너'],
    portfolio: getTutorPortfolios('tutor_012'),
    consultationGuide: '데이터 분석 경험과 현재 사용하고 계신 도구들(Excel, SQL, BI 툴 등)을 알려주세요. 업무 분야나 분석하고 싶은 데이터 종류, 구체적인 학습 목표(업무 효율성 향상, 커리어 전환, 자격증 취득 등)를 말씀해 주시면 실무 중심의 맞춤 교육을 제공해 드릴 수 있습니다. 특별히 해결하고 싶은 데이터 분석 과제가 있다면 함께 다뤄보겠습니다.',
    availability: {
      'mon': ['19:00', '20:00', '21:00'],
      'tue': ['19:00', '20:00', '21:00'],
      'wed': ['19:00', '20:00', '21:00'],
      'thu': ['19:00', '20:00', '21:00'],
      'fri': ['19:00', '20:00', '21:00'],
      'sat': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      'sun': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
    },
    services: [
      {
        id: 'service_012_1',
        name: 'Excel 데이터 분석',
        description: 'Excel의 고급 기능을 활용한 데이터 분석 방법을 배웁니다.',
        duration: 60,
        price: 50000,
        category: '데이터 분석',
        isActive: true
      },
      {
        id: 'service_012_2',
        name: 'SQL & 데이터베이스',
        description: 'SQL 기초부터 고급 쿼리까지 실무 중심으로 배웁니다.',
        duration: 90,
        price: 70000,
        category: '데이터 분석',
        isActive: true
      },
      {
        id: 'service_012_3',
        name: 'Tableau & Power BI 마스터',
        description: '전문적인 BI 도구를 활용한 데이터 시각화를 배웁니다.',
        duration: 120,
        price: 85000,
        category: '데이터 분석',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_013',
    name: '송미라',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('미술')!,
    specialties: ['수채화', '유화', '드로잉', '캐릭터 디자인'],
    rating: 4.9,
    reviewCount: 67,
    studentCount: 180,
    experience: '12년',
    pricePerHour: 48000,
    description: '홍익대 미술대학 출신 작가가 알려주는 전문적인 회화 기법과 창작 노하우를 배워보세요.',
    tags: ['미술', '회화', '드로잉', '작가'],
    responseTime: 240,
    education: ['홍익대학교 회화과', '파리 국립미술학교'],
    certifications: ['미술교사자격증', '미술치료사자격증'],
    introduction: '12년간 작가로 활동하며 다수의 개인전과 단체전을 가졌습니다. 기초 드로잉부터 전문 회화까지 체계적으로 가르쳐드립니다.',
    achievements: ['개인전 8회 개최', '미술대전 대상 수상'],
    portfolio: getTutorPortfolios('tutor_013'),
    consultationGuide: '미술 경험과 관심 있는 분야(수채화, 유화, 드로잉, 캐릭터 디자인 등)를 알려주세요. 현재 수준과 학습 목표(취미, 입시 준비, 작품 활동 등), 사용 가능한 재료나 작업 공간에 대해 말씀해 주시면 개인 맞춤형 커리큘럼을 제공해 드릴 수 있습니다. 그리고 싶은 특정 주제나 스타일이 있다면 함께 알려주세요.',
    availability: {
      'mon': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'tue': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'wed': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'thu': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'fri': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'sat': ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      'sun': ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    },
    services: [
      {
        id: 'service_013_1',
        name: '드로잉 기초',
        description: '기초 스케치부터 정확한 형태 잡는 법까지 드로잉의 기본을 배웁니다.',
        duration: 60,
        price: 48000,
        category: '미술',
        isActive: true
      },
      {
        id: 'service_013_2',
        name: '수채화 & 유화',
        description: '수채화와 유화의 특성을 이해하고 다양한 기법을 익힙니다.',
        duration: 90,
        price: 65000,
        category: '미술',
        isActive: true
      },
      {
        id: 'service_013_3',
        name: '캐릭터 디자인',
        description: '창의적인 캐릭터 디자인과 스토리텔링 기법을 배웁니다.',
        duration: 120,
        price: 80000,
        category: '미술',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_014',
    name: '한지수',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('수학')!,
    specialties: ['고등수학', '미적분', '통계', '대학수학'],
    rating: 4.7,
    reviewCount: 203,
    studentCount: 680,
    experience: '15년',
    pricePerHour: 65000,
    description: '서울대 수학과 출신 15년 경력의 수학 전문 강사가 알려주는 체계적인 수학 학습법.',
    tags: ['수학', '고등수학', '미적분', '입시'],
    responseTime: 120,
    education: ['서울대학교 수학과', '서울대학교 수학교육학과 석사'],
    certifications: ['수학교사자격증', '대학강사자격증'],
    introduction: '15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다. 15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.15년간 고등학교와 대학에서 수학을 가르친 경험이 있습니다. 개념부터 심화까지 단계별 맞춤 수업을 제공합니다.',
    achievements: ['수학 올림피아드 출제위원', '교육청 우수강사상'],
    portfolio: getTutorPortfolios('tutor_014'),
    consultationGuide: '현재 수학 수준과 학습 목표(내신 향상, 수능 준비, 대학수학 선행 등)를 구체적으로 알려주세요. 특히 어려워하는 단원이나 개념, 선호하는 학습 방식(개념 중심, 문제 풀이 중심, 단계별 설명 등)을 말씀해 주시면 개인 맞춤형 수업 계획을 세워드릴 수 있습니다. 목표 점수나 시험 일정이 있다면 함께 알려주세요.',
    availability: {
      'mon': ['17:00', '18:00', '19:00', '20:00'],
      'tue': ['17:00', '18:00', '19:00', '20:00'],
      'wed': ['17:00', '18:00', '19:00', '20:00'],
      'thu': ['17:00', '18:00', '19:00', '20:00'],
      'fri': ['17:00', '18:00', '19:00', '20:00'],
      'sat': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      'sun': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
    },
    services: [
      {
        id: 'service_014_1',
        name: '고등수학 마스터',
        description: '수능 수학부터 대학 수학까지 단계별 맞춤 수업입니다.',
        duration: 90,
        price: 70000,
        category: '수학',
        isActive: true
      },
      {
        id: 'service_014_2',
        name: '미적분 & 통계',
        description: '미적분과 통계의 개념부터 실전 응용까지 체계적으로 학습합니다.',
        duration: 60,
        price: 65000,
        category: '수학',
        isActive: true
      },
      {
        id: 'service_014_3',
        name: '수학 올림피아드 대비',
        description: '수학 올림피아드와 고난도 문제 해결 능력을 기릉니다.',
        duration: 120,
        price: 90000,
        category: '수학',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_015',
    name: '권태진',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('투자')!,
    specialties: ['주식투자', '부동산', '암호화폐', '재테크'],
    rating: 4.6,
    reviewCount: 89,
    studentCount: 310,
    experience: '12년',
    pricePerHour: 75000,
    description: '12년 투자 경험과 연 20% 수익률을 유지하는 투자 전문가가 알려주는 실전 투자 노하우.',
    tags: ['투자', '주식', '부동산', '재테크'],
    responseTime: 180,
    education: ['서울대학교 경제학과', 'CFA 자격증'],
    certifications: ['투자자문사', 'CFA Level 3'],
    introduction: '12년간 개인 투자자로 활동하며 연평균 20%의 수익률을 달성했습니다. 리스크 관리부터 포트폴리오 구성까지 체계적으로 가르쳐드립니다.',
    achievements: ['연 20% 수익률 10년 유지', '투자 서적 2권 출간'],
    portfolio: [],
    consultationGuide: '투자 경험과 관심 있는 투자 분야(주식, 부동산, 암호화폐 등)를 알려주세요. 현재 자산 규모와 투자 목표(안정적 수익, 자산 증식, 은퇴 준비 등), 위험 감수 수준을 구체적으로 말씀해 주시면 개인 맞춤형 포트폴리오와 투자 전략을 제공해 드릴 수 있습니다. 투자 기간과 목표 수익률이 있다면 함께 알려주세요.',
    availability: {
      'mon': ['20:00', '21:00', '22:00'],
      'tue': ['20:00', '21:00', '22:00'],
      'wed': ['20:00', '21:00', '22:00'],
      'thu': ['20:00', '21:00', '22:00'],
      'fri': ['20:00', '21:00', '22:00'],
      'sat': ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'],
      'sun': ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00']
    },
    services: [
      {
        id: 'service_015_1',
        name: '주식투자 기초 & 실전',
        description: '기초 주식 투자부터 고급 투자 전략까지 실전 경험으로 배웁니다.',
        duration: 90,
        price: 85000,
        category: '투자',
        isActive: true
      },
      {
        id: 'service_015_2',
        name: '부동산 투자 컨설팅',
        description: '부동산 투자의 기본부터 수익률 극대화 전략까지 제공합니다.',
        duration: 120,
        price: 120000,
        category: '투자',
        isActive: true
      },
      {
        id: 'service_015_3',
        name: '포트폴리오 관리 & 재테크',
        description: '개인 맞춤형 포트폴리오 구성과 리스크 관리 방법을 배웁니다.',
        duration: 60,
        price: 75000,
        category: '투자',
        isActive: true
      }
    ]
  },
  {
    id: 'tutor_016',
    name: '최연주',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    category: getCategoryByName('건강')!,
    specialties: ['영양학', '다이어트', '건강관리', '식단관리'],
    rating: 4.8,
    reviewCount: 142,
    studentCount: 380,
    experience: '8년',
    pricePerHour: 52000,
    description: '임상영양사 출신이 알려주는 과학적인 영양 관리와 건강한 다이어트 방법을 배워보세요.',
    tags: ['영양학', '다이어트', '건강관리', '임상영양사'],
    responseTime: 120,
    education: ['이화여대 식품영양학과', '서울대학교 보건대학원'],
    certifications: ['임상영양사', '스포츠영양사'],
    introduction: '8년간 병원에서 임상영양사로 근무하며 다양한 환자들의 영양 관리를 담당했습니다. 개인별 맞춤 영양 관리법을 가르쳐드립니다.',
    achievements: ['영양학회 우수논문상', '건강관리 프로그램 개발'],
    portfolio: [],
    consultationGuide: '현재 건강 상태와 주요 관심사(체중 관리, 영양 개선, 질병 예방 등)를 알려주세요. 현재 식습관, 운동 루틴, 건강상 주의사항이나 복용 중인 약물이 있다면 말씀해 주시면 안전하고 효과적인 맞춤형 건강 관리 계획을 제공해 드릴 수 있습니다. 특별한 다이어트 목표나 건강 개선 목표가 있다면 구체적으로 알려주세요.',
    availability: {
      'mon': ['09:00', '10:00', '14:00', '15:00', '19:00'],
      'tue': ['09:00', '10:00', '14:00', '15:00', '19:00'],
      'wed': ['09:00', '10:00', '14:00', '15:00', '19:00'],
      'thu': ['09:00', '10:00', '14:00', '15:00', '19:00'],
      'fri': ['09:00', '10:00', '14:00', '15:00', '19:00'],
      'sat': ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
      'sun': ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
    },
    services: [
      {
        id: 'service_016_1',
        name: '맞춤 영양 관리',
        description: '개인별 건강 상태에 맞춘 과학적인 영양 관리 계획을 제공합니다.',
        duration: 60,
        price: 52000,
        category: '건강',
        isActive: true
      },
      {
        id: 'service_016_2',
        name: '건강한 다이어트',
        description: '요요 없는 건강한 다이어트와 체중 관리 방법을 배웁니다.',
        duration: 50,
        price: 45000,
        category: '건강',
        isActive: true
      },
      {
        id: 'service_016_3',
        name: '식단 설계 & 건강 컨설팅',
        description: '개인 맞춤형 식단 설계와 종합적인 건강 관리 컨설팅을 제공합니다.',
        duration: 90,
        price: 70000,
        category: '건강',
        isActive: true
      }
    ]
  }
];