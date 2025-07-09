import { TutorRepository } from '../repositories/tutorRepository';
import { Tutor } from '../entities/tutor';

export class GetTutorDetailUseCase {
  private repository: TutorRepository;
  constructor(repository: TutorRepository) {
    this.repository = repository;
  }
  async execute(id: string): Promise<Tutor> {
    return this.repository.getTutorById(id);
  }
} 