# App Store Connect Submission Gereksinimleri

## ✅ Tamamlanan Adımlar

- [x] Ekran görüntüleri yüklendi (6/10)
- [x] Distribution sayfası açıldı

## ⚠️ Eksik Gereksinimler (Kırmızı Hata Mesajları)

### 1. Build Seçimi (EN ÖNEMLİ)

**Hata:** "You must choose a build."

**Çözüm:**
1. Sol menüden **"App Review"** sekmesine tıklayın
2. **"Build"** bölümünde **"Select a build before you submit your app"** yazısını göreceksiniz
3. **"+"** butonuna tıklayın veya mevcut build'i seçin
4. Eğer build yoksa, önce EAS Build ile production build oluşturmanız gerekiyor

**Build Oluşturma:**
```bash
cd ~/Desktop/MarketRunner
eas build --platform ios --profile production
```

### 2. İletişim Bilgileri (Contact Information)

**Hata:** "You must complete the Contact Information section."

**Çözüm:**
1. Sol menüden **"App Review"** sekmesine tıklayın
2. **"Contact Information"** bölümünü bulun
3. Şu bilgileri doldurun:
   - **First Name:** Adınız
   - **Last Name:** Soyadınız
   - **Phone Number:** Telefon numaranız (uluslararası format: +90...)
   - **Email:** E-posta adresiniz

### 3. App Privacy (Gizlilik Bilgileri)

**Hata:** "Before you can submit this app for review, an Admin must provide information about the app's privacy practices in the App Privacy section."

**Çözüm:**
1. Sol menüden **"App Privacy"** sekmesine tıklayın (TRUST & SAFETY altında)
2. **"Get Started"** veya **"Edit"** butonuna tıklayın
3. **"Does your app collect data?"** sorusuna **"NO"** seçin
   - Çünkü MarketRunner uygulaması veri toplamıyor (sadece lokal oyun verileri)
4. **"Save"** butonuna tıklayın

**Not:** Eğer Admin yetkisine sahip değilseniz, hesap sahibinden Admin yetkisi almanız gerekebilir.

### 4. Content Rights Information

**Hata:** "You must set up Content Rights Information in App Information."

**Çözüm:**
1. Sol menüden **"App Information"** sekmesine tıklayın (General altında)
2. **"Content Rights"** bölümünü bulun
3. **"Do you have the rights to use all content in your app?"** sorusuna **"Yes"** seçin
4. **"Save"** butonuna tıklayın

### 5. Promotional Text (Opsiyonel ama Önerilir)

**Durum:** Boş görünüyor

**Çözüm:**
1. Distribution sayfasında **"Promotional Text"** bölümünü bulun
2. Şu metni ekleyin (APP_STORE_DISTRIBUTION_CONTENT_CLEAN.md dosyasından):
   ```
   Çocuklar için eğlenceli ve eğitici market oyunu! Ürünleri topla, siparişleri tamamla ve İngilizce öğren. 4+ yaş için güvenli.
   ```
3. **"Save"** butonuna tıklayın

## 📋 Adım Adım Tamamlama Sırası

### Öncelik 1: Build Oluşturma (EN ÖNEMLİ)

Build olmadan submission yapılamaz. Önce build oluşturmanız gerekiyor:

```bash
# EAS CLI kurulu mu kontrol edin
eas --version

# Eğer yoksa:
npm install -g eas-cli

# EAS'a giriş yapın
eas login

# Build oluşturun
cd ~/Desktop/MarketRunner
eas build --platform ios --profile production
```

**Build süresi:** 15-30 dakika sürebilir.

### Öncelik 2: App Privacy

1. **"App Privacy"** sekmesine gidin
2. **"Does your app collect data?"** → **"NO"** seçin
3. **"Save"** butonuna tıklayın

### Öncelik 3: Contact Information

1. **"App Review"** sekmesine gidin
2. **"Contact Information"** bölümünü doldurun
3. **"Save"** butonuna tıklayın

### Öncelik 4: Content Rights

1. **"App Information"** sekmesine gidin
2. **"Content Rights"** bölümünde **"Yes"** seçin
3. **"Save"** butonuna tıklayın

### Öncelik 5: Build Seçimi

1. Build tamamlandıktan sonra (EAS Build'den bildirim gelecek)
2. **"App Review"** sekmesine gidin
3. **"Build"** bölümünde yeni build'i seçin

## ✅ Tüm Adımlar Tamamlandıktan Sonra

1. Tüm kırmızı hata mesajları kaybolmalı
2. **"Add for Review"** butonu aktif olmalı
3. **"Add for Review"** butonuna tıklayın
4. Son onay ekranında **"Submit"** butonuna tıklayın

## ⏱️ Tahmini Süre

- **Build oluşturma:** 15-30 dakika
- **Diğer bilgileri doldurma:** 5-10 dakika
- **Toplam:** ~30-40 dakika

## 🆘 Sorun Giderme

### "Admin must provide information" Hatası

Eğer Admin yetkisine sahip değilseniz:
1. Apple Developer hesabı sahibine ulaşın
2. App Store Connect'te **"Users and Access"** bölümünden Admin yetkisi isteyin
3. Veya hesap sahibinin bu bilgileri doldurmasını isteyin

### Build Bulunamıyor

1. EAS Build'in tamamlandığından emin olun
2. App Store Connect'te **"TestFlight"** sekmesine gidin
3. Build'in orada göründüğünü kontrol edin
4. Eğer görünmüyorsa, build'i tekrar oluşturun

