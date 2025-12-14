# Xcode Clean Build Checklist ✅

## 🎯 Yapılan Değişiklikler

### 1. **Portakal Suyu Sorunu Düzeltildi**
- `legacyProducts.ts` - Brand'ları olan ürünler için default variant eklendi
- Artık `orange-juice__default` key'i `VARIANT_MAP`'te mevcut
- Level 4'te portakal suyu sepete eklenebilir

### 2. **Bibi Tutorial Düzeltildi**
- `GameContext.tsx` - Tutorial state yönetimi düzeltildi
- `OrderScreen.tsx` - Tutorial overlay düzeltildi
- Debug log'ları eklendi

## ✅ Xcode'da Build Almadan Önce

### Adım 1: Expo Prebuild (Önerilir)
```bash
cd /Users/berkecenkcivelek/Desktop/MarketRunner
expo prebuild --clean --platform ios
```
**Not:** Bu komut native kod değişikliklerini iOS projesine yansıtır.

### Adım 2: Pod Install
```bash
cd ios
pod install
cd ..
```

### Adım 3: Build Number Kontrolü
- `app.json`'da `buildNumber: "4"` var
- Yeni bir build için `5`'e artırabilirsiniz (opsiyonel)
- TestFlight'a yüklüyorsanız artırmanız gerekebilir

## 🚀 Xcode'da Build Alma

### 1. Xcode'u Açın
```bash
open ios/MarketRunner.xcworkspace
```
Veya Finder'dan `ios/MarketRunner.xcworkspace` dosyasını açın.

### 2. Clean Build Folder
- **Product > Clean Build Folder** (Shift + Cmd + K)
- Temizleme tamamlanana kadar bekleyin

### 3. Build Number Kontrolü (Xcode'da)
- Sol panelde proje dosyasına tıklayın
- **TARGETS > MarketRunner** seçin
- **General** sekmesinde **Build** numarasını kontrol edin
- `app.json`'daki `buildNumber` ile eşleşmeli

### 4. Archive Oluşturun
- **Product > Archive** (Cmd + B sonra Archive)
- Archive tamamlanana kadar bekleyin (5-10 dakika)

### 5. Test Edin
- **Organizer** penceresinde **Distribute App** butonuna tıklayın
- **Development** seçeneğini seçin (test için)
- Veya **App Store Connect** seçeneğini seçin (TestFlight için)

## ⚠️ Olası Sorunlar ve Çözümleri

### 1. "Could not compute dependency graph" Hatası
**Çözüm:**
```bash
# Xcode'u kapatın
# Terminal'de:
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ios
rm -rf Pods Podfile.lock .symlinks
pod install
cd ..
# Xcode'u tekrar açın
```

### 2. "You've already submitted this build" Hatası
**Çözüm:**
- `app.json`'da `buildNumber`'ı artırın (4 → 5)
- `expo prebuild --clean --platform ios` çalıştırın
- Tekrar archive yapın

### 3. "Cannot find native module" Hatası
**Çözüm:**
```bash
expo prebuild --clean --platform ios
cd ios && pod install && cd ..
```

### 4. Bibi Tutorial Görünmüyor
**Çözüm:**
- Uygulamayı sıfırdan başlatın (Settings > Reset Progress)
- Veya AsyncStorage'ı temizleyin
- Level 1'e gidin, Bibi görünmeli

## 📱 Test Senaryoları

### Test 1: Bibi Tutorial
1. Uygulamayı sıfırdan başlatın
2. Main Menu > Play > Level 1
3. Bibi karakteri ve konuşma balonu görünmeli
4. "MERHABA! BEN BİBİ, SENİN MARKET REHBERİN!" mesajı görünmeli

### Test 2: Level 4 Portakal Suyu
1. Main Menu > Play > Level 4
2. İçecekler reyonunda portakal suyu görünmeli
3. Portakal suyuna tıklandığında sepete eklenmeli
4. Level tamamlanabilmeli

## ✅ Sonuç

**Evet, clean build folder yapıp build alırsanız sorunsuz çalışmalı!**

Yaptığımız değişiklikler:
- ✅ JavaScript/TypeScript kodları (native kod değişikliği yok)
- ✅ `expo prebuild` ile native projeye yansıtılır
- ✅ Clean build folder yeterli olmalı

**Önerilen Sıra:**
1. `expo prebuild --clean --platform ios` (opsiyonel ama önerilir)
2. `pod install` (opsiyonel ama önerilir)
3. Xcode'da Clean Build Folder
4. Archive
5. Test

🎮 **İyi testler!**

