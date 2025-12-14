const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Asset dosyaları için doğru ayarlar
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'webp', 'svg');

module.exports = config;
