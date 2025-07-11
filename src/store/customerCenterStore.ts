import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SupportTicket {
  id: string;
  category: string;
  subject: string;
  description: string;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  attachments: File[];
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  isStaff: boolean;
  authorName: string;
  content: string;
  createdAt: string;
  attachments?: File[];
}

interface CustomerCenterStore {
  tickets: SupportTicket[];
  
  // 액션들
  submitTicket: (data: {
    category: string;
    subject: string;
    description: string;
    priority: 'low' | 'normal' | 'high';
    attachments: File[];
  }) => Promise<void>;
  
  addResponse: (ticketId: string, content: string, attachments?: File[]) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  
  // 필터링된 티켓들
  getTicketsByStatus: (status: SupportTicket['status']) => SupportTicket[];
  getTicketsByCategory: (category: string) => SupportTicket[];
}

export const useCustomerCenterStore = create<CustomerCenterStore>()(
  persist(
    (set, get) => ({
      tickets: [],

      submitTicket: async (data) => {
        const newTicket: SupportTicket = {
          id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          category: data.category,
          subject: data.subject,
          description: data.description,
          priority: data.priority,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          attachments: data.attachments,
          responses: []
        };

        set((state) => ({
          tickets: [newTicket, ...state.tickets]
        }));

        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
      },

      addResponse: (ticketId, content, attachments = []) => {
        const newResponse: TicketResponse = {
          id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          isStaff: false, // 사용자 응답
          authorName: '나',
          content,
          createdAt: new Date().toISOString(),
          attachments
        };

        set((state) => ({
          tickets: state.tickets.map(ticket =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  responses: [...ticket.responses, newResponse],
                  updatedAt: new Date().toISOString()
                }
              : ticket
          )
        }));
      },

      updateTicketStatus: (ticketId, status) => {
        set((state) => ({
          tickets: state.tickets.map(ticket =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  status,
                  updatedAt: new Date().toISOString()
                }
              : ticket
          )
        }));
      },

      getTicketsByStatus: (status) => {
        return get().tickets.filter(ticket => ticket.status === status);
      },

      getTicketsByCategory: (category) => {
        return get().tickets.filter(ticket => ticket.category === category);
      }
    }),
    {
      name: 'customer-center-storage',
    }
  )
);