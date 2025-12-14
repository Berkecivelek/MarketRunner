/**
 * Asset Registry - Tüm statik görselleri organize eder
 * Manav ve Fırın reyonları için özel asset'ler
 */

// Raf görselleri
export const SHELVES = {
  manav: require('../../assets/images/shelves/manav_rafi.png'),
  firin: require('../../assets/images/shelves/firin_rafi.png'),
} as const;

// Manav ürünleri - Dosya isimlerine göre direkt eşleştirme
export const PRODUCTS = {
  manav: {
    elma: require('../../assets/images/products/manav/elma.png'),
    domates: require('../../assets/images/products/manav/domates.png'),
    biber: require('../../assets/images/products/manav/biber.png'),
    çilek: require('../../assets/images/products/manav/strawberry.png'),
    havuç: require('../../assets/images/products/manav/carrot.png'),
    karpuz: require('../../assets/images/products/manav/karpuz.png'),
    limon: require('../../assets/images/products/manav/limon.png'),
    marul: require('../../assets/images/products/manav/marul.png'),
    muz: require('../../assets/images/products/manav/muz.png'),
    patlıcan: require('../../assets/images/products/manav/eggplant.png'),
    portakal: require('../../assets/images/products/manav/portakal.png'),
    salatalık: require('../../assets/images/products/manav/cucumber.png'),
  },
  firin: {
    ekmek: require('../../assets/images/products/firin/Ekmek.png'),
    baget: require('../../assets/images/products/firin/baget.png'),
    donut: require('../../assets/images/products/firin/donut.png'),
    kruvasan: require('../../assets/images/products/firin/kruvasan.png'),
    kurabiye: require('../../assets/images/products/firin/kurabiye.png'),
    muffin: require('../../assets/images/products/firin/muffin.png'),
    pasta: require('../../assets/images/products/firin/pasta.png'),
    pide: require('../../assets/images/products/firin/pide.png'),
    pizza: require('../../assets/images/products/firin/pizza.png'),
    sandviç: require('../../assets/images/products/firin/sandwich.png'),
    simit: require('../../assets/images/products/firin/simit.png'),
    turta: require('../../assets/images/products/firin/turta.png'),
  },
} as const;

/**
 * Ürün ID'sinden asset key'ine eşleme
 * legacyProducts.ts'deki productId'leri asset key'lerine map eder
 */
export const PRODUCT_ID_TO_ASSET_KEY: Record<string, keyof typeof PRODUCTS.manav | keyof typeof PRODUCTS.firin> = {
  // Manav ürünleri - productId -> asset key
  'apple': 'elma',
  'banana': 'muz',
  'tomato': 'domates',
  'cucumber': 'salatalık',
  'strawberry': 'çilek',
  'lettuce': 'marul',
  'pepper': 'biber',
  'carrot': 'havuç',
  'watermelon': 'karpuz',
  'lemon': 'limon',
  'eggplant': 'patlıcan',
  'orange': 'portakal',
  
  // Fırın ürünleri - productId -> asset key
  'bread': 'ekmek',
  'cookies': 'kurabiye',
  'cookie': 'kurabiye', // SceneView'de 'cookie' kullanılıyor
  'baguette': 'baget',
  'donut': 'donut',
  'croissant': 'kruvasan',
  'muffin': 'muffin',
  'cake': 'pasta',
  'pita': 'pide',
  'pizza': 'pizza',
  'sandwich': 'sandviç',
  'simit': 'simit',
  'pie': 'turta',
};

/**
 * Reyon başlığından raf görseline eşleme
 */
export const getShelfAsset = (shelfTitle: string): typeof SHELVES.manav | typeof SHELVES.firin | null => {
  const titleLower = shelfTitle.toLowerCase();
  const titleUpper = shelfTitle.toUpperCase();
  
  // "Meyve & Sebze" veya "MANAV" için manav rafı
  if (titleLower.includes('meyve') || titleLower.includes('sebze') || titleLower.includes('manav') || titleUpper === 'MANAV') {
    return SHELVES.manav;
  }
  
  // "Fırın", "FIRIN", "Bakery" veya "Temel Gıda" (bread/cookies için) için fırın rafı
  if (titleLower.includes('fırın') || titleLower.includes('firin') || titleLower.includes('bakery') || titleUpper === 'FIRIN' || titleLower.includes('temel gıda')) {
    return SHELVES.firin;
  }
  
  return null;
};

/**
 * Ürün ID'sinden asset'e erişim
 * productId ve shelfTitle'a göre doğru asset'i döndürür
 */
export const getProductAsset = (
  productId: string,
  shelfTitle: string
): typeof PRODUCTS.manav[keyof typeof PRODUCTS.manav] | typeof PRODUCTS.firin[keyof typeof PRODUCTS.firin] | null => {
  const shelfTitleLower = shelfTitle.toLowerCase();
  const productIdLower = productId.toLowerCase();
  
  // Reyon tipine göre asset grubunu seç
  const shelfTitleUpper = shelfTitle.toUpperCase();
  const isManav = shelfTitleLower.includes('meyve') || shelfTitleLower.includes('sebze') || shelfTitleLower.includes('manav') || shelfTitleUpper === 'MANAV';
  const isFirin = shelfTitleLower.includes('fırın') || shelfTitleLower.includes('firin') || shelfTitleLower.includes('bakery') || shelfTitleUpper === 'FIRIN' || shelfTitleLower.includes('temel gıda');
  
  // Product ID'den asset key'ine çevir
  const assetKey = PRODUCT_ID_TO_ASSET_KEY[productIdLower];
  
  if (!assetKey) {
    return null;
  }
  
  // Reyon tipine göre doğru asset grubundan al
  if (isManav && assetKey in PRODUCTS.manav) {
    return PRODUCTS.manav[assetKey as keyof typeof PRODUCTS.manav];
  }
  
  if (isFirin && assetKey in PRODUCTS.firin) {
    return PRODUCTS.firin[assetKey as keyof typeof PRODUCTS.firin];
  }
  
  return null;
};
