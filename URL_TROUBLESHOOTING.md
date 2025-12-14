# App Store Connect URL Format Hatası - Detaylı Çözüm

## Sorun
App Store Connect "The URL is formatted incorrectly" hatası veriyor, hem HTTPS hem HTTP ile.

## Olası Nedenler ve Çözümler

### Çözüm 1: URL'i Manuel Olarak Yeniden Yazın

Kopyala-yapıştır yerine URL'i manuel olarak yazmayı deneyin:

1. Privacy Policy URL alanını tamamen temizleyin
2. Şu karakterleri tek tek yazın (kopyala-yapıştır YAPMAYIN):
   ```
   http://berkecivelek.github.io/MarketRunner/privacy-policy.html
   ```
3. Save'e tıklayın

### Çözüm 2: URL'deki Özel Karakterleri Kontrol Edin

URL'de şunlar olmamalı:
- ❌ Boşluk
- ❌ Görünmeyen karakterler
- ❌ Türkçe karakterler (ı, ş, ç, ğ, ü, ö)

### Çözüm 3: Daha Kısa URL Deneyin

Belki de path çok uzun. Sadece ana sayfayı deneyin:

```
http://berkecivelek.github.io/MarketRunner/
```

Sonra App Store Connect'te bu URL'i kullanın ve Privacy Policy'i ana sayfada gösterin.

### Çözüm 4: Dosya Adını Değiştirin

Daha kısa bir dosya adı kullanın. Örneğin:
- `privacy.html` (daha kısa)
- `policy.html` (daha kısa)

### Çözüm 5: Farklı Bir Hosting Servisi

Eğer hiçbiri çalışmazsa, alternatif hosting:
- Netlify (ücretsiz)
- Vercel (ücretsiz)
- GitHub Pages farklı bir format

## En Olası Çözüm

App Store Connect bazen URL'lerin sonunda `/` olmasını veya olmamasını tercih edebilir. Şu formatları deneyin:

1. **Sonunda slash ile:**
   ```
   http://berkecivelek.github.io/MarketRunner/privacy-policy.html/
   ```

2. **Sadece domain:**
   ```
   http://berkecivelek.github.io/MarketRunner/
   ```

3. **Küçük harflerle, tire yerine alt çizgi:**
   ```
   http://berkecivelek.github.io/MarketRunner/privacy_policy.html
   ```

## Test Adımları

1. URL'i tarayıcıda açın ve çalıştığını doğrulayın
2. URL'i kopyalayın
3. App Store Connect'te manuel olarak yazın (kopyala-yapıştır yerine)
4. Save'e tıklayın

