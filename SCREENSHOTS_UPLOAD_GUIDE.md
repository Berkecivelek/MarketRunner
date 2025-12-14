# Ekran Görüntülerini App Store Connect'e Yükleme Rehberi

## ✅ Hazır Ekran Görüntüleri

Ekran görüntüleriniz başarıyla resize edildi ve şu klasörde hazır:
```
/Users/berkecenkcivelek/Desktop/MarketRunner_Screenshots
```

**Boyut:** 1242 x 2688px (iPhone 6.5" - App Store Connect gereksinimlerine uygun)

## 📸 Hangi Ekran Görüntülerini Yüklemelisiniz?

En az 3 ekran görüntüsü yüklemeniz gerekiyor. Önerilen sıralama:

1. **screenshot_00.png** - Ana Menü Ekranı (İlk görüntü)
2. **screenshot_01.png** - Oyun Ekranı (İkinci görüntü)
3. **screenshot_02.png** - Seviye Tamamlama / Başarı Ekranı (Üçüncü görüntü)

İsteğe bağlı olarak daha fazla ekran görüntüsü de ekleyebilirsiniz (maksimum 10).

## 🚀 App Store Connect'e Yükleme Adımları

### Adım 1: App Store Connect'i Açın
1. Safari'de `appstoreconnect.apple.com` adresine gidin
2. "My Apps" > "Market Runner" seçin
3. "Distribution" sekmesine tıklayın
4. "iOS App Version 1.0" altında "App Store" sekmesine tıklayın

### Adım 2: Ekran Görüntülerini Yükleyin

1. **"Previews and Screenshots"** bölümünü bulun
2. **"iPhone"** sekmesinin seçili olduğundan emin olun
3. **"Choose File"** butonuna tıklayın
4. Finder'da şu klasöre gidin:
   ```
   /Users/berkecenkcivelek/Desktop/MarketRunner_Screenshots
   ```
5. **İlk 3 ekran görüntüsünü seçin:**
   - `screenshot_00.png`
   - `screenshot_01.png`
   - `screenshot_02.png`
   
   **Not:** Birden fazla dosya seçmek için:
   - Mac: `Cmd` tuşuna basılı tutarak her dosyaya tıklayın
   - Veya: İlk dosyayı seçin, sonra `Shift` tuşuna basılı tutarak son dosyaya tıklayın

6. **"Open"** butonuna tıklayın

### Adım 3: Yükleme Kontrolü

1. Ekran görüntüleri yüklendikten sonra:
   - "3 of 3 App Previews | 3 of 10 Screenshots" yazısı görünmeli
   - Her ekran görüntüsü küçük önizleme olarak görünmeli
   - Kırmızı hata mesajları kaybolmalı

2. Eğer hala hata varsa:
   - Ekran görüntülerinin boyutlarını kontrol edin (1242 x 2688px olmalı)
   - Dosya formatının PNG olduğundan emin olun

### Adım 4: Kaydetme

1. Sağ üstteki **"Save"** butonuna tıklayın
2. "Saved successfully" mesajı görünmeli
3. Kırmızı hata kutuları kaybolmalı

## ⚠️ Sorun Giderme

### "The dimensions of one or more screenshots are wrong" Hatası

Eğer hala bu hatayı alıyorsanız:

1. **Dosya boyutlarını kontrol edin:**
   ```bash
   cd ~/Desktop/MarketRunner_Screenshots
   file screenshot_*.png
   ```
   
   Her dosya "1242 x 2688" veya "1284 x 2778" boyutunda olmalı.

2. **Yeniden resize edin:**
   ```bash
   cd ~/Desktop/MarketRunner
   ./resize_screenshots.sh
   ```

### Dosyalar Yüklenmiyor

1. **Tarayıcı cache'ini temizleyin:**
   - Safari: `Cmd + Option + E` (tüm cache'i temizle)
   - Sayfayı yenileyin: `Cmd + R`

2. **Farklı tarayıcı deneyin:**
   - Chrome veya Firefox'ta deneyin

3. **Dosya boyutunu kontrol edin:**
   - Her dosya 10MB'dan küçük olmalı
   - Eğer büyükse, dosya boyutunu küçültün

## 📋 Kontrol Listesi

- [ ] En az 3 ekran görüntüsü yüklendi
- [ ] Ekran görüntüleri 1242 x 2688px boyutunda
- [ ] "Save" butonuna tıklandı
- [ ] Kırmızı hata mesajları kayboldu
- [ ] "Saved successfully" mesajı göründü

## 🎯 Sonraki Adımlar

Ekran görüntüleri yüklendikten sonra:
1. Description, Keywords, Support URL gibi diğer alanları doldurun
2. "Save" butonuna tıklayın
3. Tüm hatalar düzeltildikten sonra "Add for Review" butonuna tıklayabilirsiniz

