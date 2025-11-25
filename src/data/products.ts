/**
 * Market Runner sipariş ve stok sisteminde kullanılacak temel ürün listesini tutar.
 * Oyun içindeki level config'leri, sipariş kartları ve raf görünümleri bu ProductId'leri referans alır.
 * Görseller productImages map'inden, metinsel bilgiler ise buradaki tanımlardan gelir.
 */

export type ProductId =
  | 'MILK'
  | 'BREAD'
  | 'APPLE_RED'
  | 'APPLE_GREEN'
  | 'COLA_RED'
  | 'COLA_BLUE'
  | 'CHIPS'
  | 'CHOCOLATE'
  | 'EGG_CARTON'
  | 'WATER_BOTTLE'
  | 'YOGURT'
  | 'CEREAL_BOX';

export type ProductCategory =
  | 'DAIRY'
  | 'BAKERY'
  | 'FRUIT'
  | 'DRINK'
  | 'SNACK'
  | 'OTHER';

export interface ProductDefinition {
  id: ProductId;
  name: string;
  category: ProductCategory;
  kenneyModelHint?: string;
}

export const PRODUCTS: Record<ProductId, ProductDefinition> = {
  MILK: {
    id: 'MILK',
    name: 'Süt',
    category: 'DAIRY',
    kenneyModelHint: 'milk_carton'
  },
  BREAD: {
    id: 'BREAD',
    name: 'Ekmek',
    category: 'BAKERY',
    kenneyModelHint: 'bread_loaf'
  },
  APPLE_RED: {
    id: 'APPLE_RED',
    name: 'Kırmızı Elma',
    category: 'FRUIT',
    kenneyModelHint: 'apple_red'
  },
  APPLE_GREEN: {
    id: 'APPLE_GREEN',
    name: 'Yeşil Elma',
    category: 'FRUIT',
    kenneyModelHint: 'apple_green'
  },
  COLA_RED: {
    id: 'COLA_RED',
    name: 'Kola (Kırmızı)',
    category: 'DRINK',
    kenneyModelHint: 'cola_can_red'
  },
  COLA_BLUE: {
    id: 'COLA_BLUE',
    name: 'Kola (Mavi)',
    category: 'DRINK',
    kenneyModelHint: 'cola_can_blue'
  },
  CHIPS: {
    id: 'CHIPS',
    name: 'Cips',
    category: 'SNACK',
    kenneyModelHint: 'chips_bag'
  },
  CHOCOLATE: {
    id: 'CHOCOLATE',
    name: 'Çikolata',
    category: 'SNACK',
    kenneyModelHint: 'chocolate_bar'
  },
  EGG_CARTON: {
    id: 'EGG_CARTON',
    name: 'Yumurta Kolisi',
    category: 'OTHER',
    kenneyModelHint: 'egg_carton'
  },
  WATER_BOTTLE: {
    id: 'WATER_BOTTLE',
    name: 'Su Şişesi',
    category: 'DRINK',
    kenneyModelHint: 'water_bottle'
  },
  YOGURT: {
    id: 'YOGURT',
    name: 'Yoğurt',
    category: 'DAIRY',
    kenneyModelHint: 'yogurt_cup'
  },
  CEREAL_BOX: {
    id: 'CEREAL_BOX',
    name: 'Mısır Gevrek Kutusu',
    category: 'OTHER',
    kenneyModelHint: 'cereal_box'
  }
};

export type { ShelfDefinition } from './legacyProducts';
export {
  buildOrderKey,
  PRODUCT_VARIANTS,
  PRODUCT_MAP,
  VARIANT_MAP,
  SHELVES,
  getVariantByKey,
  getProductName
} from './legacyProducts';

