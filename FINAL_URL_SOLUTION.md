# App Store Connect URL Sorunu - Final Çözüm

## Sorun
App Store Connect URL format hatası veriyor. URL'de `privacy_policy.html` (alt çizgi) görünüyor ama dosya adı `privacy-policy.html` (tire).

## Doğru URL

**Dosya adı:** `privacy-policy.html` (tire ile)

**Doğru URL:**
```
http://berkecivelek.github.io/MarketRunner/privacy-policy.html
```

**ÖNEMLİ:** URL'de **tire (-)** kullanın, alt çizgi (_) değil!

## Adım Adım Çözüm

### 1. URL'i Düzeltin

Privacy Policy URL alanında:
- ❌ YANLIŞ: `privacy_policy.html` (alt çizgi)
- ✅ DOĞRU: `privacy-policy.html` (tire)

### 2. Tam URL'i Yazın

Privacy Policy URL alanına şunu yazın (manuel olarak, kopyala-yapıştır YAPMAYIN):

```
http://berkecivelek.github.io/MarketRunner/privacy-policy.html
```

**Dikkat:**
- `http://` ile başlamalı (https değil)
- `privacy-policy.html` (tire ile, alt çizgi değil)
- Sonunda `/` olmamalı

### 3. Save'e Tıklayın

URL'i yazdıktan sonra Save butonuna tıklayın.

## Alternatif: Sadece Domain

Eğer yukarıdaki çalışmazsa, sadece ana sayfayı deneyin:

```
http://berkecivelek.github.io/MarketRunner/
```

Bu durumda `index.html` Privacy Policy'e yönlendirecek.

## Test

URL'i tarayıcıda test edin:
- ✅ Çalışıyor: `https://berkecivelek.github.io/MarketRunner/privacy-policy.html`
- App Store Connect'te `http://` kullanın (https değil)

