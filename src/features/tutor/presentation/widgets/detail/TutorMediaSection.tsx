import React from 'react';
import { Tutor } from '../../../domain/entities/tutor';
import Image from 'next/image';

interface TutorMediaSectionProps {
  tutor: Tutor;
}

export const TutorMediaSection: React.FC<TutorMediaSectionProps> = ({ tutor }) => {
  if (!tutor.mediaUrls || tutor.mediaUrls.length === 0) return null;
  return (
    <section className="px-5 py-6 md:px-10 md:py-8">
      <h2 className="text-lg md:text-xl font-bold mb-6">사진 및 동영상</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {tutor.mediaUrls.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={`media-${i}`}
            width={100} // Placeholder width
            height={100} // Placeholder height
            className="rounded-lg object-cover w-full aspect-square cursor-pointer"
            // onClick={() => ...} // 이미지 뷰어 모달 등 추후 구현
          />
        ))}
      </div>
    </section>
  );
}; 