import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InviteRecord {
  id: string;
  email: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'expired';
  rewardClaimed: boolean;
  friendName?: string;
  joinedAt?: string;
}

interface FriendInviteStore {
  inviteCode: string;
  inviteRecords: InviteRecord[];
  totalInvites: number;
  successfulInvites: number;
  earnedCredits: number;
  
  // 액션들
  generateInviteCode: () => void;
  sendInvite: (email: string) => void;
  updateInviteStatus: (id: string, status: InviteRecord['status'], friendName?: string) => void;
  claimReward: (id: string) => void;
  
  // 계산된 속성들
  pendingInvites: InviteRecord[];
  acceptedInvites: InviteRecord[];
}

export const useFriendInviteStore = create<FriendInviteStore>()(
  persist(
    (set, get) => ({
      inviteCode: '',
      inviteRecords: [],
      totalInvites: 0,
      successfulInvites: 0,
      earnedCredits: 0,

      generateInviteCode: () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        set({ inviteCode: code });
      },

      sendInvite: (email) => {
        const newInvite: InviteRecord = {
          id: `invite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email,
          invitedAt: new Date().toISOString(),
          status: 'pending',
          rewardClaimed: false
        };

        set((state) => ({
          inviteRecords: [newInvite, ...state.inviteRecords],
          totalInvites: state.totalInvites + 1
        }));
      },

      updateInviteStatus: (id, status, friendName) => {
        set((state) => ({
          inviteRecords: state.inviteRecords.map(record =>
            record.id === id
              ? {
                  ...record,
                  status,
                  friendName,
                  joinedAt: status === 'accepted' ? new Date().toISOString() : record.joinedAt
                }
              : record
          ),
          successfulInvites: status === 'accepted' 
            ? state.successfulInvites + 1 
            : state.successfulInvites
        }));
      },

      claimReward: (id) => {
        set((state) => ({
          inviteRecords: state.inviteRecords.map(record =>
            record.id === id ? { ...record, rewardClaimed: true } : record
          ),
          earnedCredits: state.earnedCredits + 5000
        }));
      },

      get pendingInvites() {
        return get().inviteRecords.filter(record => record.status === 'pending');
      },

      get acceptedInvites() {
        return get().inviteRecords.filter(record => record.status === 'accepted');
      }
    }),
    {
      name: 'friend-invite-storage',
    }
  )
);