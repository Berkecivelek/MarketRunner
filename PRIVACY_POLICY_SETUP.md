# Privacy Policy URL Ekleme - Adım Adım Rehber

## Yöntem 1: GitHub Pages (Önerilen - Ücretsiz)

### Adım 1: GitHub Repository'yi Hazırlayın

1. GitHub'da yeni bir repository oluşturun (veya mevcut MarketRunner repository'nizi kullanın)
2. Repository'yi **public** yapın (Settings > Change visibility > Make public)

### Adım 2: Privacy Policy HTML Dosyasını Yükleyin

1. `PRIVACY_POLICY.html` dosyasını repository'nize yükleyin
2. Dosyayı repository'nin ana dizinine (root) koyun
3. Commit ve push yapın

### Adım 3: GitHub Pages'i Aktifleştirin

1. GitHub repository'nizde **Settings** sekmesine gidin
2. Sol menüden **Pages** seçeneğine tıklayın
3. **Source** bölümünde:
   - Branch: `main` (veya `master`) seçin
   - Folder: `/ (root)` seçin
4. **Save** butonuna tıklayın

### Adım 4: URL'i Alın

1. Birkaç dakika bekleyin (GitHub Pages'in aktif olması için)
2. URL formatı: `https://[kullanıcıadı].github.io/[repository-adı]/PRIVACY_POLICY.html`
   - Örnek: `https://berkecivelek.github.io/MarketRunner/PRIVACY_POLICY.html`
3. URL'i tarayıcıda açarak test edin

### Adım 5: App Store Connect'e Ekleyin

1. App Store Connect'te **App Information** sayfasına gidin
2. **Privacy Policy URL** alanını bulun
3. URL'i yapıştırın
4. **Save** butonuna tıklayın

---

## Yöntem 2: Netlify (Alternatif - Ücretsiz)

### Adım 1: Netlify Hesabı Oluşturun

1. [netlify.com](https://netlify.com) adresine gidin
2. "Sign up" ile GitHub hesabınızla giriş yapın

### Adım 2: Site Oluşturun

1. Netlify dashboard'da **"Add new site"** > **"Deploy manually"** seçin
2. `PRIVACY_POLICY.html` dosyasını sürükle-bırak ile yükleyin
3. Netlify otomatik olarak bir URL oluşturacak

### Adım 3: URL'i Alın

1. Netlify size bir URL verecek: `https://[random-name].netlify.app/PRIVACY_POLICY.html`
2. URL'i tarayıcıda açarak test edin

### Adım 4: App Store Connect'e Ekleyin

1. App Store Connect'te **App Information** sayfasına gidin
2. **Privacy Policy URL** alanına URL'i yapıştırın
3. **Save** butonuna tıklayın

---

## Yöntem 3: Vercel (Alternatif - Ücretsiz)

### Adım 1: Vercel Hesabı Oluşturun

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Proje Oluşturun

1. **"Add New Project"** butonuna tıklayın
2. GitHub repository'nizi seçin
3. **Deploy** butonuna tıklayın

### Adım 3: URL'i Alın

1. Vercel size bir URL verecek: `https://[project-name].vercel.app/PRIVACY_POLICY.html`
2. URL'i tarayıcıda açarak test edin

### Adım 4: App Store Connect'e Ekleyin

1. App Store Connect'te **App Information** sayfasına gidin
2. **Privacy Policy URL** alanına URL'i yapıştırın
3. **Save** butonuna tıklayın

---

## Önemli Notlar

1. **E-posta Adresi**: `PRIVACY_POLICY.html` dosyasındaki `[E-posta adresinizi buraya ekleyin]` kısmını doldurun
2. **Web Sitesi URL**: `[Web sitenizin URL'sini buraya ekleyin]` kısmını doldurun (veya kaldırın)
3. **Test**: URL'i mutlaka tarayıcıda açarak test edin
4. **HTTPS**: URL mutlaka HTTPS ile başlamalı (GitHub Pages, Netlify ve Vercel otomatik HTTPS sağlar)

---

## Hızlı Başlangıç (GitHub Pages)

Eğer GitHub kullanıyorsanız, en hızlı yöntem:

```bash
# 1. Repository'yi clone edin (veya zaten varsa)
cd /Users/berkecenkcivelek/Desktop/MarketRunner

# 2. PRIVACY_POLICY.html dosyasını commit edin
git add PRIVACY_POLICY.html
git commit -m "Add Privacy Policy HTML"
git push origin main

# 3. GitHub'da Settings > Pages > Source: main seçin
# 4. URL'i alın ve App Store Connect'e ekleyin
```

