# App Store Connect URL Format Hatası Çözümü

## Sorun
App Store Connect "The URL is formatted incorrectly" hatası veriyor.

## Çözüm 1: HTTP ile Deneyin

App Store Connect bazen HTTPS yerine HTTP bekleyebilir. Şu URL'i deneyin:

```
http://berkecivelek.github.io/MarketRunner/privacy-policy.html
```

**Not:** GitHub Pages otomatik olarak HTTP'yi HTTPS'ye yönlendirir, bu yüzden çalışmalı.

## Çözüm 2: URL Formatını Kontrol Edin

URL'de şunlar olmalı:
- ✅ `http://` veya `https://` ile başlamalı
- ✅ Domain adı (berkecivelek.github.io)
- ✅ Path (/MarketRunner/privacy-policy.html)
- ✅ Toplam 255 karakterden az olmalı

## Çözüm 3: Alternatif Formatlar

Eğer yukarıdaki çalışmazsa, şu formatları deneyin:

1. **HTTP (önerilen):**
   ```
   http://berkecivelek.github.io/MarketRunner/privacy-policy.html
   ```

2. **HTTPS (eğer HTTP çalışmazsa):**
   ```
   https://berkecivelek.github.io/MarketRunner/privacy-policy.html
   ```

3. **Ana sayfa (eğer yukarıdakiler çalışmazsa):**
   ```
   http://berkecivelek.github.io/MarketRunner/
   ```

## Adımlar

1. Privacy Policy URL alanına `http://berkecivelek.github.io/MarketRunner/privacy-policy.html` yazın
2. Save butonuna tıklayın
3. Hata mesajı kaybolmalı

## Önemli Notlar

- GitHub Pages hem HTTP hem HTTPS'yi destekler
- HTTP otomatik olarak HTTPS'ye yönlendirilir
- App Store Connect bazen eski doğrulama kuralları kullanabilir

