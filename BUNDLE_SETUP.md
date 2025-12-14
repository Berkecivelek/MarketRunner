# JavaScript Bundle Kurulumu

## Sorun
Production build'de "No bundle URL present" hatası alıyorsunuz. Bu, JavaScript bundle'ının Xcode projesine eklenmediği anlamına gelir.

## Çözüm

### 1. Bundle'ı Oluşturun
```bash
npm run bundle:ios
```

veya

```bash
npx react-native bundle --platform ios --dev false --entry-file index.ts --bundle-output ios/MarketRunner/main.jsbundle --assets-dest ios/MarketRunner/
```

### 2. Xcode'da Bundle'ı Ekleyin

1. Xcode'da projeyi açın: `ios/MarketRunner.xcodeproj`
2. Sol panelde `MarketRunner` klasörüne sağ tıklayın
3. "Add Files to MarketRunner..." seçeneğini seçin
4. `ios/MarketRunner/main.jsbundle` dosyasını seçin
5. **ÖNEMLİ:** "Copy items if needed" seçeneğini **KAPALI** bırakın (dosya zaten doğru yerde)
6. "Create groups" seçeneğini seçin
7. "Add" butonuna tıklayın

### 3. Bundle'ın Build'e Dahil Edildiğinden Emin Olun

1. Xcode'da proje ayarlarını açın (sol üstteki proje adına tıklayın)
2. "Build Phases" sekmesine gidin
3. "Copy Bundle Resources" bölümünü genişletin
4. `main.jsbundle` dosyasının listede olduğundan emin olun
5. Eğer yoksa, "+" butonuna tıklayıp ekleyin

### 4. Her Production Build Öncesi

Production build (Archive) almadan önce bundle'ı yeniden oluşturun:

```bash
npm run bundle:ios
```

## Otomatik Bundle Oluşturma (Opsiyonel)

Xcode'da otomatik bundle oluşturma için:

1. Xcode'da proje ayarlarını açın
2. "Build Phases" sekmesine gidin
3. "+" butonuna tıklayıp "New Run Script Phase" seçin
4. Script'i en üste taşıyın (dependencies'den önce)
5. Script içeriğine şunu ekleyin:

```bash
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

Bu, her build'de otomatik olarak bundle oluşturacaktır.

## Test

1. Xcode'da Product > Scheme > Edit Scheme
2. "Run" > "Build Configuration" > "Release" seçin
3. Product > Run (⌘R) ile test edin

Eğer hala hata alıyorsanız, bundle'ın doğru yerde olduğundan emin olun:
```bash
ls -lh ios/MarketRunner/main.jsbundle
```

