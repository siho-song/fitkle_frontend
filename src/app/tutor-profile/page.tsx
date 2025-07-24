"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { TutorService } from '@/types/entities/tutor';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface ServiceFormData {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

export default function TutorProfilePage() {
  const [services, setServices] = useState<TutorService[]>([
    {
      id: 'service_001',
      name: 'React 개발 레슨',
      description: 'React 기초부터 실전 프로젝트까지',
      duration: 60,
      price: 50000,
      category: '프로그래밍',
      isActive: true
    },
    {
      id: 'service_002',
      name: 'JavaScript 기초',
      description: 'JavaScript 문법과 기본 개념 학습',
      duration: 50,
      price: 40000,
      category: '프로그래밍',
      isActive: true
    }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    duration: 60,
    price: 50000,
    category: '프로그래밍'
  });

  const categories = ['프로그래밍', '디자인', '언어', '음악', '요리', '피트니스', '비즈니스', '기타'];

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

  const handleSubmitService = () => {
    if (!formData.name || !formData.description) {
      alert('서비스명과 설명을 입력해주세요.');
      return;
    }

    if (editingServiceId) {
      // 수정
      setServices(services.map(service => 
        service.id === editingServiceId 
          ? { ...service, ...formData }
          : service
      ));
      setEditingServiceId(null);
    } else {
      // 추가
      const newService: TutorService = {
        id: `service_${Date.now()}`,
        ...formData,
        isActive: true
      };
      setServices([...services, newService]);
      setIsAddingService(false);
    }

    resetForm();
  };

  const handleEditService = (service: TutorService) => {
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category
    });
    setEditingServiceId(service.id);
    setIsAddingService(false);
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm('정말 이 서비스를 삭제하시겠습니까?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const handleToggleActive = (serviceId: string) => {
    setServices(services.map(service =>
      service.id === serviceId
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      duration: 60,
      price: 50000,
      category: '프로그래밍'
    });
    setIsAddingService(false);
    setEditingServiceId(null);
  };

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <SchoolIcon className="text-primary" sx={{ fontSize: 32 }} />
              <h1 className="text-3xl font-bold text-gray-900">튜터 프로필 관리</h1>
            </div>
            <p className="text-gray-600">제공하는 서비스를 등록하고 관리하세요.</p>
          </div>

          {/* 서비스 목록 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">등록된 서비스</h2>
              <button
                onClick={() => setIsAddingService(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <AddIcon sx={{ fontSize: 20 }} />
                서비스 추가
              </button>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  {editingServiceId === service.id ? (
                    // 수정 폼
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            서비스명 *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="서비스명을 입력하세요"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            카테고리
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          서비스 설명 *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="서비스에 대한 설명을 입력하세요"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            수업 시간 (분)
                          </label>
                          <select
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value={30}>30분</option>
                            <option value={50}>50분</option>
                            <option value={60}>60분</option>
                            <option value={90}>90분</option>
                            <option value={120}>120분</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            가격 (원)
                          </label>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="가격을 입력하세요"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleSubmitService}
                          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <SaveIcon sx={{ fontSize: 18 }} />
                          저장
                        </button>
                        <button
                          onClick={resetForm}
                          className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <CancelIcon sx={{ fontSize: 18 }} />
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 서비스 표시
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            service.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {service.isActive ? '활성' : '비활성'}
                          </span>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                            <span>{formatDuration(service.duration)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <AttachMoneyIcon sx={{ fontSize: 16 }} />
                            <span>{service.price.toLocaleString()}원</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(service.id)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            service.isActive
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {service.isActive ? '비활성화' : '활성화'}
                        </button>
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <EditIcon sx={{ fontSize: 18 }} />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {services.length === 0 && (
                <div className="text-center py-12">
                  <PersonIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: 64 }} />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">등록된 서비스가 없습니다</h3>
                  <p className="text-gray-400 mb-4">첫 번째 서비스를 등록해보세요.</p>
                </div>
              )}
            </div>

            {/* 새 서비스 추가 폼 */}
            {isAddingService && (
              <div className="border border-gray-200 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">새 서비스 추가</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        서비스명 *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="서비스명을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        카테고리
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      서비스 설명 *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="서비스에 대한 설명을 입력하세요"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        수업 시간 (분)
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value={30}>30분</option>
                        <option value={50}>50분</option>
                        <option value={60}>60분</option>
                        <option value={90}>90분</option>
                        <option value={120}>120분</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        가격 (원)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="가격을 입력하세요"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSubmitService}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <SaveIcon sx={{ fontSize: 18 }} />
                      저장
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <CancelIcon sx={{ fontSize: 18 }} />
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">서비스 등록 안내</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 여러 개의 서비스를 등록하여 다양한 수업을 제공할 수 있습니다.</li>
              <li>• 각 서비스별로 다른 시간과 가격을 설정할 수 있습니다.</li>
              <li>• 비활성화된 서비스는 학생들에게 노출되지 않습니다.</li>
              <li>• 서비스 정보는 언제든지 수정하거나 삭제할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}