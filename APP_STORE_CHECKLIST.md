# App Store Yayınlama - Adım Adım Kontrol Listesi

## ✅ Tamamlanan Adımlar

- [x] Apple Developer hesabı aktif
- [x] app.json yapılandırması (Bundle ID: com.berkecivelek.marketrunner)
- [x] Privacy Policy şablonu oluşturuldu
- [x] Terms of Service şablonu oluşturuldu
- [x] Uygulama ikonu hazır (1024x1024)

## 📋 Yapılacaklar (Sırayla)

### 1. Bundle ID Oluşturma (Apple Developer Portal)

**Adımlar:**
1. Safari'de `developer.apple.com` > "Certificates, IDs & Profiles" tıkla
2. Sol menüden "Identifiers" > "+" (yeni ekle) butonu
3. "App IDs" seçeneğini seç > "Continue"
4. **Description**: `Market Runner App`
5. **Bundle ID**: `Explicit` seç > `com.berkecivelek.marketrunner` yaz
6. **Capabilities**: 
   - ✅ App Groups (işaretle)
   - ✅ In-App Purchase (işaretle - abonelik için gerekli)
7. "Continue" > "Register" tıkla

**Kontrol:** Identifiers listesinde `com.berkecivelek.marketrunner` görünmeli

---

### 2. App Store Connect'te Uygulama Oluşturma

**Adımlar:**
1. Safari'de `appstoreconnect.apple.com` > "My Apps" tıkla
2. "+" butonu > "New App" seç
3. Formu doldur:
   - **Platform**: iOS
   - **Name**: `Market Runner`
   - **Primary Language**: Türkçe veya İngilizce
   - **Bundle ID**: `com.berkecivelek.marketrunner` (dropdown'dan seç)
   - **SKU**: `MARKETRUNNER001` (benzersiz bir kod)
   - **User Access**: Full Access
4. "Create" tıkla

**Kontrol:** "My Apps" listesinde "Market Runner" görünmeli

---

### 3. Uygulama Bilgilerini Doldurma

**App Information:**
1. Uygulama sayfasında "App Information" tıkla
2. **Subtitle**: `Çocuklar için eğitici market oyunu` (30 karakter limit)
3. **Category**: 
   - Primary: `Games` > `Puzzle`
   - Secondary: `Education` > `Kids`
4. **Age Rating**: `4+` seç (Kids Category için)
5. "Save" tıkla

**Pricing and Availability:**
1. "Pricing and Availability" tıkla
2. **Price Schedule** bölümünde "Edit" veya "+" butonuna tıkla
3. **Price**: `$1.99` veya `$2.00` seç (tek seferlik satın alma)
4. **Availability**: Tüm ülkeler veya seçili ülkeler
5. "Save" tıkla

**Privacy Policy URL:**
- Şimdilik boş bırakabilirsiniz
- Privacy Policy'i web'de yayınladıktan sonra buraya ekleyin

---

### 4. Abonelik Yapılandırması GEREKMEZ ❌

**ÖNEMLİ:** Tek seferlik satın alma modeli kullandığınız için:
- ❌ In-App Purchase yapılandırmasına **GEREK YOK**
- ❌ Subscription Group oluşturmanıza **GEREK YOK**
- ✅ Sadece uygulama fiyatını ayarlamanız yeterli (Pricing and Availability sayfasında)

---

### 5. Privacy Policy URL Ekleme

**Önce Privacy Policy'i Web'de Yayınlayın:**

**Seçenek 1: GitHub Pages (Ücretsiz)**
1. GitHub repository'nizi public yapın
2. Settings > Pages > Source: `main` branch seç
3. Privacy Policy dosyasını HTML'e çevirin veya Markdown olarak bırakın
4. URL: `https://[kullanıcıadı].github.io/MarketRunner/PRIVACY_POLICY.html`

**Seçenek 2: Netlify/Vercel (Ücretsiz)**
1. Markdown dosyalarını HTML'e çevirin
2. Deploy edin
3. URL'i alın

**Sonra App Store Connect'te Ekleyin:**
1. "App Information" sayfasına git
2. "Privacy Policy URL" alanına URL'i yapıştır
3. "Save" tıkla

---

## ⚠️ Önemli Notlar

1. **Bundle ID**: `com.berkecivelek.marketrunner` - Bu değer hem app.json'da hem de Apple Developer'da aynı olmalı
2. **Privacy Policy**: Mutlaka erişilebilir bir URL olmalı (App Store review için gerekli)
3. **Fiyatlandırma**: Tek seferlik satın alma - $1.99 veya $2.00 (Pricing and Availability sayfasında ayarlanır)
4. **E-posta**: Privacy Policy ve Terms of Service dosyalarındaki `[E-posta adresinizi buraya ekleyin]` kısımlarını doldurun

---

## Sonraki Adımlar (Aşama 3)

Bundle ID ve App Store Connect yapılandırması tamamlandıktan sonra:
- EAS Build kurulumu
- Production build oluşturma
- TestFlight test süreci
- App Store Review'a gönderme

