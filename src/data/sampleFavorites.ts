import { FavoriteTutor, FavoritePost } from '@/store/favoritesStore';

export const sampleFavoriteTutors: FavoriteTutor[] = [
  {
    id: 'tutor_1',
    name: '이요리',
    avatar: '👩‍🍳',
    specialties: ['한식', '양식', '파스타'],
    rating: 4.9,
    experience: '요리 강사 8년차',
    hourlyRate: 35000,
    responseTime: '평균 2시간',
    category: 'cooking',
    addedDate: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'tutor_2',
    name: '박트레이너',
    avatar: '💪',
    specialties: ['홈트레이닝', '체형교정', '다이어트'],
    rating: 4.8,
    experience: '퍼스널트레이너 10년차',
    hourlyRate: 50000,
    responseTime: '평균 1시간',
    category: 'fitness',
    addedDate: '2024-01-20T14:20:00.000Z'
  },
  {
    id: 'tutor_3',
    name: '최기타',
    avatar: '🎸',
    specialties: ['기타 기초', '핑거스타일', '작곡'],
    rating: 4.9,
    experience: '음악 강사 12년차',
    hourlyRate: 40000,
    responseTime: '평균 3시간',
    category: 'music',
    addedDate: '2024-01-25T09:15:00.000Z'
  }
];

export const sampleFavoritePosts: FavoritePost[] = [
  {
    id: '2',
    title: 'F코드 정복하는 단계별 가이드 (초보자용)',
    author: '이기타',
    category: 'music',
    categoryEmoji: '🎸',
    type: 'guide',
    timeAgo: '15분 전',
    likes: 156,
    comments: 43,
    views: 892,
    authorType: 'expert',
    addedDate: '2024-01-22T16:45:00.000Z'
  },
  {
    id: '3',
    title: '홈트레이닝 시 부상 방지하는 핵심 원칙들',
    author: '박트레이너',
    category: 'fitness',
    categoryEmoji: '💪',
    type: 'tip',
    timeAgo: '1시간 전',
    likes: 203,
    comments: 67,
    views: 1156,
    authorType: 'expert',
    addedDate: '2024-01-24T11:30:00.000Z'
  },
  {
    id: '5',
    title: '김치볶음밥 완벽하게 만드는 법',
    author: '김치사랑',
    category: 'cooking',
    categoryEmoji: '🍳',
    type: 'tip',
    timeAgo: '3시간 전',
    likes: 34,
    comments: 9,
    views: 128,
    authorType: 'student',
    addedDate: '2024-01-26T08:20:00.000Z'
  }
];