# App Store Connect API Key Oluşturma Rehberi

## 📋 Adım Adım Yönergeler

### ADIM 1: Terminal'de Seçim Yapın

1. Terminal'de şu anda "[Add a new key]" seçeneğini seçin:
   - Aşağı ok tuşuna basın (↓)
   - "[Add a new key]" seçeneği seçili olmalı
   - **Enter** tuşuna basın

### ADIM 2: App Store Connect'te API Key Oluşturma

#### 2.1. App Store Connect'i Açın

1. Safari'de şu adrese gidin: `https://appstoreconnect.apple.com`
2. Apple ID ile giriş yapın (berkecenkcivelek@gmail.com)
3. "My Apps" sayfasına gidin

#### 2.2. Users and Access Sayfasına Gidin

1. Sağ üst köşede **profil ikonunuza** tıklayın (sağ üstte)
2. Açılan menüden **"Users and Access"** seçeneğine tıklayın
3. Sol menüden **"Keys"** sekmesine tıklayın

#### 2.3. Yeni API Key Oluşturun

1. **"+ (Plus)"** butonuna tıklayın (sağ üstte, "Keys" başlığının yanında)
2. **"Key Name"** alanına bir isim girin:
   - Örnek: `EAS Submit Key` veya `Market Runner Key`
3. **"Access"** bölümünde **"App Manager"** rolünü seçin
   - ✅ "App Manager" seçili olmalı
4. **"Generate"** butonuna tıklayın

#### 2.4. API Key Bilgilerini Kaydedin

**ÖNEMLİ:** Bu bilgileri bir daha göremeyeceksiniz! Mutlaka kaydedin.

1. **Key ID** (10 karakterlik kod) - Kopyalayın ve kaydedin
   - Örnek: `ABC123DEF4`
2. **Issuer ID** (UUID formatında) - Kopyalayın ve kaydedin
   - Örnek: `12345678-1234-1234-1234-123456789012`
3. **Download .p8 file** butonuna tıklayın
   - `.p8` dosyasını indirin
   - Bu dosyayı güvenli bir yere kaydedin (Masaüstüne kaydedebilirsiniz)
   - Dosya adı: `AuthKey_[KEY_ID].p8` şeklinde olacak

4. **"Done"** butonuna tıklayın

### ADIM 3: Terminal'e Bilgileri Girin

Terminal'de EAS size şu bilgileri soracak:

1. **Key ID:**
   - App Store Connect'ten kopyaladığınız Key ID'yi yapıştırın
   - Enter'a basın

2. **Issuer ID:**
   - App Store Connect'ten kopyaladığınız Issuer ID'yi yapıştırın
   - Enter'a basın

3. **Path to .p8 file:**
   - İndirdiğiniz `.p8` dosyasının tam yolunu girin
   - Örnek: `/Users/berkecenkcivelek/Desktop/AuthKey_ABC123DEF4.p8`
   - Veya dosyayı Finder'dan Terminal'e sürükleyip bırakın (otomatik yol yazılır)
   - Enter'a basın

### ADIM 4: Yükleme Tamamlanmasını Bekleyin

1. EAS build'i App Store Connect'e yüklemeye başlayacak
2. Yükleme 5-15 dakika sürebilir
3. "✓ Successfully uploaded to App Store Connect" mesajını görmelisiniz

## ✅ Kontrol Listesi

- [ ] Terminal'de "[Add a new key]" seçeneğini seçtim
- [ ] App Store Connect'te "Users and Access" > "Keys" sayfasına gittim
- [ ] Yeni API key oluşturdum (Key Name: "EAS Submit Key")
- [ ] "App Manager" rolünü seçtim
- [ ] Key ID'yi kopyaladım ve kaydettim
- [ ] Issuer ID'yi kopyaladım ve kaydettim
- [ ] .p8 dosyasını indirdim ve güvenli bir yere kaydettim
- [ ] Terminal'e Key ID'yi girdim
- [ ] Terminal'e Issuer ID'yi girdim
- [ ] Terminal'e .p8 dosyasının yolunu girdim
- [ ] Yükleme tamamlandı

## 🆘 Sorun Giderme

### "Key ID is invalid" Hatası

- Key ID'yi doğru kopyaladığınızdan emin olun
- Boşluk veya özel karakter olmamalı
- 10 karakter olmalı

### "Issuer ID is invalid" Hatası

- Issuer ID'yi doğru kopyaladığınızdan emin
- UUID formatında olmalı (örn: 12345678-1234-1234-1234-123456789012)

### ".p8 file not found" Hatası

- Dosya yolunu doğru yazdığınızdan emin
- Dosya adında boşluk varsa tırnak içine alın: `"/Users/berkecenkcivelek/Desktop/AuthKey ABC123DEF4.p8"`
- Veya dosyayı Finder'dan Terminal'e sürükleyip bırakın

### "Permission denied" Hatası

- API key'in "App Manager" rolüne sahip olduğundan emin olun
- App Store Connect'te key'i kontrol edin

## 📝 Önemli Notlar

1. **.p8 dosyasını güvenli tutun:** Bu dosya bir daha gösterilmeyecek, kaybetmeyin!
2. **Key ID ve Issuer ID'yi kaydedin:** Gelecekte tekrar kullanmanız gerekebilir
3. **API key'i silmeyin:** Eğer silerseniz, yeni bir key oluşturmanız gerekir

## 🎯 Sonraki Adımlar

API key oluşturulduktan ve yükleme tamamlandıktan sonra:

1. App Store Connect > TestFlight sekmesine gidin
2. Build'in işlenmesini bekleyin (5-15 dakika)
3. Build "Ready to Test" durumuna geldiğinde test edebilirsiniz

