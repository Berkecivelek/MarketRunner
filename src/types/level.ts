import type { CustomerType, Reward } from './common';

export interface OrderItem {
  productId: string;
  brandId?: string;
  quantity: number;
}

export interface LevelConfig {
  levelId: number;
  customerType: CustomerType;
  timeLimit?: number | null;
  orderItems: OrderItem[];
  reward: Reward;
  tutorialTips?: string[];
  unlocksOnlineOrders?: boolean;
}

