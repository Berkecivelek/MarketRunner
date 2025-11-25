export const COLORS = {
  // Genel Arkaplanlar
  background: '#E0F7FA', // Açık gökyüzü mavisi
  backgroundAlt: '#FFF9C4', // Açık sarı (güneşli hissi)
  
  // Kartlar ve Paneller
  card: '#FFFFFF',
  cardBorder: '#B3E5FC',
  
  // Marka / UI Renkleri
  primary: '#FF6F00', // Canlı turuncu (Action butonları)
  secondary: '#0288D1', // Canlı mavi (Bilgi butonları)
  accent: '#76FF03', // Canlı yeşil (Başarı, Sepet)
  danger: '#FF1744', // Canlı kırmızı (Hata, Sil)
  
  // Metinler
  text: '#37474F', // Yumuşak siyah (Okunabilirlik için)
  textLight: '#78909C',
  textInverse: '#FFFFFF',

  // Oyun Modu Renkleri
  bakkal: '#FFEB3B', // Sarı
  market: '#4FC3F7', // Mavi
  supermarket: '#AB47BC', // Mor

  // UI Elementleri
  shelf: '#8D6E63', // Ahşap rengi
  floor: '#E0E0E0', // Zemin
};

export const SHADOWS = {
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 0, // Sert gölge (Cartoon hissi)
    elevation: 6,
  }
};

export const FONTS = {
  // İleride özel font eklenirse buraya gelecek
  rounded: 'System', // iOS'te rounded system font kullanılabilir
};

