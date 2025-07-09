import React from 'react';

interface TutorSearchBarSectionProps {
  sortValue?: string;
  regionValue?: string;
  categoryValue?: string;
  regions: string[];
  categories: string[];
  onSortChanged: (v: string) => void;
  onRegionChanged: (v: string) => void;
  onCategoryChanged: (v: string) => void;
  onSearch: (v: string) => void;
}

export const TutorSearchBarSection: React.FC<TutorSearchBarSectionProps> = ({
  sortValue,
  regionValue,
  categoryValue,
  regions,
  categories,
  onSortChanged,
  onRegionChanged,
  onCategoryChanged,
  onSearch,
}) => {
  const [search, setSearch] = React.useState('');

  return (
    <section className="w-full bg-white rounded-xl shadow p-4 flex flex-col gap-4">
      <div className="flex gap-2">
        {/* 지역 선택 */}
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={regionValue || ''}
          onChange={e => onRegionChanged(e.target.value)}
        >
          <option value="">지역</option>
          {regions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {/* 카테고리 선택 */}
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={categoryValue || ''}
          onChange={e => onCategoryChanged(e.target.value)}
        >
          <option value="">카테고리</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {/* 정렬 선택 */}
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sortValue || ''}
          onChange={e => onSortChanged(e.target.value)}
        >
          <option value="리뷰 많은 순">리뷰 많은 순</option>
          <option value="평점 높은 순">평점 높은 순</option>
          <option value="가격 낮은 순">가격 낮은 순</option>
          <option value="가격 높은 순">가격 높은 순</option>
          <option value="최신 순">최신 순</option>
        </select>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="어떤 서비스가 필요하세요?"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') onSearch(search); }}
        />
        <button
          className="bg-primary text-white rounded-lg px-6 py-2 text-sm font-semibold"
          onClick={() => onSearch(search)}
        >
          검색
        </button>
      </div>
    </section>
  );
}; 