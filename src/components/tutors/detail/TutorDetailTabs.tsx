"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TutorItem } from '@/types/entities/tutor';
import SchoolIcon from '@mui/icons-material/School';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { TutorDetailReviews as TutorDetailReviewsContent } from './TutorDetailReviews';

interface TutorDetailTabsProps {
  tutor: TutorItem;
}

type TabType = 'qualifications' | 'schedule' | 'portfolio' | 'services' | 'reviews';

export function TutorDetailTabs({ tutor }: TutorDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('qualifications');
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsOffsetTop, setTabsOffsetTop] = useState(0);

  const tabs = [
    { id: 'qualifications' as TabType, label: '자격 및 경력', icon: SchoolIcon },
    { id: 'schedule' as TabType, label: '수업가능 시간', icon: ScheduleIcon },
    { id: 'portfolio' as TabType, label: '포트폴리오', icon: WorkIcon },
    { id: 'services' as TabType, label: '서비스', icon: BusinessCenterIcon },
    { id: 'reviews' as TabType, label: '후기', icon: ReviewsIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const currentScrollY = window.scrollY;
        const shouldBeSticky = currentScrollY >= tabsOffsetTop;
        setIsSticky(shouldBeSticky);
      }
    };

    const updateTabsOffset = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setTabsOffsetTop(window.scrollY + rect.top);
      }
    };

    // 초기 위치 설정
    updateTabsOffset();
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateTabsOffset);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTabsOffset);
    };
  }, [tabsOffsetTop]);

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}시간`;
      }
      return `${hours}시간 ${remainingMinutes}분`;
    }
    return `${minutes}분`;
  };

  const getScheduleData = () => {
    const scheduleMap: { [key: string]: string } = {
      'sun': '일요일',
      'mon': '월요일', 
      'tue': '화요일',
      'wed': '수요일',
      'thu': '목요일',
      'fri': '금요일',
      'sat': '토요일'
    };

    return Object.entries(tutor.availability).map(([day, times]) => ({
      day: scheduleMap[day] || day,
      times: times || []
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'qualifications':
        return (
          <div className="space-y-8">
            {/* 학력 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SchoolIcon className="text-primary" />
                학력
              </h3>
              <div className="space-y-3">
                {tutor.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{edu}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 자격증 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">자격증</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tutor.certifications.map((cert, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-900">{cert}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 성과 및 경력 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">주요 성과</h3>
              <div className="space-y-3">
                {tutor.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ScheduleIcon className="text-primary" />
              수업 가능 시간
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {getScheduleData().map(({ day, times }) => (
                <div key={day} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900 w-20">{day}</div>
                    <div className="flex-1 ml-4">
                      {times.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {times.map((time, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">수업 불가</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-800 font-medium mb-1">수업 시간 안내</div>
              <div className="text-sm text-blue-700">
                • 표시된 시간은 수업 시작 가능 시간입니다.<br/>
                • 정확한 수업 시간은 튜터와의 상담을 통해 조율 가능합니다.<br/>
                • 예약 시 원하는 날짜와 시간을 선택해주세요.
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <WorkIcon className="text-primary" />
              포트폴리오
            </h3>
            {tutor.portfolio.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutor.portfolio.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {item.images.length > 0 && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="text-xs text-gray-500 mb-3">
                        프로젝트 기간: {item.projectDate}
                      </div>
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          프로젝트 보기 →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <WorkIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
                <p className="text-gray-500">등록된 포트폴리오가 없습니다.</p>
              </div>
            )}
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BusinessCenterIcon className="text-primary" />
              제공 서비스
            </h3>
            {tutor.services && tutor.services.length > 0 ? (
              <div className="space-y-4">
                {tutor.services.filter(service => service.isActive).map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-gray-900">{service.name}</h4>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ScheduleIcon sx={{ fontSize: 16 }} />
                          <span className="font-medium">{formatDuration(service.duration)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {service.price.toLocaleString()}원
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDuration(service.duration)}당
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BusinessCenterIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
                <p className="text-gray-500">등록된 서비스가 없습니다.</p>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <TutorDetailReviewsContent tutor={tutor} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* 탭 네비게이션 */}
      <div
        ref={tabsRef}
        className={`bg-white border-b border-gray-200 transition-all duration-200 ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 z-40 shadow-md' 
            : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav className={`flex space-x-8 overflow-x-auto scrollbar-hide ${
            isSticky ? 'px-14' : 'px-6'
          }`}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent sx={{ fontSize: 18 }} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 탭이 sticky일 때 컨텐츠 간격 확보 */}
      {isSticky && <div className="h-16"></div>}

      {/* 탭 컨텐츠 */}
      <div className="bg-white rounded-2xl border border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}