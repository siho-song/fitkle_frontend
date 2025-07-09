"use client";
import React, { useState, useEffect } from 'react';
import { regionMap } from '../../../constants/regionMap';

interface RegionSelectorDialogProps {
  initialRegion?: string;
  onClose: () => void;
  onSelect: (region: string | null) => void;
}

export const RegionSelectorDialog: React.FC<RegionSelectorDialogProps> = ({
  initialRegion,
  onClose,
  onSelect,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  useEffect(() => {
    if (initialRegion) {
      Object.entries(regionMap).forEach(([prov, districts]) => {
        if ((districts as string[]).includes(initialRegion)) {
          setSelectedProvince(prov);
          setSelectedDistrict(initialRegion);
        }
      });
    }
  }, [initialRegion]);

  const provinces = Object.keys(regionMap);
  const districts: string[] = selectedProvince ? (regionMap[selectedProvince] as string[]) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-[420px] h-[520px] rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-lg font-semibold">지역 선택</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">닫기</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="2" d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-1">
          {/* Province List */}
          <div className="flex-1 border-r overflow-y-auto">
            <ul>
              <li>
                <ProvinceTile
                  selected={selectedProvince === null}
                  display="전국"
                  onClick={() => {
                    setSelectedProvince(null);
                    setSelectedDistrict(null);
                    onSelect(null);
                    onClose();
                  }}
                />
              </li>
              {provinces.map((prov) => (
                <li key={prov}>
                  <ProvinceTile
                    selected={selectedProvince === prov}
                    display={prov}
                    onClick={() => {
                      setSelectedProvince(prov);
                      setSelectedDistrict(null);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* District List */}
          <div className="flex-1 overflow-y-auto">
            {selectedProvince ? (
              <ul>
                <li>
                  <DistrictTile
                    selected={selectedDistrict === null}
                    display={`${selectedProvince} 전체`}
                    onClick={() => {
                      onSelect(`${selectedProvince} 전체`);
                      onClose();
                    }}
                  />
                </li>
                {districts.map((district: string) => (
                  <li key={district}>
                    <DistrictTile
                      selected={selectedDistrict === district}
                      display={district}
                      onClick={() => {
                        setSelectedDistrict(district);
                        onSelect(district);
                        onClose();
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-500">
                시/도를 먼저 선택하세요
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProvinceTileProps {
  selected: boolean;
  display: string;
  onClick: () => void;
}
const ProvinceTile: React.FC<ProvinceTileProps> = ({ selected, display, onClick }) => (
  <button
    className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors ${selected ? 'bg-primary/10 text-primary font-semibold' : ''}`}
    onClick={onClick}
    type="button"
  >
    {display}
    {selected && <span className="float-right">✔</span>}
  </button>
);

interface DistrictTileProps {
  selected: boolean;
  display: string;
  onClick: () => void;
}
const DistrictTile: React.FC<DistrictTileProps> = ({ selected, display, onClick }) => (
  <button
    className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors ${selected ? 'bg-primary/10 text-primary font-semibold' : ''}`}
    onClick={onClick}
    type="button"
  >
    {display}
    {selected && <span className="float-right">✔</span>}
  </button>
); 