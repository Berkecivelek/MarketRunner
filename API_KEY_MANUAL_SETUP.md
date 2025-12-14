# API Key'i Manuel Olarak Ekleme Rehberi

## Sorun

`eas.json` dosyasına API key bilgilerini eklemek çalışmadı çünkü `ascApiIssuer` alanı desteklenmiyor.

## Çözüm: EAS Interactive Mode Kullanın

EAS'ın interactive mode'unda key bilgilerini manuel olarak gireceğiz.

## Adım Adım Yönergeler

### 1. Terminal'de Komutu Çalıştırın

```bash
cd ~/Desktop/MarketRunner
eas submit --platform ios --latest
```

### 2. Key Seçimi Ekranında

Terminal'de şu soru görünecek:
```
? Select the App Store Connect Api Key to use for your project:
```

**"[Add a new key]"** seçeneğini seçin:
- Aşağı ok tuşuna (↓) basın
- "[Add a new key]" seçili olmalı
- **Enter** tuşuna basın

### 3. Key ID Girin

Terminal'de şu soru görünecek:
```
? Key ID:
```

Şunu yazın:
```
LS6J5L9QM2
```
Enter'a basın.

### 4. Issuer ID Girin

Terminal'de şu soru görünecek:
```
? Issuer ID:
```

Şunu yazın:
```
c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe
```
Enter'a basın.

### 5. .p8 Dosyası Yolunu Girin

Terminal'de şu soru görünecek:
```
? Path to .p8 file:
```

Şunu yazın:
```
/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8
```
Enter'a basın.

**VEYA** dosyayı Finder'dan Terminal'e sürükleyip bırakın (otomatik yol yazılır).

### 6. Yükleme Başlayacak

EAS build'i App Store Connect'e yüklemeye başlayacak. 5-15 dakika sürebilir.

## Hızlı Kopyala-Yapıştır

Terminal'de her soru geldiğinde:

1. **Key ID:** `LS6J5L9QM2`
2. **Issuer ID:** `c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe`
3. **.p8 dosyası yolu:** `/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8`

## Önemli Notlar

- Cache temizlendi, artık yeni key seçimi yapabileceksiniz
- `eas.json` dosyasından API key bilgileri kaldırıldı (çünkü desteklenmiyor)
- Her seferinde key seçimi yapmanız gerekecek (veya EAS otomatik olarak hatırlayacak)

## Sonraki Adımlar

1. Terminal'de `eas submit --platform ios --latest` komutunu çalıştırın
2. "[Add a new key]" seçeneğini seçin
3. Key bilgilerini girin
4. Yükleme tamamlanmasını bekleyin

