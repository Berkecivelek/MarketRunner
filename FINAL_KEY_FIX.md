# Son Çözüm: EAS Credentials'ı Temizleme

## Sorun

Environment variable'lar çalışmadı çünkü EAS sunucularında saklanan key'i önceliklendiriyor.

## Çözüm: EAS Credentials'ı Tamamen Silin

### Adım 1: Mevcut İşlemi Durdurun

Terminal'de:
- **Ctrl + C** tuşlarına basın

### Adım 2: EAS Credentials Manager'ı Açın

```bash
eas credentials
```

### Adım 3: iOS Credentials'ı Seçin

1. Terminal'de **"iOS"** seçeneğini seçin
2. **"App Store Connect API Key"** seçeneğini seçin
3. **"Remove existing credentials"** veya **"Delete"** seçeneğini seçin
4. Onaylayın

### Adım 4: Yeni Key'i Ekleyin

1. Tekrar **"App Store Connect API Key"** seçeneğini seçin
2. **"Add new"** veya **"Create new"** seçeneğini seçin
3. Key bilgilerini girin:
   - **Key ID:** `LS6J5L9QM2`
   - **Issuer ID:** `c1c074ea-bcb6-40a1-8cf9-fb1857e2bebe`
   - **.p8 file path:** `/Users/berkecenkcivelek/Downloads/AuthKey_LS6J5L9QM2.p8`

### Adım 5: Tekrar Submit Edin

```bash
eas submit --platform ios --latest
```

## Alternatif: EAS Web Dashboard Kullanın

Eğer terminal'de credentials manager çalışmazsa:

1. Tarayıcıda şu adrese gidin:
   ```
   https://expo.dev/accounts/berkecivelek/projects/market-runner/credentials
   ```

2. iOS credentials bölümünde App Store Connect API Key'i bulun

3. Eski key'i silin (MDM259FM2K)

4. Yeni key ekleyin (LS6J5L9QM2)

5. Terminal'de tekrar submit edin

## Önemli Not

Eğer her iki key de aynı Apple Developer hesabına aitse, mevcut işlem tamamlanabilir. Ancak kendi key'inizi kullanmak istiyorsanız yukarıdaki adımları izleyin.

