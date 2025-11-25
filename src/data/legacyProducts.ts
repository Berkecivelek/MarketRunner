import type { GameMode } from '../types/common';
import type { ProductDefinition, ProductVariant } from '../types/product';

export const buildOrderKey = (productId: string, brandId?: string) =>
  `${productId}__${brandId ?? 'default'}`;

const PRODUCT_DEFINITIONS: ProductDefinition[] = [
  {
    id: 'milk',
    name: 'Süt',
    category: 'dairy',
    baseColor: '#F8E5C2',
    shelfTitle: 'Süt & Kahvaltı',
    brands: [
      { id: 'freshfarm', name: 'FreshFarm Süt', accentColor: '#FFE066', shortCode: 'FF' },
      { id: 'dailybarn', name: 'DailyBarn Süt', accentColor: '#FFD1DC', shortCode: 'DB' },
      { id: 'organicwave', name: 'OrganicWave Süt', accentColor: '#C3F0CA', shortCode: 'OW' }
    ]
  },
  {
    id: 'bread',
    name: 'Ekmek',
    category: 'pantry',
    baseColor: '#F2C57C',
    shelfTitle: 'Temel Gıda',
    brands: [
      { id: 'goldencrust', name: 'GoldenCrust', accentColor: '#D8A47F', shortCode: 'GC' },
      { id: 'homeloaf', name: 'HomeLoaf', accentColor: '#E7A977', shortCode: 'HL' }
    ]
  },
  {
    id: 'apple',
    name: 'Elma',
    category: 'produce',
    baseColor: '#F26B5E',
    shelfTitle: 'Meyve & Sebze'
  },
  {
    id: 'banana',
    name: 'Muz',
    category: 'produce',
    baseColor: '#FFE06A',
    shelfTitle: 'Meyve & Sebze'
  },
  {
    id: 'orange-juice',
    name: 'Portakal Suyu',
    category: 'beverage',
    baseColor: '#FF924C',
    shelfTitle: 'İçecekler',
    brands: [
      { id: 'citrusburst', name: 'CitrusBurst', accentColor: '#FFA45B', shortCode: 'CB' },
      { id: 'sunnyday', name: 'SunnyDay', accentColor: '#FFD166', shortCode: 'SD' }
    ]
  },
  {
    id: 'cereal',
    name: 'Gece Kahvaltı Gevrek',
    category: 'pantry',
    baseColor: '#C1D7AE',
    shelfTitle: 'Kahvaltılık & Kuru Gıda',
    brands: [
      { id: 'morningbites', name: 'MorningBites', accentColor: '#99D98C', shortCode: 'MB' },
      { id: 'crunchloops', name: 'CrunchLoops', accentColor: '#C7F9CC', shortCode: 'CL' }
    ]
  },
  {
    id: 'cookies',
    name: 'Kurabiye',
    category: 'pantry',
    baseColor: '#D9AE94',
    shelfTitle: 'Temel Gıda'
  },
  {
    id: 'yogurt',
    name: 'Yoğurt',
    category: 'dairy',
    baseColor: '#B0E0E6',
    shelfTitle: 'Süt & Kahvaltı',
    brands: [
      { id: 'coolcup', name: 'CoolCup Yoğurt', accentColor: '#A2D2FF', shortCode: 'CC' },
      { id: 'farmfresh', name: 'FarmFresh Yoğurt', accentColor: '#BDE0FE', shortCode: 'FF' }
    ]
  },
  {
    id: 'cheese',
    name: 'Peynir',
    category: 'dairy',
    baseColor: '#FFF5B5',
    shelfTitle: 'Süt & Kahvaltı'
  },
  {
    id: 'chips',
    name: 'Cips',
    category: 'pantry',
    baseColor: '#F7C59F',
    shelfTitle: 'Temel Gıda',
    brands: [
      { id: 'crispster', name: 'Crispster', accentColor: '#FFB703', shortCode: 'CR' },
      { id: 'saltblast', name: 'SaltBlast', accentColor: '#E9C46A', shortCode: 'SB' }
    ]
  },
  {
    id: 'smartphone',
    name: 'Akıllı Telefon',
    category: 'electronics',
    baseColor: '#9CA3AF',
    shelfTitle: 'Elektronik'
  },
  {
    id: 'headphones',
    name: 'Kulaklık',
    category: 'electronics',
    baseColor: '#7C83FD',
    shelfTitle: 'Elektronik'
  },
  {
    id: 'laptop',
    name: 'Dizüstü Bilgisayar',
    category: 'electronics',
    baseColor: '#6B7280',
    shelfTitle: 'Elektronik'
  },
  {
    id: 'pasta',
    name: 'Makarna',
    category: 'pantry',
    baseColor: '#F1C453',
    shelfTitle: 'Temel Gıda'
  },
  {
    id: 'rice',
    name: 'Pirinç',
    category: 'pantry',
    baseColor: '#F7E7CE',
    shelfTitle: 'Temel Gıda'
  },
  {
    id: 'olive-oil',
    name: 'Zeytinyağı',
    category: 'pantry',
    baseColor: '#EADCA6',
    shelfTitle: 'Temel Gıda'
  },
  {
    id: 'egg-carton',
    name: 'Yumurta',
    category: 'pantry',
    baseColor: '#FCE7B2',
    shelfTitle: 'Temel Gıda'
  },
  {
    id: 'chicken',
    name: 'Tavuk Göğsü',
    category: 'butcher',
    baseColor: '#FEC5BB',
    shelfTitle: 'Et & Tavuk'
  },
  {
    id: 'beef',
    name: 'Dana Eti',
    category: 'butcher',
    baseColor: '#F28482',
    shelfTitle: 'Et & Tavuk'
  },
  {
    id: 'sucuk',
    name: 'Sucuk',
    category: 'butcher',
    baseColor: '#F4978E',
    shelfTitle: 'Et & Tavuk'
  },
  {
    id: 'fish',
    name: 'Balık Fileto',
    category: 'butcher',
    baseColor: '#9AD1D4',
    shelfTitle: 'Et & Tavuk'
  },
  {
    id: 'water',
    name: 'Su Şişesi',
    category: 'beverage',
    baseColor: '#BDE0FE',
    shelfTitle: 'Su & İçecek'
  },
  {
    id: 'cola',
    name: 'Kola',
    category: 'beverage',
    baseColor: '#8ECAE6',
    shelfTitle: 'Su & İçecek'
  },
  {
    id: 'fruit-juice',
    name: 'Meyve Suyu',
    category: 'beverage',
    baseColor: '#F6BD60',
    shelfTitle: 'Su & İçecek'
  },
  {
    id: 'iced-tea',
    name: 'Buzlu Çay',
    category: 'beverage',
    baseColor: '#E5989B',
    shelfTitle: 'Su & İçecek'
  },
  {
    id: 'tomato',
    name: 'Domates',
    category: 'produce',
    baseColor: '#FF6F59',
    shelfTitle: 'Meyve & Sebze'
  },
  {
    id: 'lettuce',
    name: 'Marul',
    category: 'produce',
    baseColor: '#B9E28C',
    shelfTitle: 'Meyve & Sebze'
  },
  {
    id: 'cucumber',
    name: 'Salatalık',
    category: 'produce',
    baseColor: '#A4DE02',
    shelfTitle: 'Meyve & Sebze'
  },
  {
    id: 'strawberry',
    name: 'Çilek',
    category: 'produce',
    baseColor: '#F06292',
    shelfTitle: 'Meyve & Sebze'
  }
];

