import { ChatMessage, ChatContext, Session } from '@/types/entities/chat';
import type { UserType } from '@/features/auth/types/auth';

// 채팅방별 데이터 타입
export interface ChatRoomData {
  sessions: Session[];
  contexts: ChatContext[];
  messages: ChatMessage[];
}

// 컨텍스트별 미읽음 수로부터 총 미읽음 수를 계산하는 헬퍼 함수
const calculateTotalUnreadCount = (contextUnreadCounts?: { [contextId: string]: number }): number => {
  if (!contextUnreadCounts) return 0;
  return Object.values(contextUnreadCounts).reduce((total, count) => total + count, 0);
};

// 채팅방 리스트 인터페이스
export interface ChatRoom {
  id: string;
  contactName: string;
  contactAvatar: string;
  contactCategory?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messageType: 'text' | 'image' | 'video' | 'file';
  activeSessionName?: string;
  totalContexts?: number;
  contextUnreadCounts?: { [contextId: string]: number };
}

// 튜티 관점의 데이터 (튜터들과 대화)
export const tuteeChatRoomDataMap: { [key: string]: ChatRoomData } = {
  '1': { // 김셰프
    sessions: [
      {
        id: 'cooking_session_001',
        type: 'other',
        name: '요리 클래스',
        duration: 60,
        price: 40000,
        startTime: new Date('2024-01-16T14:00:00'),
        endTime: new Date('2024-01-16T15:00:00'),
        status: 'completed',
        chatRoomId: '1'
      }
    ],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 2
      },
      {
        id: 'cooking_session_001',
        name: '요리 클래스',
        icon: '👨‍🍳',
        type: 'session',
        sessionType: 'other',
        sessionId: 'cooking_session_001',
        isActive: false,
        unreadCount: 3
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '안녕하세요! 파스타 만들 때 면이 계속 퍼져서 고민이에요.',
        timestamp: '2024-01-16T14:30:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '파스타 영상 확인했어요! 소스 농도가 문제네요',
        timestamp: '2024-01-16T14:32:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '3',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '아 그렇군요! 소스를 어떻게 조절해야 할까요?',
        timestamp: '2024-01-16T14:33:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '4',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '파스타 물 끓일 때 소금을 충분히 넣으셨나요? 그리고 소스는 파스타 삶은 물을 조금씩 넣어가면서 농도를 맞춰야 해요.',
        timestamp: '2024-01-16T14:35:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '5',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '소금은 넣었는데 파스타 물을 소스에 넣는다는 건 처음 들어보네요!',
        timestamp: '2024-01-16T14:36:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '6',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '네 맞아요! 파스타 물에는 전분이 들어있어서 소스가 면에 잘 달라붙게 도와줍니다. 그리고 크림소스의 경우 농도 조절에도 필수예요.',
        timestamp: '2024-01-16T14:37:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '7',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '오~ 그런 이유가 있었군요! 다음에 만들 때 꼭 해봐야겠어요.',
        timestamp: '2024-01-16T14:38:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '8',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '그리고 한 가지 더 팁을 드리자면, 면을 삶을 때 포장지에 적힌 시간보다 30초~1분 정도 덜 삶으세요. 그 다음에 팬에서 소스와 함께 마저 익히면 더 맛있어요!',
        timestamp: '2024-01-16T14:40:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '9',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '와 정말 도움이 많이 됐어요! 오늘 저녁에 바로 시도해보겠습니다 ㅎㅎ',
        timestamp: '2024-01-16T14:41:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '10',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '네! 결과 사진도 꼭 보여주세요. 궁금한 점 있으면 언제든 물어보세요 👨‍🍳',
        timestamp: '2024-01-16T14:42:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '11',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '네 감사합니다! 혹시 다른 파스타 종류에 대해서도 팁이 있으신가요?',
        timestamp: '2024-01-16T14:45:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '12',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '물론이죠! 펜네나 푸실리 같은 짧은 파스타는 소스가 홈에 잘 들어가서 크림소스나 토마토소스와 잘 어울려요. 반면 스파게티나 링귀네는 오일 베이스 소스가 좋습니다.',
        timestamp: '2024-01-16T14:47:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '13',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '아하! 면의 모양에 따라 어울리는 소스가 다르군요. 정말 배우는 게 많네요!',
        timestamp: '2024-01-16T14:48:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '14',
        chatRoomId: '1',
        senderId: 'tutor',
        senderName: '김셰프',
        type: 'text',
        content: '맞아요! 각 파스타의 특성을 알고 요리하면 훨씬 맛있게 만들 수 있어요. 다음에는 리조또 만들기도 알려드릴게요 🍚',
        timestamp: '2024-01-16T14:50:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '15',
        chatRoomId: '1',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '리조또도 궁금해요! 정말 감사합니다 선생님 😊',
        timestamp: '2024-01-16T14:51:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '2': { // 이기타
    sessions: [
      {
        id: 'guitar_session_001',
        type: 'other',
        name: '기타 레슨',
        duration: 45,
        price: 35000,
        startTime: new Date('2024-01-16T16:00:00'),
        status: 'active',
        chatRoomId: '2'
      }
    ],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      },
      {
        id: 'guitar_session_001',
        name: '기타 레슨',
        icon: '🎸',
        type: 'session',
        sessionType: 'other',
        sessionId: 'guitar_session_001',
        isActive: true,
        unreadCount: 1
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '2',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '안녕하세요! F코드가 너무 어려워요.',
        timestamp: '2024-01-16T15:30:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '2',
        senderId: 'tutor',
        senderName: '이기타',
        type: 'text',
        content: 'F코드 연습 영상 보내드릴게요',
        timestamp: '2024-01-16T15:32:00',
        isRead: false,
        senderType: 'tutor'
      }
    ]
  },
  '3': { // 박트레이너
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 1
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '3',
        senderId: 'tutor',
        senderName: '박트레이너',
        type: 'text',
        content: '운동 자세 사진 잘 받았습니다',
        timestamp: '2024-01-16T13:30:00',
        isRead: false,
        senderType: 'tutor'
      }
    ]
  },
  '4': { // 최영어
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '4',
        senderId: 'tutor',
        senderName: '최영어',
        type: 'text',
        content: '발음 교정 음성파일 첨부했어요',
        timestamp: '2024-01-16T11:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '5': { // 김아티스트
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '5',
        senderId: 'tutor',
        senderName: '김아티스트',
        type: 'text',
        content: '그림 구도에 대해 조언드릴게요',
        timestamp: '2024-01-15T14:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '6': { // 정수학
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 3
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '6',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '안녕하세요! 어제 배운 미적분 개념이 이해가 잘 안 되네요.',
        timestamp: '2024-01-16T12:00:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '6',
        senderId: 'tutor',
        senderName: '정수학',
        type: 'text',
        content: '미적분 개념 설명 잘 이해하셨나요?',
        timestamp: '2024-01-16T12:30:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '3',
        chatRoomId: '6',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '아직 잘 모르겠어요. 특히 극한의 개념이 어려워요.',
        timestamp: '2024-01-16T12:35:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '4',
        chatRoomId: '6',
        senderId: 'tutor',
        senderName: '정수학',
        type: 'text',
        content: '문제 풀이에서 막히는 부분이 있으면 언제든 질문하세요',
        timestamp: '2024-01-16T12:45:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '5',
        chatRoomId: '6',
        senderId: 'tutor',
        senderName: '정수학',
        type: 'text',
        content: '다음 수업 전에 연습문제 풀어보시기 바랍니다',
        timestamp: '2024-01-16T13:00:00',
        isRead: false,
        senderType: 'tutor'
      }
    ]
  },
  '7': { // 박과학
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '7',
        senderId: 'tutor',
        senderName: '박과학',
        type: 'text',
        content: '실험 결과 사진 보내주세요',
        timestamp: '2024-01-16T10:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '8': { // 윤댄스
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 2
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '8',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '안녕하세요! 어제 배운 안무 연습하고 있는데 어려워요.',
        timestamp: '2024-01-16T09:00:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '8',
        senderId: 'tutor',
        senderName: '윤댄스',
        type: 'text',
        content: '안무 영상 연습하신 걸 올려주세요',
        timestamp: '2024-01-16T09:30:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '3',
        chatRoomId: '8',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '네! 어디서거 시작하면 좋을까요?',
        timestamp: '2024-01-16T09:35:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '4',
        chatRoomId: '8',
        senderId: 'tutor',
        senderName: '윤댄스',
        type: 'text',
        content: '기본 스텝부터 차근차근 연습해보세요',
        timestamp: '2024-01-16T09:45:00',
        isRead: false,
        senderType: 'tutor'
      }
    ]
  },
  '9': { // 김프로그래머
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 1
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '9',
        senderId: 'tutor',
        senderName: '김프로그래머',
        type: 'text',
        content: '코드 리뷰 완료했습니다',
        timestamp: '2024-01-16T08:30:00',
        isRead: false,
        senderType: 'tutor'
      }
    ]
  },
  '10': { // 이사진
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '10',
        senderId: 'tutor',
        senderName: '이사진',
        type: 'text',
        content: '포트폴리오 작품 확인해주세요',
        timestamp: '2024-01-15T16:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '11': { // 최글쓰기
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '11',
        senderId: 'tutor',
        senderName: '최글쓰기',
        type: 'text',
        content: '첨삭 결과 파일 첨부했어요',
        timestamp: '2024-01-14T14:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '12': { // 한국사
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '12',
        senderId: 'tutor',
        senderName: '한국사',
        type: 'text',
        content: '조선시대 문화에 대해 더 궁금한 게 있으면 언제든 물어보세요',
        timestamp: '2024-01-13T14:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '13': { // 박경제
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 3
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '13',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '안녕하세요! 경제학 기초가 너무 어려워서 도움이 필요해요.',
        timestamp: '2024-01-09T14:00:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '13',
        senderId: 'tutor',
        senderName: '박경제',
        type: 'text',
        content: '시장경제 원리 설명자료 보내드릴게요',
        timestamp: '2024-01-09T14:30:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '3',
        chatRoomId: '13',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '감사합니다! 어디서거 시작하면 좋을까요?',
        timestamp: '2024-01-09T14:45:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '4',
        chatRoomId: '13',
        senderId: 'tutor',
        senderName: '박경제',
        type: 'text',
        content: '경제학 기초 개념부터 차근차근 설명드리겠습니다',
        timestamp: '2024-01-09T15:00:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '5',
        chatRoomId: '13',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '네! 어려운 부분이 나오면 바로 질문드릴게요.',
        timestamp: '2024-01-09T15:10:00',
        isRead: true,
        senderType: 'student'
      },
      {
        id: '6',
        chatRoomId: '13',
        senderId: 'tutor',
        senderName: '박경제',
        type: 'text',
        content: '질문 있으시면 언제든 말씀해주세요',
        timestamp: '2024-01-09T15:15:00',
        isRead: false,
        senderType: 'tutor'
      },
      {
        id: '7',
        chatRoomId: '13',
        senderId: 'tutor',
        senderName: '박경제',
        type: 'text',
        content: '다음 주까지 읽어보고 정리해와. 모르는 부분 있으면 바로 연락해!',
        timestamp: '2024-01-09T15:30:00',
        isRead: false,
        senderType: 'tutor'
      }
    ]
  },
  '14': { // 김심리
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '14',
        senderId: 'tutor',
        senderName: '김심리',
        type: 'text',
        content: '상담 일정 조정이 필요하시면 말씀해 주세요',
        timestamp: '2024-01-09T14:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  },
  '15': { // 정철학
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '15',
        senderId: 'tutor',
        senderName: '정철학',
        type: 'text',
        content: '니체의 철학에 대한 의견 교환해봐요',
        timestamp: '2024-01-02T14:30:00',
        isRead: true,
        senderType: 'tutor'
      }
    ]
  }
};

