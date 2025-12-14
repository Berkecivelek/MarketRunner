# TestFlight'a Build Yükleme Rehberi

## ✅ Build Başarıyla Tamamlandı

Build linkiniz:
```
https://expo.dev/artifacts/eas/aJv1BRNq5yg39zAEwFNweN.ipa
```

## 📱 App Store Connect'e Build Yükleme

### Yöntem 1: EAS CLI ile Otomatik Yükleme (Önerilen)

```bash
cd ~/Desktop/MarketRunner
eas submit --platform ios --latest
```

Bu komut:
- Son build'i otomatik olarak indirir
- App Store Connect'e yükler
- TestFlight'a ekler

### Yöntem 2: Manuel Yükleme (Transporter ile)

1. **Build'i İndirin:**
   - Tarayıcıda build linkini açın: `https://expo.dev/artifacts/eas/aJv1BRNq5yg39zAEwFNweN.ipa`
   - `.ipa` dosyasını indirin

2. **Transporter Uygulamasını Kullanın:**
   - Mac App Store'dan "Transporter" uygulamasını indirin (ücretsiz)
   - Transporter'ı açın
   - Apple ID ile giriş yapın
   - `.ipa` dosyasını sürükleyip bırakın
   - "Deliver" butonuna tıklayın

3. **Yükleme Tamamlanana Kadar Bekleyin:**
   - Yükleme 5-15 dakika sürebilir
   - Transporter'da "Delivered" yazısını görmelisiniz

## 🧪 TestFlight'ta Test Etme

### 1. App Store Connect'te Build'i Kontrol Edin

1. Safari'de `appstoreconnect.apple.com` adresine gidin
2. "My Apps" > "Market Runner" seçin
3. "TestFlight" sekmesine tıklayın
4. "iOS Builds" bölümünde yeni build'i görmelisiniz
5. Build işlenene kadar bekleyin (5-15 dakika)

### 2. Build Durumunu Kontrol Edin

- **Processing**: Build işleniyor, bekleyin
- **Ready to Test**: Build hazır, test edilebilir
- **Expired**: Build'in süresi dolmuş, yeni build gerekli

### 3. Test Uygulamasını İndirin

1. **TestFlight Uygulaması:**
   - iPhone'unuzda App Store'dan "TestFlight" uygulamasını indirin
   - Apple ID ile giriş yapın

2. **Test Kullanıcısı Ekleme:**
   - App Store Connect > TestFlight > "Internal Testing" veya "External Testing"
   - Kendi e-posta adresinizi ekleyin
   - TestFlight'ta davet e-postası alacaksınız

3. **Uygulamayı Test Edin:**
   - TestFlight uygulamasında "Market Runner" görünecek
   - "Install" butonuna tıklayın
   - Uygulamayı açın ve test edin

## ✅ Çökme Sorunu Kontrolü

### Önceki Sorunlar Düzeltildi:

1. ✅ Native modül güvenliği (expo-speech, expo-av)
2. ✅ SoundManager güvenliği
3. ✅ GameContext güvenliği
4. ✅ Error Boundary eklendi

### Test Edilmesi Gerekenler:

1. **Uygulama Açılıyor mu?**
   - Uygulama başlatıldığında çöküyor mu?
   - Splash screen görünüyor mu?

2. **Ana Menü Çalışıyor mu?**
   - Ana menü ekranı görünüyor mu?
   - Butonlar çalışıyor mu?

3. **Oyun Başlatılıyor mu?**
   - Seviye seçimi çalışıyor mu?
   - Oyun ekranı açılıyor mu?

4. **Ses Özellikleri:**
   - Müzik çalıyor mu? (Çalışmazsa sorun değil - native modül yüklenememiş olabilir)
   - SFX çalıyor mu?
   - Ürün seslendirmesi çalışıyor mu?

## 🐛 Hala Çöküyorsa

### 1. Crash Log'larını Kontrol Edin

1. **TestFlight'ta:**
   - TestFlight uygulamasında "Market Runner" > "View Crash Logs"
   - Son crash log'ları görüntüleyin

2. **App Store Connect'te:**
   - App Store Connect > TestFlight > "Crashes"
   - Crash log'larını indirin ve inceleyin

### 2. Xcode Console Log'larını Kontrol Edin

1. iPhone'unuzu Mac'e bağlayın
2. Xcode'u açın
3. Window > Devices and Simulators
4. Cihazınızı seçin
5. "Open Console" butonuna tıklayın
6. Uygulamayı açın ve crash log'larını görüntüleyin

### 3. Build Log'larını Kontrol Edin

Build log linki:
```
https://expo.dev/accounts/berkecenkcivelek/projects/market-runner/builds/4ed15d5f-3611-4b68-99d2-2175d9472a38
```

## 📋 Sonraki Adımlar

### Eğer Uygulama Çalışıyorsa:

1. ✅ Ekran görüntülerini App Store Connect'e yükleyin
2. ✅ Distribution sayfasındaki tüm bilgileri tamamlayın
3. ✅ "Add for Review" butonuna tıklayın
4. ✅ App Store Review sürecini başlatın

### Eğer Hala Çöküyorsa:

1. Crash log'larını paylaşın
2. Hata mesajlarını paylaşın
3. Yeni düzeltmeler yapacağız

## 🎯 Hızlı Komutlar

```bash
# Build'i App Store Connect'e yükle
eas submit --platform ios --latest

# Build durumunu kontrol et
eas build:list --platform ios

# Yeni build al (gerekirse)
eas build --platform ios --profile production
```