const variants: ProductVariant[] = PRODUCT_DEFINITIONS.flatMap((product) => {
  // TEMPORARY: Force single variant per product (ignore brands)
  // if (!product.brands || product.brands.length === 0) {
    return [
      {
        productId: product.id,
        displayName: product.name,
        color: product.baseColor,
        icon: product.icon,
        shelfTitle: product.shelfTitle
      }
    ];
  // }

  /*
  return product.brands.map((brand) => ({
    productId: product.id,
    brandId: brand.id,
    displayName: brand.name,
    color: brand.accentColor,
    icon: product.icon,
    shelfTitle: product.shelfTitle,
    badgeText: brand.shortCode
  }));
  */
});

export const PRODUCT_VARIANTS = variants;

export const PRODUCT_MAP = Object.fromEntries(
  PRODUCT_DEFINITIONS.map((product) => [product.id, product])
) as Record<string, ProductDefinition>;

export const VARIANT_MAP = Object.fromEntries(
  variants.map((variant) => [buildOrderKey(variant.productId, variant.brandId), variant])
) as Record<string, ProductVariant>;

export interface ShelfDefinition {
  id: string;
  title: string;
  category: ProductDefinition['category'];
  variants: ProductVariant[];
}

const categoryOrder: ProductDefinition['category'][] = [
  'produce',
  'dairy',
  'electronics',
  'pantry',
  'butcher',
  'beverage'
];

