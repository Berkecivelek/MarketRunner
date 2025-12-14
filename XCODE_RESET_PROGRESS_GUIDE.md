# Xcode Üzerinden Level 1'i Sıfırlama Rehberi 🔄

## 🎯 Sorun
Xcode'da build aldığınızda Level 1 zaten tamamlanmış görünüyor ve Bibi tutorial görünmüyor.

## ✅ Çözüm: Xcode Üzerinden Sıfırlama

### Yöntem 1: iOS Simulator'da Uygulamayı Silme (En Kolay)

#### Adım 1: Simulator'ı Açın
1. Xcode'da **Product > Destination** menüsünden bir simulator seçin
2. Veya **Window > Devices and Simulators** (Shift + Cmd + 2)

#### Adım 2: Uygulamayı Silin
1. Simulator'da **Home** butonuna basın (veya Cmd + Shift + H)
2. Uygulamayı bulun (Market Runner)
3. Uzun basın (long press) veya **Option + Click**
4. Uygulama ikonunda **X** işareti görünecek
5. **X**'e tıklayın
6. **Delete** butonuna tıklayın

#### Adım 3: Yeniden Build Alın
1. Xcode'da **Product > Run** (Cmd + R)
2. Uygulama yeniden yüklenecek ve sıfırdan başlayacak

---

### Yöntem 2: Simulator'ı Tamamen Sıfırlama (Daha Kapsamlı)

#### Adım 1: Simulator'ı Kapatın
1. Xcode'da **Product > Stop** (Cmd + .)
2. Simulator'ı kapatın

#### Adım 2: Simulator'ı Sıfırlayın
1. **Xcode > Window > Devices and Simulators** (Shift + Cmd + 2)
2. Sol panelde **Simulators** sekmesine tıklayın
3. Kullandığınız simulator'ı seçin (örn: iPhone 15 Pro)
4. Sağ tıklayın veya **Edit** butonuna tıklayın
5. **Erase All Content and Settings** seçeneğini seçin
6. Onaylayın

#### Adım 3: Yeniden Build Alın
1. Xcode'da **Product > Run** (Cmd + R)
2. Uygulama sıfırdan başlayacak

---

### Yöntem 3: Uygulama İçinden Reset (En Pratik)

#### Adım 1: Uygulamayı Açın
1. Xcode'da **Product > Run** (Cmd + R)
2. Uygulama açıldığında **Settings** ekranına gidin

#### Adım 2: Reset Progress Butonunu Bulun
1. Settings ekranında **"Reset Progress"** veya **"İlerlemeyi Sıfırla"** butonunu bulun
2. Butona tıklayın
3. Onaylayın

#### Adım 3: Level 1'e Gidin
1. Main Menu'ye dönün
2. **Play** butonuna tıklayın
3. **Level 1**'i seçin
4. Bibi tutorial görünmeli!

---

## 🎮 Bibi Tutorial'ı Görmek İçin

### Kontrol Listesi:
- ✅ Level 1 tamamlanmamış olmalı
- ✅ Tutorial tamamlanmamış olmalı
- ✅ Uygulama sıfırdan başlamalı

### Test Adımları:
1. **Main Menu** → **Play** → **Level 1**
2. **OrderScreen**'de Bibi karakteri görünmeli
3. **"MERHABA! BEN BİBİ, SENİN MARKET REHBERİN!"** mesajı görünmeli
4. Tutorial adımlarını takip edin

---

## ⚠️ Önemli Notlar

### Simulator'da Uygulama Silme:
- Uygulamayı silmek tüm kayıtlı verileri (AsyncStorage) siler
- Bu, Level 1'in sıfırdan başlamasını sağlar
- Bibi tutorial görünecektir

### Simulator Sıfırlama:
- Tüm simulator verilerini siler
- Daha kapsamlı bir temizlik
- Tüm uygulamalar silinir

### Uygulama İçi Reset:
- Sadece oyun verilerini siler
- Simulator'ı etkilemez
- En pratik yöntem

---

## 🚀 Hızlı Çözüm (Önerilen)

**En kolay yol:**
1. Simulator'da uygulamayı silin (Yöntem 1)
2. Xcode'da **Product > Run** (Cmd + R)
3. Level 1'e gidin → Bibi tutorial görünmeli!

---

## 📱 Alternatif: TestFlight'ta Test

Eğer TestFlight'ta test ediyorsanız:
1. TestFlight uygulamasında **Market Runner**'ı bulun
2. Uygulamayı silin
3. Yeniden yükleyin
4. Sıfırdan başlayacak

---

## ✅ Sonuç

**Xcode üzerinden sıfırlama için:**
- ✅ Simulator'da uygulamayı silin (En kolay)
- ✅ Veya Simulator'ı tamamen sıfırlayın (Daha kapsamlı)
- ✅ Veya uygulama içinden Reset Progress butonunu kullanın (En pratik)

**Bibi tutorial'ı görmek için:**
- ✅ Level 1 tamamlanmamış olmalı
- ✅ Uygulama sıfırdan başlamalı

🎮 **İyi testler!**

