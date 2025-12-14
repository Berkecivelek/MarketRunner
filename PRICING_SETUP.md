# App Store Fiyatlandırma Ayarları - Market Runner

## Tek Seferlik Satın Alma Modeli

Uygulamanız **tek seferlik satın alınabilir** olacak şekilde yapılandırılıyor. Fiyat: **$1.99** (2 dolar)

## Pricing and Availability Sayfasında Yapılacaklar

### 1. Fiyat Ayarlama

**Adımlar:**
1. App Store Connect'te "Pricing and Availability" sayfasındasınız (şu anki ekran)
2. **Price Schedule** bölümünde "Edit" veya "+" butonuna tıklayın
3. **Price** dropdown menüsünden **$1.99** seçin
   - Eğer $1.99 yoksa, en yakın fiyatı seçin ($1.99 veya $2.00)
4. **Availability** bölümünde:
   - Tüm ülkeleri seçebilirsiniz
   - Veya belirli ülkeleri seçebilirsiniz
5. **Save** butonuna tıklayın

### 2. Abonelik Yapılandırması GEREKMEZ

Tek seferlik satın alma modeli kullandığınız için:
- ❌ In-App Purchase yapılandırmasına **GEREK YOK**
- ❌ Subscription Group oluşturmanıza **GEREK YOK**
- ✅ Sadece uygulama fiyatını ayarlamanız yeterli

### 3. Tax Category

**Tax Category** bölümünde:
- "Category: App Store software" seçeneği doğru
- Eğer değiştirmek isterseniz "Edit" butonuna tıklayın

### 4. Apple Silicon Mac Desteği

**iPhone and iPad Apps on Apple Silicon Macs** bölümü:
- "Make this app available" checkbox'ı işaretli kalabilir
- Bu, uygulamanızın Mac'te de çalışmasını sağlar (opsiyonel)

## Önemli Notlar

1. **Fiyat Değişikliği**: Fiyatı daha sonra değiştirebilirsiniz, ancak mevcut kullanıcılar etkilenmez
2. **Ülke Bazlı Fiyatlandırma**: Apple otomatik olarak diğer ülkeler için uygun fiyatları belirler
3. **Vergi**: Apple otomatik olarak vergi hesaplar ve ekler

## Sonraki Adımlar

Fiyat ayarlandıktan sonra:
1. ✅ App Information sayfasını kontrol edin (Subtitle, Category, Age Rating)
2. ✅ Privacy Policy URL ekleyin (gerekli)
3. ✅ Ekran görüntüleri hazırlayın
4. ✅ Build yükleyin (EAS Build ile)
5. ✅ App Store Review'a gönderin

