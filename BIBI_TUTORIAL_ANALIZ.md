# Bibi Karakterli Tutorial Sistemi - Analiz ve Plan 📋

## 🎯 İstenen Özellikler

1. ✅ **Bibi Karakteri:** Logo'daki karakterin birebir aynısı
2. ✅ **İlk Oynama Kontrolü:** Sadece ilk defa oynayanlar için
3. ✅ **Level 1'e Kadar:** Level 1 tamamlanana kadar yardım
4. ✅ **Konuşma Balonları:** Bibi'nin oyunu öğretmesi için
5. ✅ **Görsel Örnekler:** Ekran görüntülerindeki gibi interaktif tutorial

## 📊 Mevcut Durum Analizi

### ✅ Mevcut Dosyalar:
- `assets/logo-market.png` - Logo dosyası (Bibi karakteri içeriyor)
- `assets/bibi-character.png` - Bibi karakteri (varsa)
- `src/state/GameContext.tsx` - Oyun state yönetimi
- `src/screens/OrderScreen.tsx` - Sipariş ekranı
- `src/screens/GamePlayScreen.tsx` - Oyun ekranı
- `src/data/levels.ts` - Seviye verileri (tutorialTips var)

### ❌ Eksik Özellikler:
- Tutorial tamamlanma kontrolü yok
- Bibi karakter component'i yok
- Konuşma balonu component'i yok
- Tutorial ekranı yok

## 🏗️ Önerilen Mimari

### 1. **Tutorial State Yönetimi**

**Dosya:** `src/state/GameContext.tsx`

```typescript
interface GameState {
  // ... mevcut alanlar
  tutorialCompleted: boolean; // Tutorial tamamlandı mı?
  tutorialStep: number; // Hangi tutorial adımında?
}

// AsyncStorage'a kaydedilecek
const TUTORIAL_STORAGE_KEY = '@market_runner_tutorial_completed';
```

**Kontrol Mantığı:**
- Level 1 tamamlanmışsa → `tutorialCompleted = true`
- `completedLevels` array'inde `1` varsa → Tutorial gösterme

### 2. **Bibi Karakter Component**

**Dosya:** `src/components/BibiCharacter.tsx`

```typescript
interface BibiCharacterProps {
  position?: 'left' | 'right' | 'center';
  animation?: 'idle' | 'pointing' | 'thumbs-up' | 'running';
  size?: number;
}
```

**Özellikler:**
- Logo'daki karakterin birebir aynısı
- Animasyonlu (idle, pointing, thumbs-up, running)
- Konumlandırılabilir (left, right, center)
- Boyutlandırılabilir

### 3. **Konuşma Balonu Component**

**Dosya:** `src/components/BibiSpeechBubble.tsx`

```typescript
interface BibiSpeechBubbleProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
  onDismiss?: () => void;
  showNextButton?: boolean;
}
```