// 튜터 관점의 데이터 (학생들과 대화)
export const tutorChatRoomDataMap: { [key: string]: ChatRoomData } = {
  '1': { // 정수강생
    sessions: [
      {
        id: 'lesson_session_001',
        type: 'other',
        name: '개인 수업',
        duration: 60,
        price: 50000,
        startTime: new Date('2024-01-16T14:00:00'),
        endTime: new Date('2024-01-16T15:00:00'),
        status: 'completed',
        chatRoomId: '1'
      }
    ],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 1
      },
      {
        id: 'lesson_session_001',
        name: '개인 수업',
        icon: '📚',
        type: 'session',
        sessionType: 'other',
        sessionId: 'lesson_session_001',
        isActive: false,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '1',
        senderId: 'student',
        senderName: '정수강생',
        type: 'text',
        content: '오늘 수업 감사했어요! 다음 주에도 잘 부탁드릴게요',
        timestamp: '2024-01-16T16:30:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '2': { // 김학습자
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '2',
        senderId: 'student',
        senderName: '김학습자',
        type: 'text',
        content: '좋아요! 과제 영상 보내드릴게요',
        timestamp: '2024-01-16T15:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '3': { // 이초보
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 2
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '3',
        senderId: 'student',
        senderName: '이초보',
        type: 'text',
        content: '과제 사진 찍어서 보내드릴게요',
        timestamp: '2024-01-16T14:30:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '3',
        senderId: 'student',
        senderName: '이초보',
        type: 'text',
        content: '언제 확인해주실 수 있나요?',
        timestamp: '2024-01-16T14:45:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '4': { // 박열심
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '4',
        senderId: 'student',
        senderName: '박열심',
        type: 'text',
        content: '과제 파일 첨부했습니다',
        timestamp: '2024-01-16T12:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '5': { // 최노력
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '5',
        senderId: 'student',
        senderName: '최노력',
        type: 'text',
        content: '오늘 수업 정말 도움이 되었어요',
        timestamp: '2024-01-15T14:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '6': { // 강의욕
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 2
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '6',
        senderId: 'student',
        senderName: '강의욕',
        type: 'text',
        content: '숙제 완료했습니다! 확인해주세요',
        timestamp: '2024-01-16T12:30:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '6',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '수고하셨어요! 잘 해주셨네요. 다음 단계로 넘어가도 될 것 같아요.',
        timestamp: '2024-01-16T12:35:00',
        isRead: true,
        senderType: 'tutor'
      },
      {
        id: '3',
        chatRoomId: '6',
        senderId: 'student',
        senderName: '강의욕',
        type: 'text',
        content: '다음 단계 연습문제도 받을 수 있을까요?',
        timestamp: '2024-01-16T12:45:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '4',
        chatRoomId: '6',
        senderId: 'current_user',
        senderName: '나',
        type: 'text',
        content: '네! 다음 단계 자료 보내드릴게요.',
        timestamp: '2024-01-16T12:50:00',
        isRead: true,
        senderType: 'tutor'
      },
      {
        id: '5',
        chatRoomId: '6',
        senderId: 'student',
        senderName: '강의욕',
        type: 'text',
        content: '오늘도 열심히 공부하겠습니다!',
        timestamp: '2024-01-16T13:00:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '7': { // 윤궁금
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 1
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '7',
        senderId: 'student',
        senderName: '윤궁금',
        type: 'text',
        content: '어제 배운 내용 중에 질문이 있어요',
        timestamp: '2024-01-16T11:30:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '8': { // 신입생
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 2
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '8',
        senderId: 'student',
        senderName: '신입생',
        type: 'text',
        content: '첫 수업 준비물이 뭔가요?',
        timestamp: '2024-01-16T10:30:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '8',
        senderId: 'student',
        senderName: '신입생',
        type: 'text',
        content: '언제 수업을 시작할 수 있나요?',
        timestamp: '2024-01-16T10:45:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '9': { // 조연습
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '9',
        senderId: 'student',
        senderName: '조연습',
        type: 'text',
        content: '연습 영상 올렸어요! 피드백 부탁드려요',
        timestamp: '2024-01-16T09:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '10': { // 한성실
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 4
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '10',
        senderId: 'student',
        senderName: '한성실',
        type: 'text',
        content: '시험 준비 자료 정리해서 보내드릴게요',
        timestamp: '2024-01-15T14:30:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '10',
        senderId: 'student',
        senderName: '한성실',
        type: 'text',
        content: '어떤 부분을 더 중점적으로 공부해야 할까요?',
        timestamp: '2024-01-15T15:00:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '3',
        chatRoomId: '10',
        senderId: 'student',
        senderName: '한성실',
        type: 'text',
        content: '추가 연습문제가 필요하다면 말씀해주세요',
        timestamp: '2024-01-15T15:15:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '4',
        chatRoomId: '10',
        senderId: 'student',
        senderName: '한성실',
        type: 'text',
        content: '오늘도 열심히 공부하겠습니다!',
        timestamp: '2024-01-15T15:30:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '11': { // 배우고파
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '11',
        senderId: 'student',
        senderName: '배우고파',
        type: 'text',
        content: '다음 수업 시간 변경 가능한가요?',
        timestamp: '2024-01-15T14:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '12': { // 김진지
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 1
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '12',
        senderId: 'student',
        senderName: '김진지',
        type: 'text',
        content: '과제 제출 기한이 언제인가요?',
        timestamp: '2024-01-14T14:30:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '13': { // 이적극
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '13',
        senderId: 'student',
        senderName: '이적극',
        type: 'text',
        content: '추가 자료 있으면 더 주세요!',
        timestamp: '2024-01-13T14:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '14': { // 최집중
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '14',
        senderId: 'student',
        senderName: '최집중',
        type: 'text',
        content: '녹음 파일 잘 들었어요. 감사합니다',
        timestamp: '2024-01-09T14:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '15': { // 박완료
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 2
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '15',
        senderId: 'student',
        senderName: '박완료',
        type: 'text',
        content: '모든 과제 제출 완료했습니다!',
        timestamp: '2024-01-09T14:30:00',
        isRead: false,
        senderType: 'student'
      },
      {
        id: '2',
        chatRoomId: '15',
        senderId: 'student',
        senderName: '박완료',
        type: 'text',
        content: '다음 수업때 뭐 준비하면 될까요?',
        timestamp: '2024-01-09T14:45:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  },
  '16': { // 송빠름
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 0
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '16',
        senderId: 'student',
        senderName: '송빠름',
        type: 'text',
        content: '다음 단계로 넘어가도 될까요?',
        timestamp: '2024-01-02T14:30:00',
        isRead: true,
        senderType: 'student'
      }
    ]
  },
  '17': { // 정꼼꼼
    sessions: [],
    contexts: [
      {
        id: 'general',
        name: '일반 상담',
        icon: '💬',
        type: 'general',
        isActive: true,
        unreadCount: 1
      }
    ],
    messages: [
      {
        id: '1',
        chatRoomId: '17',
        senderId: 'student',
        senderName: '정꼼꼼',
        type: 'text',
        content: '세부 사항까지 자세히 알려주세요',
        timestamp: '2024-01-02T14:30:00',
        isRead: false,
        senderType: 'student'
      }
    ]
  }
};

