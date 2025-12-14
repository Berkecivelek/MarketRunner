# Temiz Başlangıç - TestFlight'a Yükleme Rehberi

## 🎯 Hedefimiz

1. Uygulamayı TestFlight'a yüklemek
2. Uygulamanın çökmeden çalışmasını sağlamak

## ✅ Adım 1: Terminal'i Temizleyin

1. Terminal'de **Ctrl + C** tuşlarına basın (tüm işlemleri durdurun)
2. Terminal'i kapatıp yeniden açın (veya `clear` komutu ile temizleyin)

## ✅ Adım 2: En Basit Yol - Mevcut Key ile Submit Edin

Eğer tüm key'ler aynı Apple Developer hesabına aitse, hangi key kullanılırsa kullanılsın çalışır. Önemli olan uygulamanın çökmeden çalışması.

### Basit Submit Komutu:

```bash
cd ~/Desktop/MarketRunner
eas submit --platform ios --latest
```

Bu komut:
- Son build'i bulacak
- Mevcut key'lerden birini kullanacak
- App Store Connect'e yükleyecek

## ✅ Adım 3: TestFlight'ta Test Edin

1. App Store Connect > TestFlight sekmesine gidin
2. Build'in işlenmesini bekleyin (5-15 dakika)
3. iPhone'unuzda TestFlight uygulamasını açın
4. Uygulamayı test edin

## 🐛 Eğer Uygulama Çöküyorsa

Daha önce yaptığımız düzeltmeler (native module güvenliği, error boundary) build'de olmalı. Eğer hala çöküyorsa:

1. TestFlight crash log'larını kontrol edin
2. Hata mesajını paylaşın
3. Birlikte düzeltelim

## 📋 Hızlı Komutlar

```bash
# Terminal'i temizle
clear

# Submit et (en basit yol)
eas submit --platform ios --latest

# Build durumunu kontrol et
eas build:list --platform ios
```

## ⚠️ Önemli Not

API key sorunu şu an için ikincil. Önemli olan:
1. ✅ Uygulamanın TestFlight'a yüklenmesi
2. ✅ Uygulamanın çökmeden çalışması

Key sorununu daha sonra çözebiliriz. Şimdi önce uygulamanın çalıştığından emin olalım.

