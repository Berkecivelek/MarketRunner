import type { LevelConfig } from '../types/level';
import type { CustomerType } from '../types/common';

const tutorialLevels: LevelConfig[] = [
  {
    levelId: 1,
    customerType: 'walk-in',
    timeLimit: null,
    orderItems: [
      { productId: 'milk', quantity: 2 }
    ],
    reward: { xp: 20, coins: 15 },
    tutorialTips: [
      'Sipariş kartını incele ve ürün adedini not al.',
      'Başla butonuna dokunup raftan sütleri topla.'
    ]
  },
  {
    levelId: 2,
    customerType: 'walk-in',
    timeLimit: null,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'bread', quantity: 2 }
    ],
    reward: { xp: 25, coins: 18 },
    tutorialTips: [
      'Artık birden fazla ürün tipi var.',
      'Doğru ürüne dokunduğunda sepete eklenir.'
    ]
  },
  {
    levelId: 3,
    customerType: 'walk-in',
    timeLimit: 120,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'bread', quantity: 1 },
      { productId: 'apple', quantity: 3 }
    ],
    reward: { xp: 35, coins: 22 },
    tutorialTips: [
      'Kasa aşamasına geçmeden önce tüm ürünleri topla.',
      'Kasada ürünleri sırayla okutmayı unutma.'
    ]
  },
  {
    levelId: 4,
    customerType: 'walk-in',
    timeLimit: 120,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'bread', quantity: 1 },
      { productId: 'apple', quantity: 2 },
      { productId: 'orange-juice', quantity: 1 }
    ],
    reward: { xp: 40, coins: 25 },
    tutorialTips: [
      'Paketleme aşamasında ürünleri kutuya taşı.'
    ]
  },
  {
    levelId: 5,
    customerType: 'walk-in',
    timeLimit: 110,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'bread', quantity: 1 },
      { productId: 'apple', quantity: 2 },
      { productId: 'orange-juice', quantity: 1 },
      { productId: 'cookies', quantity: 1 }
    ],
    reward: { xp: 50, coins: 30 },
    tutorialTips: [
      'Artık tam akışı biliyorsun, iyi eğlenceler!'
    ]
  }
];

const walkInLevels: LevelConfig[] = [
  {
    levelId: 6,
    customerType: 'walk-in',
    timeLimit: 100,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'bread', quantity: 2 },
      { productId: 'banana', quantity: 3 }
    ],
    reward: { xp: 55, coins: 32 }
  },
  {
    levelId: 7,
    customerType: 'walk-in',
    timeLimit: 95,
    orderItems: [
      { productId: 'yogurt', quantity: 2 },
      { productId: 'apple', quantity: 2 },
      { productId: 'orange-juice', quantity: 1 },
      { productId: 'cookies', quantity: 1 }
    ],
    reward: { xp: 60, coins: 35 }
  },
  {
    levelId: 8,
    customerType: 'walk-in',
    timeLimit: 90,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'bread', quantity: 1 },
      { productId: 'banana', quantity: 3 },
      { productId: 'chips', quantity: 2 },
      { productId: 'water', quantity: 2 }
    ],
    reward: { xp: 65, coins: 38 }
  },
  {
    levelId: 9,
    customerType: 'walk-in',
    timeLimit: 85,
    orderItems: [
      { productId: 'cheese', quantity: 2 },
      { productId: 'pasta', quantity: 2 },
      { productId: 'tomato', quantity: 3 },
      { productId: 'lettuce', quantity: 1 },
      { productId: 'soda', quantity: 2 }
    ],
    reward: { xp: 70, coins: 42 }
  },
  {
    levelId: 10,
    customerType: 'walk-in',
    timeLimit: 80,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'yogurt', quantity: 2 },
      { productId: 'orange-juice', quantity: 2 },
      { productId: 'cookies', quantity: 2 },
      { productId: 'chips', quantity: 2 }
    ],
    reward: { xp: 75, coins: 46 }
  }
];

