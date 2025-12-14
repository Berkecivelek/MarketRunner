# Xcode ile TestFlight'a Yükleme Rehberi

## 🎯 Hedef

Xcode üzerinden direkt build alıp TestFlight'a yüklemek ve çökmeden çalıştığını görmek.

## 📋 Adım Adım Yönergeler

### Adım 1: Xcode'da Projeyi Açın

1. **Xcode'u açın**
2. **File > Open** menüsünden şu klasörü seçin:
   ```
   ~/Desktop/MarketRunner/ios
   ```
   Veya `MarketRunner.xcworkspace` dosyasını açın (varsa)

### Adım 2: Clean Build Folder

1. **Product > Clean Build Folder** menüsüne tıklayın
   - Veya klavye kısayolu: `Shift + Cmd + K`
2. Temizleme işlemi tamamlanana kadar bekleyin

### Adım 3: Build Number'ı Kontrol Edin

1. Sol panelde proje dosyasına tıklayın (mavi ikon)
2. **TARGETS** altında **MarketRunner** seçin
3. **General** sekmesine gidin
4. **Identity** bölümünde **Build** numarasını kontrol edin
   - Şu anda `2` olmalı (az önce artırdık)
   - Eğer `1` ise, `2` yapın

### Adım 4: Archive Oluşturun

1. **Product > Archive** menüsüne tıklayın
   - Veya klavye kısayolu: `Cmd + B` (build) sonra `Product > Archive`
2. Archive işlemi tamamlanana kadar bekleyin (5-10 dakika)
3. Archive tamamlandığında **Organizer** penceresi otomatik açılacak

### Adım 5: TestFlight'a Yükleyin

1. **Organizer** penceresinde (Xcode > Window > Organizer) archive'inizi görün
2. **Distribute App** butonuna tıklayın
3. **App Store Connect** seçeneğini seçin
4. **Upload** seçeneğini seçin
5. **Automatically manage signing** seçeneğini işaretleyin (veya mevcut provisioning profile'ı kullanın)
6. **Next** butonuna tıklayın
7. **Upload** butonuna tıklayın
8. Yükleme tamamlanana kadar bekleyin (5-15 dakika)

### Adım 6: TestFlight'ta Kontrol Edin

1. **App Store Connect** > **TestFlight** sekmesine gidin
2. Build'in işlenmesini bekleyin (5-15 dakika)
3. Build "Ready to Test" durumuna geldiğinde:
   - iPhone'unuzda **TestFlight** uygulamasını açın
   - **Market Runner** uygulamasını bulun
   - **Install** butonuna tıklayın
   - Uygulamayı test edin

## ⚠️ Önemli Notlar

### Build Number Hatası

Eğer "You've already submitted this build" hatası alırsanız:
1. Xcode'da **Build** numarasını artırın (2 → 3)
2. Tekrar **Archive** yapın

### Signing Hatası

Eğer signing hatası alırsanız:
1. **Signing & Capabilities** sekmesine gidin
2. **Team** seçeneğinden Apple Developer hesabınızı seçin
3. **Automatically manage signing** seçeneğini işaretleyin

### Archive Hatası

Eğer archive hatası alırsanız:
1. **Product > Clean Build Folder** yapın
2. **Derived Data** klasörünü temizleyin:
   - Xcode > Preferences > Locations
   - Derived Data yolunu bulun
   - Finder'da klasörü silin
3. Tekrar **Archive** yapın

## 🚀 Hızlı Komutlar

```bash
# Xcode'u açmak için (opsiyonel)
open ~/Desktop/MarketRunner/ios/MarketRunner.xcworkspace

# Veya sadece ios klasörünü açın
open ~/Desktop/MarketRunner/ios
```

## 📱 TestFlight'ta Test Etme

1. **TestFlight** uygulamasını iPhone'unuzda açın
2. **Market Runner** uygulamasını bulun
3. **Install** butonuna tıklayın
4. Uygulamayı açın ve test edin:
   - ✅ Uygulama açılıyor mu?
   - ✅ Ana menü görünüyor mu?
   - ✅ Oyun başlatılabiliyor mu?
   - ✅ Çökme var mı?

## 🐛 Eğer Hala Çöküyorsa

1. **TestFlight** uygulamasında **Market Runner** > **View Crash Logs**
2. Crash log'larını kontrol edin
3. Hata mesajını paylaşın, birlikte düzeltelim

## ✅ Başarı Kriterleri

- ✅ Archive başarıyla oluşturuldu
- ✅ TestFlight'a yüklendi
- ✅ Build işlendi ve "Ready to Test" durumuna geldi
- ✅ Uygulama TestFlight'ta çökmeden çalışıyor

