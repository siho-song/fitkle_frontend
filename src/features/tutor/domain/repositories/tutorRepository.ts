import { Tutor } from '../entities/tutor';

export interface TutorRepository {
  getTutorById(id: string): Promise<Tutor>;
  // TODO: 검색, 목록 등 추가 메서드 필요시 정의
} 