const brandFocusedLevels: LevelConfig[] = [
  {
    levelId: 11,
    customerType: 'walk-in',
    timeLimit: 80,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'bread', quantity: 2 },
      { productId: 'orange-juice', quantity: 1 },
      { productId: 'chips', quantity: 1 }
    ],
    reward: { xp: 80, coins: 50 }
  },
  {
    levelId: 12,
    customerType: 'walk-in',
    timeLimit: 75,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'yogurt', quantity: 2 },
      { productId: 'coffee', quantity: 1 },
      { productId: 'bread', quantity: 2 },
      { productId: 'chips', quantity: 2 }
    ],
    reward: { xp: 85, coins: 55 }
  },
  {
    levelId: 13,
    customerType: 'walk-in',
    timeLimit: 75,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'orange-juice', quantity: 2 },
      { productId: 'cereal', quantity: 1 },
      { productId: 'coffee', quantity: 1 },
      { productId: 'ice-cream', quantity: 2 }
    ],
    reward: { xp: 90, coins: 58 }
  },
  {
    levelId: 14,
    customerType: 'walk-in',
    timeLimit: 70,
    orderItems: [
      { productId: 'milk', quantity: 1 },
      { productId: 'bread', quantity: 1 },
      { productId: 'cereal', quantity: 2 },
      { productId: 'chips', quantity: 2 },
      { productId: 'soda', quantity: 2 },
      { productId: 'cookies', quantity: 2 }
    ],
    reward: { xp: 95, coins: 60 }
  },
  {
    levelId: 15,
    customerType: 'walk-in',
    timeLimit: 70,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'bread', quantity: 2 },
      { productId: 'yogurt', quantity: 2 },
      { productId: 'coffee', quantity: 1 },
      { productId: 'chips', quantity: 1 },
      { productId: 'water', quantity: 2 }
    ],
    reward: { xp: 110, coins: 70 },
    unlocksOnlineOrders: true
  }
];

const onlineLevels: LevelConfig[] = [
  {
    levelId: 16,
    customerType: 'online',
    timeLimit: 65,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'cereal', quantity: 2 },
      { productId: 'banana', quantity: 3 },
      { productId: 'coffee', quantity: 1 },
      { productId: 'water', quantity: 3 }
    ],
    reward: { xp: 120, coins: 75 }
  },
  {
    levelId: 17,
    customerType: 'online',
    timeLimit: 60,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'cereal', quantity: 2 },
      { productId: 'chips', quantity: 2 },
      { productId: 'orange-juice', quantity: 2 },
      { productId: 'cookies', quantity: 2 },
      { productId: 'cleaner', quantity: 1 }
    ],
    reward: { xp: 125, coins: 80 }
  },
  {
    levelId: 18,
    customerType: 'online',
    timeLimit: 60,
    orderItems: [
      { productId: 'milk', quantity: 2 },
      { productId: 'bread', quantity: 2 },
      { productId: 'yogurt', quantity: 2 },
      { productId: 'ice-cream', quantity: 2 },
      { productId: 'pasta', quantity: 2 },
      { productId: 'tomato', quantity: 4 }
    ],
    reward: { xp: 130, coins: 85 }
  },
  {
    levelId: 19,
    customerType: 'online',
    timeLimit: 55,
    orderItems: [
      { productId: 'milk', quantity: 3 },
      { productId: 'cereal', quantity: 2 },
      { productId: 'coffee', quantity: 2 },
      { productId: 'chips', quantity: 2 },
      { productId: 'orange-juice', quantity: 2 },
      { productId: 'cookies', quantity: 3 }
    ],
    reward: { xp: 140, coins: 90 }
  },
  {
    levelId: 20,
    customerType: 'online',
    timeLimit: 50,
    orderItems: [
      { productId: 'milk', quantity: 3 },
      { productId: 'bread', quantity: 3 },
      { productId: 'yogurt', quantity: 2 },
      { productId: 'ice-cream', quantity: 2 },
      { productId: 'coffee', quantity: 2 },
      { productId: 'tea', quantity: 2 },
      { productId: 'cleaner', quantity: 1 }
    ],
    reward: { xp: 160, coins: 110 }
  }
];

export const LEVELS: LevelConfig[] = [
  ...tutorialLevels,
  ...walkInLevels,
  ...brandFocusedLevels,
  ...onlineLevels
];

export const LEVEL_MAP = Object.fromEntries(LEVELS.map((level) => [level.levelId, level]));

export const getLevelById = (id: number) => LEVEL_MAP[id];

export const getLevelsByCustomerType = (type: CustomerType) =>
  LEVELS.filter((level) => level.customerType === type);
