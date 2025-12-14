# Ekran Görüntüleri Hazırlama Rehberi - Market Runner

## Gereksinimler

App Store için farklı cihaz boyutlarında ekran görüntüleri hazırlamanız gerekiyor:

### iPhone Ekran Görüntüleri (Zorunlu)

1. **iPhone 6.7" (iPhone 14 Pro Max, 15 Pro Max)**
   - Boyut: 1290 x 2796 piksel
   - En az 3 görüntü gerekli

2. **iPhone 6.5" (iPhone 11 Pro Max, XS Max)**
   - Boyut: 1242 x 2688 piksel
   - En az 3 görüntü gerekli

3. **iPhone 5.5" (iPhone 8 Plus)**
   - Boyut: 1242 x 2208 piksel
   - En az 3 görüntü gerekli

### iPad Ekran Görüntüleri (Opsiyonel ama önerilir)

1. **iPad Pro 12.9"**
   - Boyut: 2048 x 2732 piksel
   - En az 3 görüntü

2. **iPad Pro 11"**
   - Boyut: 1668 x 2388 piksel
   - En az 3 görüntü

## Yöntem 1: iOS Simülatör Kullanarak (Önerilen)

### Adım 1: Simülatörü Başlatın

1. Xcode'u açın
2. **Xcode** > **Open Developer Tool** > **Simulator** seçin
3. Veya Terminal'de: `open -a Simulator`

### Adım 2: Uygulamayı Simülatörde Çalıştırın

```bash
cd /Users/berkecenkcivelek/Desktop/MarketRunner
pnpm ios
```

### Adım 3: Simülatör Cihazını Değiştirin

1. Simülatör menüsünde **Device** > **Manage Devices** seçin
2. İstediğiniz cihazı seçin (örn: iPhone 15 Pro Max)
3. Veya Simülatör penceresinde **Device** menüsünden cihaz seçin

### Adım 4: Ekran Görüntüsü Alın

1. Uygulamayı istediğiniz ekrana getirin
2. **Cmd + S** tuşlarına basın (veya **Device** > **Screenshot**)
3. Ekran görüntüsü otomatik olarak masaüstüne kaydedilir
4. Farklı ekranlar için tekrarlayın:
   - Ana menü
   - Oyun ekranı
   - Seviye tamamlama
   - Ayarlar ekranı

### Adım 5: Görüntüleri Düzenleyin (Gerekirse)

1. Görüntüleri Preview veya başka bir editörle açın
2. Gerekirse kırpın veya düzenleyin
3. PNG formatında kaydedin

## Yöntem 2: Gerçek Cihaz Kullanarak

### Adım 1: Cihazı Hazırlayın

1. iPhone veya iPad'inizi Mac'inize bağlayın
2. Uygulamayı cihazda çalıştırın

### Adım 2: Ekran Görüntüsü Alın

1. iPhone'da: **Power + Volume Up** tuşlarına basın
2. iPad'de: **Power + Home** tuşlarına basın
3. Görüntüler **Photos** uygulamasına kaydedilir

### Adım 3: Görüntüleri Mac'e Aktarın

1. **Photos** uygulamasını açın
2. Görüntüleri seçin
3. **File** > **Export** > **Export Unmodified Original**
4. PNG formatında kaydedin

## Yöntem 3: Expo Dev Tools Kullanarak

### Adım 1: Expo Dev Tools'u Açın

1. Uygulamayı çalıştırdıktan sonra terminal'de bir URL görünecek
2. Tarayıcıda `http://localhost:8081` adresine gidin
3. Veya **Cmd + M** (iOS simülatörde) ile menüyü açın

### Adım 2: Ekran Görüntüsü Alın

1. Expo Dev Tools'da **Screenshot** butonuna tıklayın
2. Görüntü otomatik olarak indirilir

## Görüntü İçeriği Önerileri

### 1. Ana Menü Ekranı
- Uygulamanın ana ekranı
- Logo ve başlık görünür olmalı

### 2. Oyun Ekranı
- Aktif oyun ekranı
- Ürünler ve sepet görünür olmalı

### 3. Seviye Tamamlama
- Başarı ekranı
- Puan ve ödüller görünür olmalı

### 4. Ayarlar/Özellikler
- Uygulamanın özelliklerini gösteren ekran

### 5. Eğitici Özellikler
- İngilizce öğrenme özelliği
- Seslendirme özelliği

## Görüntü Formatı ve Boyutları

### Format
- **PNG** formatında olmalı
- **RGB** renk modu
- **24-bit** veya **32-bit** (alpha channel olabilir)

### Boyutlar (Tam Liste)

**iPhone:**
- 6.7": 1290 x 2796 px
- 6.5": 1242 x 2688 px
- 5.5": 1242 x 2208 px

**iPad:**
- 12.9": 2048 x 2732 px
- 11": 1668 x 2388 px

## App Store Connect'e Yükleme

### Adım 1: App Store Connect'e Gidin

1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com) adresine gidin
2. **My Apps** > **Market Runner** seçin
3. **App Store** sekmesine gidin

### Adım 2: Ekran Görüntülerini Yükleyin

1. **App Store** > **iOS App** bölümüne gidin
2. **1.0 Prepare for Submission** altında **App Store** sekmesine tıklayın
3. Her cihaz boyutu için:
   - **Screenshots** bölümünü bulun
   - **+** butonuna tıklayın
   - Görüntüleri sürükle-bırak ile yükleyin
   - En az 3 görüntü yükleyin

### Adım 3: Sıralama

1. Görüntüleri sürükleyerek sıralayın
2. En iyi görüntüleri en üste koyun
3. İlk görüntü App Store'da önizleme olarak görünecek

## Önemli Notlar

1. **Minimum Gereksinim**: En az 1 cihaz boyutu için 3 görüntü gerekli
2. **Maksimum**: Her cihaz boyutu için 10 görüntü yükleyebilirsiniz
3. **Sıralama**: İlk görüntü en önemli - App Store'da önizleme olarak görünür
4. **Kalite**: Yüksek kaliteli, net görüntüler kullanın
5. **İçerik**: Uygulamanın özelliklerini gösteren görüntüler seçin

## Hızlı Başlangıç Komutu

```bash
# iOS Simülatörü başlat ve uygulamayı çalıştır
cd /Users/berkecenkcivelek/Desktop/MarketRunner
pnpm ios

# Simülatörde Cmd + S ile ekran görüntüsü al
# Görüntüler masaüstüne kaydedilir
```

## Sorun Giderme

### Görüntü Boyutu Yanlış
- Simülatörde doğru cihazı seçtiğinizden emin olun
- Görüntüyü kırpmayın, orijinal boyutta kullanın

### Görüntü Yüklenmiyor
- PNG formatında olduğundan emin olun
- Boyutun doğru olduğunu kontrol edin
- Dosya adında özel karakter olmamalı

### Görüntü Kalitesi Düşük
- Simülatörde Retina görüntüleme açık olmalı
- Gerçek cihaz kullanıyorsanız, yüksek kaliteli görüntü alın

