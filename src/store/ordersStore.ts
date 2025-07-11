import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  category: string;
  categoryEmoji: string;
  sessionType: 'single' | 'package';
  sessions: number;
  pricePerSession: number;
  totalPrice: number;
  description: string;
  scheduledDate?: string;
  scheduledTime?: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: 'card' | 'transfer' | 'kakao_pay';
  receiptUrl?: string;
  notes?: string;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

interface OrdersStore {
  orders: OrderItem[];
  
  // 주문 관련
  addOrder: (order: Omit<OrderItem, 'id' | 'orderDate'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  addReview: (orderId: string, rating: number, comment: string) => void;
  
  // 필터링
  getOrdersByStatus: (status: OrderStatus) => OrderItem[];
  getOrdersByCategory: (category: string) => OrderItem[];
  
  // 통계
  getTotalSpent: () => number;
  getCompletedOrdersCount: () => number;
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      // 주문 추가
      addOrder: (orderData) => {
        const newOrder: OrderItem = {
          ...orderData,
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          orderDate: new Date().toISOString()
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
      },

      // 주문 상태 업데이트
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },

      // 주문 취소
      cancelOrder: (orderId, reason) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId 
              ? { ...order, status: 'cancelled', notes: reason }
              : order
          )
        }));
      },

      // 리뷰 추가
      addReview: (orderId, rating, comment) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  review: {
                    rating,
                    comment,
                    createdAt: new Date().toISOString()
                  }
                }
              : order
          )
        }));
      },

      // 상태별 주문 조회
      getOrdersByStatus: (status) => {
        return get().orders.filter(order => order.status === status);
      },

      // 카테고리별 주문 조회
      getOrdersByCategory: (category) => {
        return get().orders.filter(order => order.category === category);
      },

      // 총 지출 금액
      getTotalSpent: () => {
        return get().orders
          .filter(order => order.status !== 'cancelled' && order.status !== 'refunded')
          .reduce((total, order) => total + order.totalPrice, 0);
      },

      // 완료된 주문 수
      getCompletedOrdersCount: () => {
        return get().orders.filter(order => order.status === 'completed').length;
      }
    }),
    {
      name: 'orders-storage',
    }
  )
);