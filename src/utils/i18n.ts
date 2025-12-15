/**
 * Internationalization (i18n) utility
 * Oyun içi tüm metinleri dil'e göre döndürür
 */

export type Language = 'TR' | 'EN';

interface Translations {
  // Ana Menü
  mainMenu: {
    title: string;
    play: string;
    market: string;
    settings: string;
  };
  
  // Ayarlar
  settings: {
    title: string;
    backToMenu: string;
    audio: string;
    music: string;
    sfx: string;
    gameSecurity: string;
    childMode: string;
    childModeDesc: string;
    showJoystick: string;
    showJoystickDesc: string;
    accessibility: string;
    largeText: string;
    highContrast: string;
    language: string;
    account: string;
    resetProgress: string;
    resetConfirm: string;
    resetSuccess: string;
    cancel: string;
    reset: string;
    version: string;
  };
  
  // Oyun Ekranları
  game: {
    order: string;
    prepareOrder: string;
    completeOrder: string;
    addToCart: string;
    wrongItem: string;
    prepareOrderFirst: string;
    shelfHint: string;
    shelfHintText: string;
    level: string;
    coins: string;
    xp: string;
    marketLevel: string;
    play: string;
    myMarket: string;
    settings: string;
  };
  
  // Sipariş Ekranı
  order: {
    onlineOrder: string;
    walkInCustomer: string;
    orderList: string;
    tips: string;
    start: string;
    back: string;
    description: string;
  };
  
  // Seviye Sonuç
  levelResult: {
    success: string;
    failed: string;
    coinsEarned: string;
    xpEarned: string;
    nextLevel: string;
    retry: string;
    menu: string;
  };
  
  // Seviye Seçim
  levelSelect: {
    title: string;
    selectLevel: string;
    locked: string;
    completed: string;
    back: string;
  };
  
  // Checkout
  checkout: {
    title: string;
    packing: string;
    complete: string;
    back: string;
  };
  
  // Market Upgrade
  marketUpgrade: {
    title: string;
    levelUp: string;
    newFeatures: string;
    continue: string;
  };
  
  // Tutorial
  tutorial: {
    skip: string;
    next: string;
  };
}

