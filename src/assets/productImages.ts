// TODO (Kenney Food Kit integration):
// 1) https://www.kenney.nl/assets/food-kit adresinden "Food Kit" paketini indir.
// 2) İhtiyaç duyduğun modelleri 64x64 veya 128x128 PNG ikonlar olarak dışa aktar.
// 3) PNG'leri `assets/kenney/food/` klasörüne, örneğin `milk_carton.png` şeklinde koy.
// 4) Bu dosyayı güncelleyip emoji yerine `require` kullan:
//    MILK: { image: require('../../assets/kenney/food/milk_carton.png'), emojiFallback: '🥛' }
// 5) ProductCard.tsx içinde önce image varsa onu göster, yoksa emojiFallback göster.

import { ImageSourcePropType } from 'react-native';

import { ProductId } from '../data/products';

export type ProductVisual = {
  // İleride local PNG ile kullanmak için:
  image?: ImageSourcePropType;
  emojiFallback: string;
};

// Legacy keys are also supported by casting to any or updating ProductId type if needed
export const productImages: Record<string, ProductVisual> = {
  // New IDs
  MILK: { emojiFallback: '🥛' },
  BREAD: { emojiFallback: '🍞' },
  APPLE_RED: { emojiFallback: '🍎' },
  APPLE_GREEN: { emojiFallback: '🍏' },
  COLA_RED: { emojiFallback: '🥤' },
  COLA_BLUE: { emojiFallback: '🥤' },
  CHIPS: { emojiFallback: '🍟' },
  CHOCOLATE: { emojiFallback: '🍫' },
  EGG_CARTON: { emojiFallback: '🥚' },
  WATER_BOTTLE: { emojiFallback: '💧' },
  YOGURT: { emojiFallback: '🍶' },
  CEREAL_BOX: { emojiFallback: '🥣' },

  // Legacy IDs (from legacyProducts.ts / levels.ts)
  'milk': { emojiFallback: '🥛' },
  'bread': { emojiFallback: '🍞' },
  'apple': { emojiFallback: '🍎' },
  'banana': { emojiFallback: '🍌' },
  'orange-juice': { emojiFallback: '🍊' },
  'cereal': { emojiFallback: '🥣' },
  'cookies': { emojiFallback: '🍪' },
  'yogurt': { emojiFallback: '🍶' },
  'cheese': { emojiFallback: '🧀' },
  'chips': { emojiFallback: '🍟' },
  'smartphone': { emojiFallback: '📱' },
  'headphones': { emojiFallback: '🎧' },
  'laptop': { emojiFallback: '💻' },
  'pasta': { emojiFallback: '🍝' },
  'rice': { emojiFallback: '🍚' },
  'olive-oil': { emojiFallback: '🫒' },
  'egg-carton': { emojiFallback: '🥚' },
  'chicken': { emojiFallback: '🍗' },
  'beef': { emojiFallback: '🥩' },
  'sucuk': { emojiFallback: '🌭' },
  'fish': { emojiFallback: '🐟' },
  'water': { emojiFallback: '💧' },
  'cola': { emojiFallback: '🥤' },
  'fruit-juice': { emojiFallback: '🧃' },
  'iced-tea': { emojiFallback: '🍹' },
  'tomato': { emojiFallback: '🍅' },
  'lettuce': { emojiFallback: '🥬' },
  'cucumber': { emojiFallback: '🥒' },
  'strawberry': { emojiFallback: '🍓' },
  'ice-cream': { emojiFallback: '🍦' },
  'coffee': { emojiFallback: '☕' },
  'tea': { emojiFallback: '🍵' },
  'cleaner': { emojiFallback: '🧹' }
};
