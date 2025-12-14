# API Key Değiştirme - Acil Çözüm

## Sorun

EAS hala eski API key'i (MDM259FM2K) kullanıyor çünkü key EAS sunucularında saklanıyor.

## Çözüm: İşlemi Durdurup Key'i Değiştirin

### Adım 1: Mevcut İşlemi Durdurun

Terminal'de:
- **Ctrl + C** tuşlarına basın
- İşlem durdurulacak

### Adım 2: EAS Credentials Manager'ı Kullanın

Terminal'de şu komutu çalıştırın:

```bash
eas credentials
```

### Adım 3: iOS Credentials'ı Seçin

1. Terminal'de "iOS" seçeneğini seçin
2. "App Store Connect API Key" seçeneğini seçin
3. "Remove existing credentials" veya "Update credentials" seçeneğini seçin
4. Yeni key bilgilerini girin

### Alternatif Çözüm: Environment Variable Kullanın

Eğer credentials manager çalışmazsa, environment variable kullanabilirsiniz:

```bash
export APP_STORE_CONNECT_API_KEY_ID=LS6J5L9QM2
export APP_STORE_CONNECT_ISSUER_ID=c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe
export APP_STORE_CONNECT_API_KEY_PATH=/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8

eas submit --platform ios --latest
```

## En Hızlı Çözüm

1. **Ctrl + C** ile işlemi durdurun
2. Terminal'de şu komutları çalıştırın:

```bash
export APP_STORE_CONNECT_API_KEY_ID=LS6J5L9QM2
export APP_STORE_CONNECT_ISSUER_ID=c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe
export APP_STORE_CONNECT_API_KEY_PATH=/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8

eas submit --platform ios --latest
```

Bu şekilde EAS environment variable'ları kullanacak ve doğru key'i seçecek.

