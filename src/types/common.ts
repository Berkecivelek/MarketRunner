export interface CollectedItem {
  productId: string;
  brandId?: string;
}

export interface Reward {
  coins: number;
  xp: number;
}

export type CustomerType = 'walk-in' | 'online';

export type GameMode = 'BAKKAL' | 'MARKET' | 'SUPERMARKET';
