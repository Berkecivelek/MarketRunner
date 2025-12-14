# Logo Hazırlama Rehberi - Market Runner

## App Store Logo Gereksinimleri

Logo dosyası şu özelliklere sahip olmalı:

- **Boyut**: 1024 x 1024 piksel (tam kare)
- **Format**: PNG
- **Renk Modu**: RGB
- **Arka Plan**: Şeffaf OLMAMALI (düz renk olmalı)
- **Köşeler**: Yuvarlak köşeler OLMAMALI (keskin köşeler)
- **Dosya Adı**: `icon.png` (assets klasöründe)

## Logo Hazırlama Adımları

### Yöntem 1: Görseli Düzenleme (Önerilen)

1. **Görseli açın** (Photoshop, GIMP, Preview veya başka bir editör)
2. **Boyutu ayarlayın**:
   - 1024 x 1024 piksel yapın
   - Oranları koruyun (aspect ratio)
3. **Arka plan ekleyin**:
   - Şeffaf arka plan varsa, düz bir renk ekleyin
   - Önerilen renk: Beyaz veya uygulamanızın ana rengi (#0A0A23 gibi)
4. **Köşeleri kontrol edin**:
   - Yuvarlak köşeler varsa, keskin köşelere çevirin
5. **Kaydedin**:
   - Format: PNG
   - Dosya adı: `icon.png`
   - `assets/icon.png` konumuna kaydedin

### Yöntem 2: Online Araçlar

1. **ResizeImage.net** veya benzeri bir araç kullanın
2. Görseli yükleyin
3. 1024x1024 boyutuna getirin
4. PNG olarak indirin

### Yöntem 3: Terminal Komutları (sips kullanarak)

Eğer görseli hazırladıysanız, terminal'de şu komutları kullanabilirsiniz:

```bash
# Görseli 1024x1024'e resize et
sips -z 1024 1024 [görsel-dosyası.png] --out assets/icon.png

# Arka plan rengi ekle (eğer şeffaf ise)
# Bu işlem için ImageMagick veya başka bir araç gerekebilir
```

## Logo Dosyasını Kontrol Etme

Logo hazır olduktan sonra kontrol edin:

```bash
# Dosya boyutunu kontrol et
file assets/icon.png

# Görsel boyutlarını kontrol et
sips -g pixelWidth -g pixelHeight assets/icon.png
```

## app.json Güncelleme

Logo hazır olduktan sonra `app.json` dosyası zaten doğru yapılandırılmış olmalı:

```json
{
  "expo": {
    "icon": "./assets/icon.png"
  }
}
```

## Önemli Notlar

1. **Logo kalitesi**: Yüksek çözünürlükte olmalı (1024x1024)
2. **Arka plan**: Şeffaf olmamalı (App Store reddeder)
3. **Köşeler**: Yuvarlak köşeler olmamalı (Apple otomatik yuvarlar)
4. **İçerik**: Logo, uygulamanın ne olduğunu temsil etmeli
5. **Renkler**: Parlak ve çekici renkler kullanın

## Sonraki Adımlar

Logo hazır olduktan sonra:
1. `assets/icon.png` dosyasını güncelleyin
2. Uygulamayı yeniden build edin
3. App Store Connect'e yükleyin

