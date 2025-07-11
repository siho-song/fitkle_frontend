import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NotificationSettings {
  // 주요 알림 카테고리
  lessons: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    browser: boolean;
    frequency: 'real_time' | 'daily' | 'weekly';
  };
  
  community: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    browser: boolean;
    frequency: 'real_time' | 'daily' | 'weekly';
  };
  
  payments: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    browser: boolean;
    frequency: 'real_time' | 'daily' | 'weekly';
  };
  
  marketing: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    browser: boolean;
    frequency: 'real_time' | 'daily' | 'weekly';
  };
  
  system: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    browser: boolean;
    frequency: 'real_time' | 'daily' | 'weekly';
  };
  
  // 글로벌 설정
  globalEnabled: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  
  // 특별 설정
  weekendEnabled: boolean;
  summaryFrequency: 'daily' | 'weekly' | 'never';
}

interface NotificationSettingsStore {
  settings: NotificationSettings;
  
  // 액션들
  updateCategorySetting: (
    category: keyof NotificationSettings, 
    field: string, 
    value: any
  ) => void;
  
  updateGlobalSetting: (field: string, value: any) => void;
  toggleGlobalNotifications: () => void;
  resetToDefaults: () => void;
  
  // 헬퍼 함수들
  isNotificationEnabled: (category: string, type: string) => boolean;
  getNotificationCount: () => number;
}

const defaultSettings: NotificationSettings = {
  lessons: {
    enabled: true,
    email: true,
    push: true,
    browser: true,
    frequency: 'real_time'
  },
  community: {
    enabled: true,
    email: false,
    push: true,
    browser: true,
    frequency: 'daily'
  },
  payments: {
    enabled: true,
    email: true,
    push: true,
    browser: true,
    frequency: 'real_time'
  },
  marketing: {
    enabled: false,
    email: false,
    push: false,
    browser: false,
    frequency: 'weekly'
  },
  system: {
    enabled: true,
    email: true,
    push: false,
    browser: true,
    frequency: 'real_time'
  },
  globalEnabled: true,
  quietHours: {
    enabled: true,
    startTime: '22:00',
    endTime: '08:00'
  },
  weekendEnabled: false,
  summaryFrequency: 'weekly'
};

export const useNotificationSettingsStore = create<NotificationSettingsStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,

      updateCategorySetting: (category, field, value) => {
        if (typeof get().settings[category] !== 'object') return;
        
        set((state) => ({
          settings: {
            ...state.settings,
            [category]: {
              ...state.settings[category],
              [field]: value
            }
          }
        }));
      },

      updateGlobalSetting: (field, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [field]: value
          }
        }));
      },

      toggleGlobalNotifications: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            globalEnabled: !state.settings.globalEnabled
          }
        }));
      },

      resetToDefaults: () => {
        set({ settings: defaultSettings });
      },

      isNotificationEnabled: (category: string, type: string) => {
        const settings = get().settings;
        const categorySettings = settings[category as keyof NotificationSettings];
        
        if (!settings.globalEnabled) return false;
        if (typeof categorySettings !== 'object') return false;
        if (!categorySettings.enabled) return false;
        
        return categorySettings[type as keyof typeof categorySettings] || false;
      },

      getNotificationCount: () => {
        const settings = get().settings;
        if (!settings.globalEnabled) return 0;
        
        let count = 0;
        Object.values(settings).forEach(categorySettings => {
          if (typeof categorySettings === 'object' && 'enabled' in categorySettings) {
            if (categorySettings.enabled) {
              if (categorySettings.email) count++;
              if (categorySettings.push) count++;
              if (categorySettings.browser) count++;
            }
          }
        });
        
        return count;
      }
    }),
    {
      name: 'notification-settings-storage',
    }
  )
);