# Ekran Görüntüleri Hazırlama - Adım Adım

## Gereksinimler

App Store için en az 3 ekran görüntüsü gerekiyor. Farklı cihaz boyutları için:

### Zorunlu: iPhone 6.7" (iPhone 15 Pro Max)
- Boyut: 1290 x 2796 piksel
- En az 3 görüntü

### Opsiyonel ama önerilir:
- iPhone 6.5": 1242 x 2688 piksel
- iPhone 5.5": 1242 x 2208 piksel

## Adım 1: Simülatörü Başlat

1. Simülatör açıldı (komut çalıştırıldı)
2. Simülatör menüsünde **Device** > **iPhone 15 Pro Max** seçin
   - Veya: **Device** > **Manage Devices** > **iPhone 15 Pro Max** seçin

## Adım 2: Uygulamayı Çalıştır

Terminal'de şu komutu çalıştırın:
```bash
cd /Users/berkecenkcivelek/Desktop/MarketRunner
pnpm ios
```

Uygulama simülatörde açılacak.

## Adım 3: Ekran Görüntüleri Al

### Hangi Ekranlar?

1. **Ana Menü Ekranı**
   - Uygulamanın başlangıç ekranı
   - Logo ve başlık görünür olmalı

2. **Oyun Ekranı**
   - Aktif oyun ekranı
   - Ürünler ve sepet görünür olmalı
   - Oyun içi aksiyon gösterilmeli

3. **Seviye Tamamlama / Başarı Ekranı**
   - Seviye tamamlandığında
   - Puan ve ödüller görünür olmalı

4. **Eğitici Özellikler Ekranı** (opsiyonel)
   - İngilizce öğrenme özelliği
   - Seslendirme özelliği

### Ekran Görüntüsü Nasıl Alınır?

1. Uygulamayı istediğiniz ekrana getirin
2. **Cmd + S** tuşlarına basın
   - Veya: **Device** > **Screenshot** menüsünden
3. Ekran görüntüsü otomatik olarak **masaüstüne** kaydedilir
4. Dosya adı: `Simulator Screen Shot - iPhone 15 Pro Max - [tarih] - [saat].png`

## Adım 4: Görüntüleri Kontrol Edin

1. Masaüstünde ekran görüntülerini bulun
2. Her görüntüyü açın ve kontrol edin:
   - ✅ Net ve kaliteli mi?
   - ✅ İçerik görünür mü?
   - ✅ Uygulamanın özelliklerini gösteriyor mu?

## Adım 5: App Store Connect'e Yükle

1. App Store Connect > My Apps > Market Runner
2. **App Store** sekmesine gidin
3. **1.0 Prepare for Submission** altında **App Store** sekmesine tıklayın
4. **Screenshots** bölümünü bulun
5. Her cihaz boyutu için:
   - **+** butonuna tıklayın
   - Görüntüleri sürükle-bırak ile yükleyin
   - En az 3 görüntü yükleyin
6. Görüntüleri sürükleyerek sıralayın (en iyi görüntü en üste)

## Önemli Notlar

- İlk görüntü App Store'da önizleme olarak görünür
- En az 3 görüntü gerekli
- Her görüntü farklı bir özellik göstermeli
- Yüksek kaliteli, net görüntüler kullanın

## Hızlı Komutlar

```bash
# Simülatörü başlat
open -a Simulator

# Uygulamayı çalıştır
cd /Users/berkecenkcivelek/Desktop/MarketRunner
pnpm ios

# Simülatörde Cmd + S ile ekran görüntüsü al
# Görüntüler masaüstüne kaydedilir
```