// 튜티용 채팅방 데이터 (여러 분야 튜터와 대화)
export const tuteeChatRooms: ChatRoom[] = [
  {
    id: '1',
    contactName: '김셰프',
    contactAvatar: '👨‍🍳',
    contactCategory: '요리',
    lastMessage: '파스타 영상 확인했어요! 소스 농도가 문제네요',
    lastMessageTime: '2분 전',
    unreadCount: calculateTotalUnreadCount({
      'general': 2,
      'cooking_session_001': 3
    }),
    isOnline: true,
    messageType: 'text',
    activeSessionName: '요리 클래스',
    totalContexts: 2,
    contextUnreadCounts: {
      'general': 2,
      'cooking_session_001': 3
    }
  },
  {
    id: '2',
    contactName: '이기타',
    contactAvatar: '🎸',
    contactCategory: '악기',
    lastMessage: 'F코드 연습 영상 보내드릴게요',
    lastMessageTime: '15분 전',
    unreadCount: calculateTotalUnreadCount({
      'general': 0,
      'guitar_session_001': 1
    }),
    isOnline: true,
    messageType: 'video',
    totalContexts: 2,
    contextUnreadCounts: {
      'general': 0,
      'guitar_session_001': 1
    }
  },
  {
    id: '3',
    contactName: '박트레이너',
    contactAvatar: '💪',
    contactCategory: '운동',
    lastMessage: '운동 자세 사진 잘 받았습니다',
    lastMessageTime: '1시간 전',
    unreadCount: 1,
    isOnline: false,
    messageType: 'image'
  },
  {
    id: '4',
    contactName: '최영어',
    contactAvatar: '🗣️',
    contactCategory: '언어',
    lastMessage: '발음 교정 음성파일 첨부했어요',
    lastMessageTime: '3시간 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '5',
    contactName: '김아티스트',
    contactAvatar: '🎨',
    contactCategory: '디자인',
    lastMessage: '그림 구도에 대해 조언드릴게요',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '6',
    contactName: '정수학',
    contactAvatar: '📚',
    contactCategory: '수학',
    lastMessage: '미적분 개념 설명 잘 이해하셨나요?',
    lastMessageTime: '2시간 전',
    unreadCount: 3,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '7',
    contactName: '박과학',
    contactAvatar: '🧪',
    contactCategory: '과학',
    lastMessage: '실험 결과 사진 보내주세요',
    lastMessageTime: '4시간 전',
    unreadCount: 0,
    isOnline: false,
    messageType: 'image'
  },
  {
    id: '8',
    contactName: '윤댄스',
    contactAvatar: '💃',
    contactCategory: '댄스',
    lastMessage: '안무 영상 연습하신 걸 올려주세요',
    lastMessageTime: '5시간 전',
    unreadCount: 2,
    isOnline: true,
    messageType: 'video'
  },
  {
    id: '9',
    contactName: '김프로그래머',
    contactAvatar: '💻',
    contactCategory: 'IT',
    lastMessage: '코드 리뷰 완료했습니다',
    lastMessageTime: '6시간 전',
    unreadCount: 1,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '10',
    contactName: '이사진',
    contactAvatar: '📷',
    contactCategory: '사진',
    lastMessage: '포트폴리오 작품 확인해주세요',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: false,
    messageType: 'image'
  },
  {
    id: '11',
    contactName: '최글쓰기',
    contactAvatar: '✍️',
    contactCategory: '글쓰기',
    lastMessage: '첨삭 결과 파일 첨부했어요',
    lastMessageTime: '2일 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '12',
    contactName: '한국사',
    contactAvatar: '📜',
    contactCategory: '역사',
    lastMessage: '조선시대 문화에 대해 더 궁금한 게 있으면 언제든 물어보세요',
    lastMessageTime: '3일 전',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '13',
    contactName: '박경제',
    contactAvatar: '📈',
    contactCategory: '경제',
    lastMessage: '시장경제 원리 설명자료 보내드릴게요',
    lastMessageTime: '1주 전',
    unreadCount: 4,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '14',
    contactName: '김심리',
    contactAvatar: '🧠',
    contactCategory: '심리',
    lastMessage: '상담 일정 조정이 필요하시면 말씀해 주세요',
    lastMessageTime: '1주 전',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '15',
    contactName: '정철학',
    contactAvatar: '🤔',
    contactCategory: '철학',
    lastMessage: '니체의 철학에 대한 의견 교환해봐요',
    lastMessageTime: '2주 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'text'
  }
];