export const SHELVES: ShelfDefinition[] = categoryOrder.map((category) => {
  const definitions = PRODUCT_DEFINITIONS.filter((product) => product.category === category);
  const variantsForShelf = variants.filter((variant) =>
    definitions.some((product) => product.id === variant.productId)
  );

  const title =
    definitions[0]?.shelfTitle ??
    ({
      produce: 'Meyve & Sebze',
      dairy: 'Süt Ürünleri',
      electronics: 'Elektronik',
      pantry: 'Temel Gıda',
      butcher: 'Et & Tavuk',
      beverage: 'Su & İçecek'
    }[category] ?? 'Raf');

  return {
    id: category,
    title,
    category,
    variants: variantsForShelf
  };
});

export const getVariantByKey = (productId: string, brandId?: string) =>
  VARIANT_MAP[buildOrderKey(productId, brandId)];

export const getProductName = (productId: string, brandId?: string) => {
  const variant = getVariantByKey(productId, brandId);
  if (variant) {
    return variant.displayName;
  }
  const product = PRODUCT_MAP[productId];
  return product ? product.name : productId;
};

export const getVariantsForMode = (mode: GameMode): ProductVariant[] => {
  return PRODUCT_DEFINITIONS.flatMap((product) => {
    // BAKKAL: Sadece 1 tane (Markasız/Varsayılan)
    if (mode === 'BAKKAL') {
      return [{
        productId: product.id,
        displayName: product.name,
        color: product.baseColor,
        icon: product.icon,
        shelfTitle: product.shelfTitle
      }];
    }

    // MARKET: Varsayılan + Maksimum 2 Marka
    // Markaları listele, yoksa default dön.
    // Market modunda "default" yerine markalı ürünleri tercih edelim ki çeşitlilik olsun.
    if (mode === 'MARKET') {
      const brands = (product.brands || []).slice(0, 2);
      if (brands.length === 0) {
         return [{
          productId: product.id,
          displayName: product.name,
          color: product.baseColor,
          icon: product.icon,
          shelfTitle: product.shelfTitle
        }];
      }
      return brands.map(brand => ({
        productId: product.id,
        brandId: brand.id,
        displayName: brand.name,
        color: brand.accentColor,
        icon: product.icon,
        shelfTitle: product.shelfTitle,
        badgeText: brand.shortCode
      }));
    }

    // SUPERMARKET: Tüm Markalar
    if (product.brands && product.brands.length > 0) {
      return product.brands.map(brand => ({
        productId: product.id,
        brandId: brand.id,
        displayName: brand.name,
        color: brand.accentColor,
        icon: product.icon,
        shelfTitle: product.shelfTitle,
        badgeText: brand.shortCode
      }));
    }
    
    // Markası yoksa varsayılan
    return [{
      productId: product.id,
      displayName: product.name,
      color: product.baseColor,
      icon: product.icon,
      shelfTitle: product.shelfTitle
    }];
  });
};

export const getShelvesForMode = (mode: GameMode): ShelfDefinition[] => {
  const variants = getVariantsForMode(mode);
  
  return categoryOrder.map((category) => {
    const definitions = PRODUCT_DEFINITIONS.filter((product) => product.category === category);
    // Bu shelf için uygun variantları bul (productId eşleşmesi üzerinden)
    const variantsForShelf = variants.filter((variant) =>
      definitions.some((product) => product.id === variant.productId)
    );

    const title =
      definitions[0]?.shelfTitle ??
      ({
        produce: 'Meyve & Sebze',
        dairy: 'Süt Ürünleri',
        electronics: 'Elektronik',
        pantry: 'Temel Gıda',
        butcher: 'Et & Tavuk',
        beverage: 'Su & İçecek'
      }[category] ?? 'Raf');

    return {
      id: category,
      title,
      category,
      variants: variantsForShelf
    };
  });
};

