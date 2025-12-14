# ACİL: API Key Değiştirme

## Durum

EAS hala **yanlış API key'i** (MDM259FM2K) kullanıyor. Key EAS sunucularında saklanıyor, bu yüzden yerel cache temizleme işe yaramadı.

## Çözüm: İşlemi Durdurup Environment Variable Kullanın

### Adım 1: İşlemi Durdurun

Terminal'de:
- **Ctrl + C** tuşlarına basın
- İşlem durdurulacak

### Adım 2: Doğru Key ile Tekrar Başlatın

Terminal'de **tam olarak şu komutları** çalıştırın:

```bash
export APP_STORE_CONNECT_API_KEY_ID=LS6J5L9QM2
export APP_STORE_CONNECT_ISSUER_ID=c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe
export APP_STORE_CONNECT_API_KEY_PATH=/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8

eas submit --platform ios --latest
```

### Adım 3: Kontrol Edin

Terminal çıktısında şunu görmelisiniz:
```
Using Api Key ID: LS6J5L9QM2
```

Eğer hala `MDM259FM2K` görüyorsanız, environment variable'ları kontrol edin.

## Alternatif: Hazır Script Kullanın

Daha kolay için hazır script:

```bash
./submit_with_correct_key.sh
```

## Önemli Notlar

- Environment variable'lar sadece o terminal oturumu için geçerlidir
- Her yeni terminal açtığınızda tekrar export etmeniz gerekir
- Script kullanırsanız, script içinde export edilmiş olur

## Eğer Hala Çalışmazsa

1. EAS credentials'ı tamamen silin:
   ```bash
   eas credentials
   ```
   Sonra iOS > App Store Connect API Key > Remove

2. Sonra environment variable ile tekrar deneyin