const translations: Record<Language, Translations> = {
  TR: {
    mainMenu: {
      title: 'Market Runner',
      subtitle: 'Mahalle marketini yönet, siparişleri yetiştir!',
      play: 'Oyna',
      market: 'Marketim',
      settings: 'Ayarlar'
    },
    settings: {
      title: 'Ayarlar',
      backToMenu: '← Ana Menü',
      audio: 'SES & MÜZİK 🎵',
      music: 'Müzik',
      sfx: 'Ses Efektleri',
      gameSecurity: 'OYUN & GÜVENLİK 🛡️',
      childMode: 'Çocuk Modu',
      childModeDesc: 'Satın alımları ve dış bağlantıları engeller.',
      showJoystick: 'Joystick Göster',
      showJoystickDesc: 'Dokunmatik kontroller yerine sanal joystick kullan.',
      accessibility: 'ERİŞİLEBİLİRLİK ♿',
      largeText: 'Büyük Metin',
      highContrast: 'Yüksek Kontrast',
      language: 'DİL / LANGUAGE 🌍',
      account: 'HESAP & VERİ 💾',
      resetProgress: 'İlerlemeyi Sıfırla',
      resetConfirm: 'Tüm oyun ilerlemesi ve puanlar silinecek. Emin misin?',
      resetSuccess: 'Başarılı',
      cancel: 'Vazgeç',
      reset: 'Sıfırla',
      version: 'Versiyon 1.0.4 (Beta)'
    },
    game: {
      order: 'Sipariş',
      prepareOrder: 'Siparişi Hazırla',
      completeOrder: 'Siparişi Tamamla',
      addToCart: 'Sepete eklendi!',
      wrongItem: 'Bu ürün siparişte yok!',
      prepareOrderFirst: 'Önce "Siparişi Hazırla" butonuna dokun.',
      shelfHint: 'Raf İpucu',
      shelfHintText: 'Raf sekmelerini yatay kaydırarak markette gez, kartlara dokunarak ürünleri sepete ekle. Yanlış ürün seçersen uyarı alırsın.',
      level: 'Seviye',
      coins: 'Coins',
      xp: 'XP',
      marketLevel: 'Market Lvl',
      play: 'Play',
      myMarket: 'My Market',
      settings: 'Settings'
    },
    order: {
      onlineOrder: 'Online Sipariş',
      walkInCustomer: 'Walk-in Müşteri',
      orderList: 'Sipariş Listesi',
      tips: 'İpuçları',
      start: 'Başla',
      back: '← Geri',
      description: 'Siparişi hazırlamak için gerekli ürünleri topla ve kasada paketle.'
    },
    levelResult: {
      success: 'Tebrikler!',
      failed: 'Başarısız',
      coinsEarned: 'Kazanılan Coins',
      xpEarned: 'Kazanılan XP',
      nextLevel: 'Sonraki Seviye',
      retry: 'Tekrar Dene',
      menu: 'Ana Menü',
      levelFailed: 'Level Başarısız',
      levelCompleted: 'siparişi tamamlandı.',
      retryLevel: 'Tekrar Oyna',
      selectLevel: 'Level Seç',
      exit: 'Çıkış',
      total: 'Toplam',
      openLevels: 'Açık level',
      levelUp: 'Market Level Up!',
      levelUpText: 'Daha geniş raflar ve yeni dekorlar kullanıma hazır görünüyor.'
    },
    levelSelect: {
      title: 'Seviye Seç',
      selectLevel: 'Seviye Seç',
      locked: 'Kilitli',
      completed: 'Tamamlandı',
      back: '← Geri'
    },
    checkout: {
      title: 'Ödeme',
      packing: 'Paketleme',
      complete: 'Tamamla',
      back: '← Geri'
    },
    marketUpgrade: {
      title: 'Market Geliştirme',
      levelUp: 'Seviye Atladın!',
      newFeatures: 'Yeni Özellikler',
      continue: 'Devam Et'
    },
    tutorial: {
      skip: "Tutorial'i Atla",
      next: 'İleri'
    }
  },
  EN: {
    mainMenu: {
      title: 'Market Runner',
      subtitle: 'Manage your neighborhood market, fulfill orders!',
      play: 'Play',
      market: 'My Market',
      settings: 'Settings'
    },
    settings: {
      title: 'Settings',
      backToMenu: '← Main Menu',
      audio: 'AUDIO & MUSIC 🎵',
      music: 'Music',
      sfx: 'Sound Effects',
      gameSecurity: 'GAME & SECURITY 🛡️',
      childMode: 'Child Mode',
      childModeDesc: 'Blocks purchases and external links.',
      showJoystick: 'Show Joystick',
      showJoystickDesc: 'Use virtual joystick instead of touch controls.',
      accessibility: 'ACCESSIBILITY ♿',
      largeText: 'Large Text',
      highContrast: 'High Contrast',
      language: 'LANGUAGE / DİL 🌍',
      account: 'ACCOUNT & DATA 💾',
      resetProgress: 'Reset Progress',
      resetConfirm: 'All game progress and scores will be deleted. Are you sure?',
      resetSuccess: 'Success',
      cancel: 'Cancel',
      reset: 'Reset',
      version: 'Version 1.0.4 (Beta)'
    },
    game: {
      order: 'Order',
      prepareOrder: 'Prepare Order',
      completeOrder: 'Complete Order',
      addToCart: 'Added to cart!',
      wrongItem: 'This item is not in the order!',
      prepareOrderFirst: 'Please tap "Prepare Order" button first.',
      shelfHint: 'Shelf Hint',
      shelfHintText: 'Swipe shelf tabs horizontally to navigate the store, tap cards to add products to cart. You will get a warning if you select wrong items.',
      level: 'Level',
      coins: 'Coins',
      xp: 'XP',
      marketLevel: 'Market Lvl',
      play: 'Play',
      myMarket: 'My Market',
      settings: 'Settings'
    },
    order: {
      onlineOrder: 'Online Order',
      walkInCustomer: 'Walk-in Customer',
      orderList: 'Order List',
      tips: 'Tips',
      start: 'Start',
      back: '← Back',
      description: 'Collect the required products to prepare the order and pack at checkout.'
    },
    levelResult: {
      success: 'Congratulations!',
      failed: 'Failed',
      coinsEarned: 'Coins Earned',
      xpEarned: 'XP Earned',
      nextLevel: 'Next Level',
      retry: 'Retry',
      menu: 'Main Menu',
      levelFailed: 'Level Failed',
      levelCompleted: 'order completed.',
      retryLevel: 'Play Again',
      selectLevel: 'Select Level',
      exit: 'Exit',
      total: 'Total',
      openLevels: 'Open levels',
      levelUp: 'Market Level Up!',
      levelUpText: 'Wider shelves and new decorations are ready to use.'
    },
    levelSelect: {
      title: 'Select Level',
      selectLevel: 'Select Level',
      locked: 'Locked',
      completed: 'Completed',
      back: '← Back'
    },
    checkout: {
      title: 'Checkout',
      packing: 'Packing',
      complete: 'Complete',
      back: '← Back'
    },
    marketUpgrade: {
      title: 'Market Upgrade',
      levelUp: 'Level Up!',
      newFeatures: 'New Features',
      continue: 'Continue'
    },
    tutorial: {
      skip: 'Skip Tutorial',
      next: 'Next'
    }
  }
};

let currentLanguage: Language = 'TR';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
};

export const getLanguage = (): Language => {
  return currentLanguage;
};

export const t = (key: keyof Translations): Translations[typeof key] => {
  return translations[currentLanguage][key];
};

// Helper function to get nested translation
export const getTranslation = <K extends keyof Translations>(
  section: K,
  key: keyof Translations[K]
): string => {
  return (translations[currentLanguage][section] as any)[key] as string;
};