**Özellikler:**
- Türkçe metin desteği
- Ok yönü (Bibi'ye doğru)
- Animasyonlu görünüm
- "Devam Et" butonu (opsiyonel)

### 4. **Tutorial Ekranı**

**Dosya:** `src/screens/TutorialScreen.tsx` (Yeni)

**Özellikler:**
- Bibi karakteri + konuşma balonu
- Adım adım öğretim
- Level 1'e özel içerik
- Skip butonu (opsiyonel)

### 5. **Tutorial Overlay (Oyun İçi)**

**Dosya:** `src/components/TutorialOverlay.tsx` (Yeni)

**Kullanım Yerleri:**
- `OrderScreen.tsx` - Sipariş ekranında Bibi göster
- `GamePlayScreen.tsx` - Oyun ekranında Bibi göster
- `CheckoutAndPackingScreen.tsx` - Kasa ekranında Bibi göster

**Özellikler:**
- Overlay (üst katman)
- Bibi + konuşma balonu
- Highlight (vurgulama) - örneğin buton veya ürün
- Adım adım ilerleme

## 📱 Tutorial Akışı

### Senaryo 1: İlk Oyun Başlangıcı

1. **Splash Screen** → **Main Menu**
2. **Main Menu** → Kullanıcı "Play" butonuna tıklar
3. **Level Select** → Level 1 seçilir
4. **Tutorial Check:**
   - `completedLevels.includes(1)` → False
   - `tutorialCompleted` → False
   - **Tutorial göster!**

### Senaryo 2: Level 1 Tutorial Adımları

#### Adım 1: Hoş Geldin Ekranı
- **Ekran:** OrderScreen (Sipariş ekranı)
- **Bibi:** "MERHABA! BEN BİBİ, SENİN MARKET REHBERİN!"
- **Konum:** Sol taraf
- **Animasyon:** Waving (el sallama)

#### Adım 2: Sipariş Açıklama
- **Ekran:** OrderScreen
- **Bibi:** "Level 1'deyiz, bu bizim için basit! Şimdi Süt Ürünleri Reyonuna gidip süt ürününe tıkla ve sepete yolla!"
- **Highlight:** Sipariş listesi
- **Animasyon:** Pointing (işaret etme)

#### Adım 3: Oyun Başlatma
- **Ekran:** OrderScreen
- **Bibi:** "Başla butonuna tıkla!"
- **Highlight:** "Başla" butonu
- **Animasyon:** Pointing

#### Adım 4: Ürün Toplama
- **Ekran:** GamePlayScreen
- **Bibi:** "Ürünleri hızla topla!"
- **Highlight:** İlk ürün (süt)
- **Animasyon:** Pointing

#### Adım 5: Sepete Ekleme
- **Ekran:** GamePlayScreen
- **Bibi:** "Doğru ürüne tıkla, sepete eklenecek!"
- **Highlight:** Sepet butonu
- **Animasyon:** Thumbs-up

#### Adım 6: Sipariş Tamamlama
- **Ekran:** GamePlayScreen (tüm ürünler toplandı)
- **Bibi:** "Süper! Sipariş hazır, şimdi siparişi tamamla butonuna tıkla!"
- **Highlight:** "Siparişi Tamamla" butonu
- **Animasyon:** Thumbs-up

#### Adım 7: Level 1 Tamamlandı
- **Ekran:** LevelResultScreen
- **Bibi:** "Tebrikler! Level 1'i tamamladın! Artık kendi başına oynayabilirsin!"
- **Animasyon:** Celebration
- **Tutorial tamamlandı:** `tutorialCompleted = true`

## 🔧 Teknik Detaylar

### 1. **Tutorial State Kontrolü**

```typescript
// GameContext.tsx
const shouldShowTutorial = (levelId: number): boolean => {
  // Level 1 değilse tutorial gösterme
  if (levelId !== 1) return false;
  
  // Level 1 tamamlanmışsa tutorial gösterme
  if (completedLevels.includes(1)) return false;
  
  // Tutorial zaten tamamlanmışsa gösterme
  if (tutorialCompleted) return false;
  
  return true;
};
```

### 2. **Tutorial Adımları**

```typescript
// src/data/tutorialSteps.ts
export const TUTORIAL_STEPS = {
  ORDER_SCREEN_WELCOME: {
    screen: 'Order',
    message: 'MERHABA! BEN BİBİ, SENİN MARKET REHBERİN!',
    bibiPosition: 'left',
    bibiAnimation: 'waving',
    highlight: null,
  },
  ORDER_SCREEN_EXPLAIN: {
    screen: 'Order',
    message: 'Level 1\'deyiz, bu bizim için basit! Şimdi Süt Ürünleri Reyonuna gidip süt ürününe tıkla ve sepete yolla!',
    bibiPosition: 'left',
    bibiAnimation: 'pointing',
    highlight: 'orderList',
  },
  // ... diğer adımlar
};
```

### 3. **Overlay Sistemi**

```typescript
// TutorialOverlay.tsx
<TutorialOverlay
  visible={shouldShowTutorial(levelId)}
  step={currentTutorialStep}
  onNext={handleNextStep}
  onSkip={handleSkipTutorial}
>
  <BibiCharacter
    position={step.bibiPosition}
    animation={step.bibiAnimation}
  />
  <BibiSpeechBubble
    text={step.message}
    position="top"
    arrowDirection="down"
  />
  {step.highlight && (
    <Highlight target={step.highlight} />
  )}
</TutorialOverlay>
```

## 📦 Gerekli Dosyalar

### Yeni Dosyalar:
1. `src/components/BibiCharacter.tsx` - Bibi karakter component
2. `src/components/BibiSpeechBubble.tsx` - Konuşma balonu component
3. `src/components/TutorialOverlay.tsx` - Tutorial overlay component
4. `src/components/Highlight.tsx` - Vurgulama component (opsiyonel)
5. `src/data/tutorialSteps.ts` - Tutorial adımları verisi
6. `src/utils/tutorialManager.ts` - Tutorial yönetim utility

### Güncellenecek Dosyalar:
1. `src/state/GameContext.tsx` - Tutorial state ekle
2. `src/screens/OrderScreen.tsx` - Tutorial overlay ekle
3. `src/screens/GamePlayScreen.tsx` - Tutorial overlay ekle
4. `src/screens/CheckoutAndPackingScreen.tsx` - Tutorial overlay ekle
5. `src/screens/LevelResultScreen.tsx` - Tutorial tamamlama kontrolü

## 🎨 Görsel Gereksinimler

### Bibi Karakteri:
- Logo'dan extract edilecek veya mevcut `bibi-character.png` kullanılacak
- Animasyonlar için farklı pozisyonlar:
  - Idle (durma)
  - Pointing (işaret etme)
  - Thumbs-up (başarı)
  - Waving (el sallama)
  - Running (koşma)

### Konuşma Balonu:
- Beyaz arka plan
- Mavi border
- Ok (arrow) Bibi'ye doğru
- Animasyonlu görünüm (fade-in, scale)

## ✅ Avantajlar

1. **Modüler Yapı:** Her component ayrı, kolay bakım
2. **Genişletilebilir:** Yeni tutorial adımları kolayca eklenebilir
3. **Performanslı:** Sadece gerektiğinde render
4. **Kullanıcı Dostu:** Skip butonu ile atlanabilir
5. **Türkçe Destek:** Tüm metinler Türkçe

## ⚠️ Dikkat Edilmesi Gerekenler

1. **Performance:** Overlay çok fazla render etmemeli
2. **Navigation:** Tutorial sırasında navigation kontrolü
3. **State Management:** Tutorial state'i doğru yönetilmeli
4. **Animasyonlar:** Smooth animasyonlar için `react-native-reanimated` kullanılabilir
5. **Accessibility:** Screen reader desteği (opsiyonel)

## 🚀 Uygulama Adımları

1. ✅ Bibi karakteri extract et/optimize et
2. ✅ BibiCharacter component oluştur
3. ✅ BibiSpeechBubble component oluştur
4. ✅ TutorialOverlay component oluştur
5. ✅ Tutorial state'i GameContext'e ekle
6. ✅ Tutorial adımları verisini oluştur
7. ✅ OrderScreen'e tutorial ekle
8. ✅ GamePlayScreen'e tutorial ekle
9. ✅ Level 1 tamamlanma kontrolü
10. ✅ Test ve iyileştirme

## 📝 Sonuç

Bu plan ile:
- ✅ Bibi karakteri logo'dan birebir aynı olacak
- ✅ Sadece ilk oynayanlar görecek
- ✅ Level 1 tamamlanana kadar yardım edecek
- ✅ Örnek ekranlardaki gibi interaktif olacak
- ✅ Modüler ve genişletilebilir yapı

**Onayınızı aldıktan sonra implementasyona başlayabiliriz!** 🎮

