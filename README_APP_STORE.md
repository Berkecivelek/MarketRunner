# App Store Yayınlama - Önemli Notlar

## Tamamlanan Adımlar

### ✅ Aşama 2: Uygulama Yapılandırması

1. **app.json Güncellemeleri**
   - Bundle Identifier: `com.berkecivelek.marketrunner`
   - Version: `1.0.0`
   - Build Number: `1`
   - iOS yapılandırması eklendi
   - Privacy izin açıklamaları eklendi

2. **Privacy Policy ve Terms of Service**
   - `PRIVACY_POLICY.md` - COPPA uyumlu gizlilik politikası oluşturuldu
   - `TERMS_OF_SERVICE.md` - Kullanım koşulları oluşturuldu

3. **Uygulama İkonu**
   - İkon 1024x1024 PNG formatında ✓
   - App Store gereksinimlerini karşılıyor

## Yapılması Gerekenler

### Privacy Policy URL

Privacy Policy ve Terms of Service dosyalarını bir web sitesinde yayınlamanız gerekiyor. Seçenekler:

1. **GitHub Pages** (Ücretsiz)
   - Repository'yi public yapın
   - Settings > Pages > Source: main branch
   - URL: `https://[kullanıcıadı].github.io/MarketRunner/PRIVACY_POLICY.html`

2. **Netlify/Vercel** (Ücretsiz)
   - Markdown dosyalarını HTML'e çevirin
   - Deploy edin

3. **Kendi Web Siteniz**
   - Privacy Policy ve Terms of Service sayfaları oluşturun

**ÖNEMLİ:** Privacy Policy URL'ini aldıktan sonra:
- App Store Connect'te uygulama oluştururken bu URL'i ekleyeceksiniz
- `app.json`'a eklenmesine gerek yok (App Store Connect'te ayarlanır)

### E-posta Adresi

`PRIVACY_POLICY.md` ve `TERMS_OF_SERVICE.md` dosyalarında `[E-posta adresinizi buraya ekleyin]` kısımlarını doldurun.

### Web Sitesi URL'i

`PRIVACY_POLICY.md` ve `TERMS_OF_SERVICE.md` dosyalarında `[Web sitenizin URL'sini buraya ekleyin]` kısımlarını doldurun.

## Sonraki Adımlar

1. Privacy Policy ve Terms of Service'i web'de yayınlayın
2. Aşama 3'e geçin: EAS Build kurulumu
3. App Store Connect'te uygulama oluştururken Privacy Policy URL'ini ekleyin

