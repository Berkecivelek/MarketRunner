export type CustomerType = 'walk-in' | 'online';

export interface Reward {
  xp: number;
  coins: number;
}

export type GamePhase = 'order' | 'collect' | 'checkout' | 'packing' | 'result';

export interface LevelProgress {
  levelId: number;
  success: boolean;
  bestTimeSeconds?: number;
}

export interface CollectedItem {
  productId: string;
  brandId?: string;
}

