import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';

interface ImageViewerDialogProps {
  imageUrls: string[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageViewerDialog: React.FC<ImageViewerDialogProps> = ({ imageUrls, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : c)), []);
  const next = useCallback(() => setCurrent((c) => (c < imageUrls.length - 1 ? c + 1 : c)), [imageUrls.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, imageUrls.length, onClose, prev, next]);

  // Portal로 모달 렌더링
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" ref={dialogRef}>
      {/* 닫기 버튼 */}
      <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
        ×
      </button>
      {/* 좌우 이동 */}
      {imageUrls.length > 1 && current > 0 && (
        <button className="absolute left-4 text-white text-3xl" onClick={prev}>
          &#8592;
        </button>
      )}
      {imageUrls.length > 1 && current < imageUrls.length - 1 && (
        <button className="absolute right-4 text-white text-3xl" style={{ top: '50%' }} onClick={next}>
          &#8594;
        </button>
      )}
      {/* 이미지 */}
      <div className="max-w-2xl max-h-[80vh] flex items-center justify-center">
        <Image
          src={imageUrls[current]}
          alt={`image-${current}`}
          width={0}
          height={0}
          sizes="100vw"
          className="object-contain max-h-[80vh] max-w-full rounded-lg shadow-lg"
        />
      </div>
      {/* 인디케이터 */}
      {imageUrls.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
          {current + 1} / {imageUrls.length}
        </div>
      )}
    </div>,
    document.body
  );
}; 