// 튜터용 채팅방 데이터 (수강생들과 대화, 카테고리 불필요)
export const tutorChatRooms: ChatRoom[] = [
  {
    id: '1',
    contactName: '정수강생',
    contactAvatar: '😊',
    lastMessage: '오늘 수업 감사했어요! 다음 주에도 잘 부탁드릴게요',
    lastMessageTime: '10분 전',
    unreadCount: 1,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '2',
    contactName: '김학습자',
    contactAvatar: '🧑‍🎓',
    lastMessage: '좋아요! 과제 영상 보내드릴게요',
    lastMessageTime: '30분 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'video'
  },
  {
    id: '3',
    contactName: '이초보',
    contactAvatar: '🙋‍♀️',
    lastMessage: '과제 사진 찍어서 보내드릴게요',
    lastMessageTime: '1시간 전',
    unreadCount: 2,
    isOnline: false,
    messageType: 'image'
  },
  {
    id: '4',
    contactName: '박열심',
    contactAvatar: '💪',
    lastMessage: '과제 파일 첨부했습니다',
    lastMessageTime: '2시간 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '5',
    contactName: '최노력',
    contactAvatar: '😎',
    lastMessage: '오늘 수업 정말 도움이 되었어요',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '6',
    contactName: '강의욕',
    contactAvatar: '🔥',
    lastMessage: '숙제 완료했습니다! 확인해주세요',
    lastMessageTime: '2시간 전',
    unreadCount: 3,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '7',
    contactName: '윤궁금',
    contactAvatar: '🤔',
    lastMessage: '어제 배운 내용 중에 질문이 있어요',
    lastMessageTime: '3시간 전',
    unreadCount: 1,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '8',
    contactName: '신입생',
    contactAvatar: '🆕',
    lastMessage: '첫 수업 준비물이 뭔가요?',
    lastMessageTime: '4시간 전',
    unreadCount: 2,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '9',
    contactName: '조연습',
    contactAvatar: '📝',
    lastMessage: '연습 영상 올렸어요! 피드백 부탁드려요',
    lastMessageTime: '5시간 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'video'
  },
  {
    id: '10',
    contactName: '한성실',
    contactAvatar: '📚',
    lastMessage: '시험 준비 자료 정리해서 보내드릴게요',
    lastMessageTime: '어제',
    unreadCount: 4,
    isOnline: false,
    messageType: 'file'
  },
  {
    id: '11',
    contactName: '배우고파',
    contactAvatar: '🌟',
    lastMessage: '다음 수업 시간 변경 가능한가요?',
    lastMessageTime: '어제',
    unreadCount: 0,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '12',
    contactName: '김진지',
    contactAvatar: '🎯',
    lastMessage: '과제 제출 기한이 언제인가요?',
    lastMessageTime: '2일 전',
    unreadCount: 1,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '13',
    contactName: '이적극',
    contactAvatar: '✋',
    lastMessage: '추가 자료 있으면 더 주세요!',
    lastMessageTime: '3일 전',
    unreadCount: 0,
    isOnline: true,
    messageType: 'text'
  },
  {
    id: '14',
    contactName: '최집중',
    contactAvatar: '🎧',
    lastMessage: '녹음 파일 잘 들었어요. 감사합니다',
    lastMessageTime: '1주 전',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '15',
    contactName: '박완료',
    contactAvatar: '✅',
    lastMessage: '모든 과제 제출 완료했습니다!',
    lastMessageTime: '1주 전',
    unreadCount: 2,
    isOnline: true,
    messageType: 'file'
  },
  {
    id: '16',
    contactName: '송빠름',
    contactAvatar: '⚡',
    lastMessage: '다음 단계로 넘어가도 될까요?',
    lastMessageTime: '2주 전',
    unreadCount: 0,
    isOnline: false,
    messageType: 'text'
  },
  {
    id: '17',
    contactName: '정꼼꼼',
    contactAvatar: '🔍',
    lastMessage: '세부 사항까지 자세히 알려주세요',
    lastMessageTime: '2주 전',
    unreadCount: 1,
    isOnline: true,
    messageType: 'text'
  }
];

