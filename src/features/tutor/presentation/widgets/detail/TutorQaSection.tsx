import React from 'react';
import { Tutor, QnaItem } from '../../../domain/entities/tutor';

interface TutorQaSectionProps {
  tutor: Tutor;
}

export const TutorQaSection: React.FC<TutorQaSectionProps> = ({ tutor }) => {
  if (!tutor.qnaItems || tutor.qnaItems.length === 0) {
    return (
      <div className="px-5 py-12 flex flex-col items-center text-gray-400">
        <span className="text-5xl mb-4">❓</span>
        <div className="text-base">아직 작성된 Q&amp;A가 없어요.</div>
      </div>
    );
  }
  return (
    <section className="px-5 py-6 md:px-10 md:py-8">
      <h2 className="text-lg md:text-xl font-bold mb-6">Q&amp;A</h2>
      <div className="flex flex-col gap-4">
        {tutor.qnaItems.map((qna, i) => (
          <QnaItemCard key={i} qna={qna} />
        ))}
      </div>
    </section>
  );
};

const QnaItemCard: React.FC<{ qna: QnaItem }> = ({ qna }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    {/* Question */}
    <div className="flex items-start gap-3 px-4 py-3">
      <span className="text-primary font-bold">Q.</span>
      <span className="font-bold text-base flex-1">{qna.question}</span>
    </div>
    <div className="border-t border-gray-100 mx-4" />
    {/* Answer */}
    <div className="flex items-start gap-3 px-4 py-3 bg-gray-50 rounded-b-xl">
      <span className="text-gray-500 font-bold">A.</span>
      <span className="text-base flex-1 text-gray-800 leading-relaxed">{qna.answer}</span>
    </div>
  </div>
); 