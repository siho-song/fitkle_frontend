import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PortfolioItem } from '../../../domain/entities/tutor';
import Image from 'next/image';

interface PortfolioDetailDialogProps {
  item: PortfolioItem;
  onClose: () => void;
}

export const PortfolioDetailDialog: React.FC<PortfolioDetailDialogProps> = ({ item, onClose }) => {
  const [current, setCurrent] = useState(0);
  const images = item.imageUrls || [];

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : c));
  const next = () => setCurrent((c) => (c < images.length - 1 ? c + 1 : c));

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full relative flex flex-col md:flex-row overflow-hidden">
        {/* 이미지 캐러셀 */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center relative min-h-[300px]">
          {images.length > 0 ? (
            <Image
              src={images[current]}
              alt={`portfolio-img-${current}`}
              width={600}
              height={400}
              className="object-contain max-h-[400px] max-w-full"
            />
          ) : (
            <div className="text-gray-400">No Image</div>
          )}
          {/* 좌우 이동 */}
          {images.length > 1 && current > 0 && (
            <button className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl text-white bg-black/40 rounded-full px-2" onClick={prev}>
              &#8592;
            </button>
          )}
          {images.length > 1 && current < images.length - 1 && (
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-white bg-black/40 rounded-full px-2" onClick={next}>
              &#8594;
            </button>
          )}
          {/* 인디케이터 */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
              {current + 1} / {images.length}
            </div>
          )}
        </div>
        {/* 상세 정보 */}
        <div className="flex-1 p-6 flex flex-col gap-2 min-w-[220px]">
          <div className="text-lg font-bold mb-2">{item.title}</div>
          {item.serviceType && <InfoRow label="서비스 종류" value={item.serviceType} />}
          {item.region && <InfoRow label="지역 정보" value={item.region} />}
          {item.price && <InfoRow label="가격대" value={item.price.toLocaleString('ko-KR') + '원'} />}
          {item.duration && <InfoRow label="작업 소요 시간" value={item.duration} />}
          {item.year && <InfoRow label="작업 년도" value={item.year.toString()} />}
          {item.description && <div className="mt-2 text-gray-700 text-sm whitespace-pre-line">{item.description}</div>}
        </div>
        {/* 닫기 버튼 */}
        <button className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black" onClick={onClose}>
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-2 text-sm">
    <span className="text-gray-400 min-w-[70px]">{label}</span>
    <span className="text-gray-700 font-medium">{value}</span>
  </div>
); 