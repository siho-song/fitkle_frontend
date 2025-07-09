// 튜터 프로필 폼 엔티티 (TypeScript)

export interface TutorProfileForm {
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | '';
  birth: string; // YYYY-MM-DD
  profileImageUrl?: string;
  introduction: string;
  career: string;
  certifications: string[];
  specialties: string[];
  // 기타 필요한 필드 추가 가능
}

export const defaultTutorProfileForm: TutorProfileForm = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  birth: '',
  profileImageUrl: '',
  introduction: '',
  career: '',
  certifications: [],
  specialties: [],
}; 