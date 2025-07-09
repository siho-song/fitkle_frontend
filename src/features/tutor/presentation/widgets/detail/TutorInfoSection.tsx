import React from 'react';
import { Tutor, InfoItem, FeatureItem, CareerItem } from '../../../domain/entities/tutor';
import Image from 'next/image';

// 아이콘 매핑 유틸 (실제 프로젝트에서는 아이콘 라이브러리 사용)
const getIconFromString = (icon?: string) => {
  switch (icon) {
    case 'star':
      return '⭐';
    case 'person_outline':
      return '👤';
    case 'access_time':
      return '⏰';
    case 'business_center_outlined':
      return '💼';
    default:
      return '❓';
  }
};

interface TutorInfoSectionProps {
  tutor: Tutor;
}

export const TutorInfoSection: React.FC<TutorInfoSectionProps> = ({ tutor }) => {
  return (
    <section className="px-5 py-6 md:px-10 md:py-8">
      <div className="flex flex-col gap-10">
        {tutor.infoItems && tutor.infoItems.length > 0 && (
          <>
            <SectionTitle title="기본 정보" />
            <InfoItems infoItems={tutor.infoItems} />
          </>
        )}
        {tutor.features && tutor.features.length > 0 && (
          <>
            <SectionTitle title="서비스 특징" />
            <FeaturesList features={tutor.features} />
          </>
        )}
        <SectionTitle title={tutor.descriptionTitle} />
        <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-10">
          {tutor.descriptionText}
        </p>
        {tutor.services && tutor.services.length > 0 && (
          <>
            <SectionTitle title="제공 서비스" />
            <div className="flex flex-wrap gap-2 mb-10">
              {tutor.services.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </>
        )}
        {tutor.careers && tutor.careers.length > 0 && (
          <>
            <SectionTitle title="경력" />
            <CareerTimeline careers={tutor.careers} />
          </>
        )}
        {tutor.certificateImageUrls && tutor.certificateImageUrls.length > 0 && (
          <>
            <SectionTitle title={tutor.certificateTitle} />
            <div className="flex gap-3 overflow-x-auto mb-10">
              {tutor.certificateImageUrls.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  alt={`certificate-${idx}`}
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover rounded-lg cursor-pointer border border-gray-200"
                  // onClick={() => ...} // 이미지 뷰어 모달 등 추후 구현
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>
);

const InfoItems: React.FC<{ infoItems: InfoItem[] }> = ({ infoItems }) => (
  <div className="bg-gray-50 rounded-xl p-4 mb-10">
    <div className="flex flex-col gap-3">
      {infoItems.map((info, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-gray-500 text-lg">{getIconFromString(info.icon)}</span>
          <span className="w-20 text-gray-700 text-sm">{info.label}</span>
          <span className="font-bold text-base">{info.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const FeaturesList: React.FC<{ features: FeatureItem[] }> = ({ features }) => (
  <div className="flex flex-col gap-3 mb-10">
    {features.map((feature, i) => (
      <div key={i} className="flex items-center gap-4">
        <span className="text-blue-600 text-lg">{getIconFromString(feature.icon)}</span>
        <span className="text-base">{feature.description}</span>
      </div>
    ))}
  </div>
);

const CareerTimeline: React.FC<{ careers: CareerItem[] }> = ({ careers }) => (
  <div className="flex flex-col gap-6 mb-10">
    {careers.map((career, i) => (
      <div key={i} className="flex items-start gap-5">
        {/* 타임라인 점/선 */}
        <div className="flex flex-col items-center">
          <div className="w-3.5 h-3.5 rounded-full border-4 border-blue-600 bg-white" />
          {i !== careers.length - 1 && (
            <div className="w-0.5 flex-1 bg-gray-200" style={{ minHeight: 24 }} />
          )}
        </div>
        {/* 경력 내용 */}
        <div className="flex-1">
          <div className="font-bold text-base mb-1">{career.title}</div>
          <div className="text-gray-500 text-sm">{formatCareerPeriod(career)}</div>
        </div>
      </div>
    ))}
  </div>
);

// 커리어 기간 포맷 유틸
function formatCareerPeriod(career: CareerItem): string {
  if (!career.startDate) return '';
  const start = parseYearMonth(career.startDate);
  const end = career.endDate ? parseYearMonth(career.endDate) : new Date();
  const diff = yearMonthDiff(start, end);
  const startStr = `${start.getFullYear()}년 ${start.getMonth() + 1}월`;
  const endStr = career.endDate ? `${end.getFullYear()}년 ${end.getMonth() + 1}월` : '현재';
  let durationStr = '';
  if (diff.years !== 0) durationStr += `${diff.years}년`;
  if (diff.months !== 0) {
    if (durationStr) durationStr += ' ';
    durationStr += `${diff.months}개월`;
  }
  const re = !career.endDate ? ' · 재직중' : '';
  return `${startStr} ~ ${endStr} · ${durationStr}${re}`;
}

function parseYearMonth(ym: string): Date {
  const [year, month] = ym.split('-').map(Number);
  return new Date(year, month - 1);
}

function yearMonthDiff(start: Date, end: Date): { years: number; months: number } {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
} 