/**
 * Ürün ID'lerini İngilizce isimlere çeviren mapping
 * Çocukların İngilizce öğrenmesi için kullanılır
 */

export const PRODUCT_ENGLISH_NAMES: Record<string, string> = {
  // Meyve & Sebze (Produce)
  'apple': 'Apple',
  'banana': 'Banana',
  'tomato': 'Tomato',
  'lettuce': 'Lettuce',
  'cucumber': 'Cucumber',
  'strawberry': 'Strawberry',
  'lemon': 'Lemon',
  'orange': 'Orange',
  'carrot': 'Carrot',
  'eggplant': 'Eggplant',
  'pepper': 'Pepper',
  'watermelon': 'Watermelon',
  
  // Süt Ürünleri (Dairy)
  'milk': 'Milk',
  'cheese': 'Cheese',
  'yogurt': 'Yogurt',
  'egg': 'Egg',
  'butter': 'Butter',
  'cream': 'Cream',
  'ice-cream': 'Ice Cream',
  'ayran': 'Ayran',
  'pudding': 'Pudding',
  'kefir': 'Kefir',
  'cheesewheel': 'Cheese',
  'labne': 'Labneh',
  
  // Fırın (Bakery)
  'bread': 'Bread',
  'croissant': 'Croissant',
  'cookie': 'Cookie',
  'cake': 'Cake',
  'baguette': 'Baguette',
  'donut': 'Donut',
  'simit': 'Simit',
  'pizza': 'Pizza',
  'muffin': 'Muffin',
  'pie': 'Pie',
  'sandwich': 'Sandwich',
  'pide': 'Pide',
  'cookies': 'Cookies',
  'cereal': 'Cereal',
  
  // İçecekler (Beverages)
  'cola': 'Cola',
  'water': 'Water',
  'fruit-juice': 'Fruit Juice',
  'tea': 'Tea',
  'coffee': 'Coffee',
  'soda': 'Soda',
  'lemonade': 'Lemonade',
  'milkshake': 'Milkshake',
  'orangejuice': 'Orange Juice',
  'orange-juice': 'Orange Juice',
  'energydrink': 'Energy Drink',
  'hotchoco': 'Hot Chocolate',
  'icetea': 'Iced Tea',
  'iced-tea': 'Iced Tea',
  
  // Atıştırmalık (Snacks)
  'chips': 'Chips',
  'chocolate': 'Chocolate',
  'candy': 'Candy',
  'popcorn': 'Popcorn',
  'cracker': 'Cracker',
  'pretzel': 'Pretzel',
  'jelly': 'Jelly',
  'biscuit': 'Biscuit',
  'wafer': 'Wafer',
  'nachos': 'Nachos',
  'nuts': 'Nuts',
  'bar': 'Bar',
  
  // Elektronik (Electronics)
  'phone': 'Phone',
  'smartphone': 'Smartphone',
  'laptop': 'Laptop',
  'headphone': 'Headphone',
  'headphones': 'Headphones',
  'camera': 'Camera',
  'tablet': 'Tablet',
  'mouse': 'Mouse',
  'gamepad': 'Gamepad',
  'watch': 'Watch',
  'keyboard': 'Keyboard',
  'speaker': 'Speaker',
  'charger': 'Charger',
  'usb': 'USB',
  
  // Temel Gıda (Staples)
  'pasta': 'Pasta',
  'rice': 'Rice',
  'lentil': 'Lentil',
  'flour': 'Flour',
  'sugar_bag': 'Sugar',
  'salt': 'Salt',
  'oil': 'Oil',
  'olive-oil': 'Olive Oil',
  'tomato_paste': 'Tomato Paste',
  'canned_food': 'Canned Food',
  'bulgur': 'Bulgur',
  'semolina': 'Semolina',
  'chickpea': 'Chickpea',
  
  // Et & Tavuk (Meat)
  'chicken': 'Chicken',
  'minced_meat': 'Minced Meat',
  'steak': 'Steak',
  'beef': 'Beef',
  'sausage': 'Sausage',
  'salami': 'Salami',
  'sujuk': 'Sujuk',
  'sucuk': 'Sujuk',
  'meatball': 'Meatball',
  'wings': 'Wings',
  'drumstick': 'Drumstick',
  'fish': 'Fish',
  'pastrami': 'Pastrami',
  'nugget': 'Nugget',
  
  // Diğer
  'egg-carton': 'Eggs',
  'egg_carton': 'Eggs',
  'EGG_CARTON': 'Eggs',
  'WATER_BOTTLE': 'Water',
  'CEREAL_BOX': 'Cereal',
  'APPLE_RED': 'Apple',
  'APPLE_GREEN': 'Apple',
  'COLA_RED': 'Cola',
  'COLA_BLUE': 'Cola',
  'MILK': 'Milk',
  'BREAD': 'Bread',
  'YOGURT': 'Yogurt',
  'CHIPS': 'Chips',
  'CHOCOLATE': 'Chocolate',
};

/**
 * Ürün ID'sini İngilizce isme çevirir
 * @param productId - Ürün ID'si
 * @returns İngilizce ürün adı veya productId (bulunamazsa)
 */
export function getProductEnglishName(productId: string): string {
  // Önce direkt eşleşmeyi dene
  if (PRODUCT_ENGLISH_NAMES[productId]) {
    return PRODUCT_ENGLISH_NAMES[productId];
  }
  
  // Küçük harfe çevirip tekrar dene
  const lowerId = productId.toLowerCase();
  if (PRODUCT_ENGLISH_NAMES[lowerId]) {
    return PRODUCT_ENGLISH_NAMES[lowerId];
  }
  
  // Tire ve alt çizgiyi kaldırıp dene
  const normalizedId = lowerId.replace(/[-_]/g, '');
  if (PRODUCT_ENGLISH_NAMES[normalizedId]) {
    return PRODUCT_ENGLISH_NAMES[normalizedId];
  }
  
  // Son çare: İlk harfi büyük yap
  return productId.charAt(0).toUpperCase() + productId.slice(1).toLowerCase();
}