// 채팅방 정보 데이터
export const mockChatRooms = {
  '1': { name: '김셰프', avatar: '👨‍🍳', category: '요리', isOnline: true, rating: 4.9, responseTime: '평균 3분' },
  '2': { name: '이기타', avatar: '🎸', category: '악기', isOnline: true, rating: 4.8, responseTime: '평균 5분' },
  '3': { name: '박트레이너', avatar: '💪', category: '운동', isOnline: false, rating: 4.7, responseTime: '평균 10분' },
  '4': { name: '최영어', avatar: '🗣️', category: '언어', isOnline: true, rating: 4.9, responseTime: '평균 2분' },
  '5': { name: '김아티스트', avatar: '🎨', category: '디자인', isOnline: false, rating: 4.6, responseTime: '평균 15분' },
  '6': { name: '정수학', avatar: '📚', category: '수학', isOnline: true, rating: 4.8, responseTime: '평균 5분' },
  '7': { name: '박과학', avatar: '🧪', category: '과학', isOnline: false, rating: 4.7, responseTime: '평균 8분' },
  '8': { name: '윤댄스', avatar: '💃', category: '댄스', isOnline: true, rating: 4.9, responseTime: '평균 4분' },
  '9': { name: '김프로그래머', avatar: '💻', category: 'IT', isOnline: true, rating: 4.8, responseTime: '평균 6분' },
  '10': { name: '이사진', avatar: '📷', category: '사진', isOnline: false, rating: 4.6, responseTime: '평균 12분' },
  '11': { name: '최글쓰기', avatar: '✍️', category: '글쓰기', isOnline: true, rating: 4.7, responseTime: '평균 7분' },
  '12': { name: '한국사', avatar: '📜', category: '역사', isOnline: false, rating: 4.8, responseTime: '평균 9분' },
  '13': { name: '박경제', avatar: '📈', category: '경제', isOnline: true, rating: 4.9, responseTime: '평균 5분' },
  '14': { name: '김심리', avatar: '🧠', category: '심리', isOnline: false, rating: 4.8, responseTime: '평균 8분' },
  '15': { name: '정철학', avatar: '🤔', category: '철학', isOnline: true, rating: 4.7, responseTime: '평균 10분' },
};

// 채팅방 목록 가져오기 함수
export const getChatRoomList = (userType: UserType = 'student'): ChatRoom[] => {
  return userType === 'tutor' ? tutorChatRooms : tuteeChatRooms;
};

// 데이터 가져오기 함수
export const getChatRoomData = (chatId: string, userType: string = 'student'): ChatRoomData => {
  const dataMap = userType === 'student' ? tuteeChatRoomDataMap : tutorChatRoomDataMap;
  return dataMap[chatId] || dataMap['1']; // 기본값
};

// 채팅방 정보 가져오기 함수
export const getChatRoomInfo = (chatId: string) => {
  return mockChatRooms[chatId as keyof typeof mockChatRooms] || mockChatRooms['1'];
};