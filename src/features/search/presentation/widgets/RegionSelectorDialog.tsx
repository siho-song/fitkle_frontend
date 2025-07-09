import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface RegionSelectorDialogProps {
  open: boolean;
  regionMap: Record<string, string[]>;
  onClose: () => void;
  onSelect: (region: string | null) => void;
}

export const RegionSelectorDialog: React.FC<RegionSelectorDialogProps> = ({ open, regionMap, onClose, onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  if (!open) return null;
  const provinces = Object.keys(regionMap);
  const districts = selectedProvince ? regionMap[selectedProvince] : [];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-[420px] h-[520px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-lg font-semibold">지역 선택</div>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">×</button>
        </div>
        <div className="flex-1 flex">
          {/* Province list */}
          <div className="flex-1 overflow-y-auto border-r">
            <div className="divide-y">
              <div
                className={`px-4 py-2 cursor-pointer ${selectedProvince === null ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}
                onClick={() => { setSelectedProvince(null); setSelectedDistrict(null); onSelect(null); onClose(); }}
              >
                전국
              </div>
              {provinces.map((prov) => (
                <div
                  key={prov}
                  className={`px-4 py-2 cursor-pointer ${selectedProvince === prov ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}
                  onClick={() => { setSelectedProvince(prov); setSelectedDistrict(null); }}
                >
                  {prov}
                </div>
              ))}
            </div>
          </div>
          {/* District list */}
          <div className="flex-1 overflow-y-auto">
            {!selectedProvince ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">시/도를 먼저 선택하세요</div>
            ) : (
              <div className="divide-y">
                <div
                  className={`px-4 py-2 cursor-pointer ${selectedDistrict === null ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}
                  onClick={() => { onSelect(`${selectedProvince} 전체`); onClose(); }}
                >
                  {selectedProvince} 전체
                </div>
                {districts.map((district) => (
                  <div
                    key={district}
                    className={`px-4 py-2 cursor-pointer ${selectedDistrict === district ? 'bg-blue-50 text-blue-600 font-bold' : ''}`}
                    onClick={() => { setSelectedDistrict(district); onSelect(`${selectedProvince} ${district}`); onClose(); }}
                  >
                    {district}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}; 