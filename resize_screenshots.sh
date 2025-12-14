#!/bin/bash

# App Store Connect için ekran görüntülerini resize etme scripti
# Gereken boyut: 1242 x 2688px (iPhone 6.5") veya 1284 x 2778px (iPhone 6.7")

SOURCE_DIR="$HOME/Desktop/adsız klasör"
OUTPUT_DIR="$HOME/Desktop/MarketRunner_Screenshots"

# Çıktı klasörünü oluştur
mkdir -p "$OUTPUT_DIR"

# iPhone 6.5" boyutu (1242 x 2688)
TARGET_WIDTH=1242
TARGET_HEIGHT=2688

echo "Ekran görüntüleri resize ediliyor..."
echo "Kaynak: $SOURCE_DIR"
echo "Hedef: $OUTPUT_DIR"
echo "Hedef boyut: ${TARGET_WIDTH}x${TARGET_HEIGHT}px"
echo ""

# Tüm PNG dosyalarını işle
count=0
for file in "$SOURCE_DIR"/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        output_file="$OUTPUT_DIR/screenshot_$(printf "%02d" $count).png"
        
        echo "İşleniyor: $filename"
        
        # sips ile resize et (aspect ratio korunarak, sonra crop)
        # Önce en uygun boyuta getir
        sips -Z $TARGET_HEIGHT "$file" --out "$output_file" 2>/dev/null
        
        # Eğer genişlik yanlışsa, crop yap
        current_width=$(sips -g pixelWidth "$output_file" 2>/dev/null | grep pixelWidth | awk '{print $2}')
        current_height=$(sips -g pixelHeight "$output_file" 2>/dev/null | grep pixelHeight | awk '{print $2}')
        
        if [ "$current_width" != "$TARGET_WIDTH" ] || [ "$current_height" != "$TARGET_HEIGHT" ]; then
            # Tam boyuta resize et (aspect ratio bozulabilir ama App Store kabul eder)
            sips -z $TARGET_HEIGHT $TARGET_WIDTH "$file" --out "$output_file" 2>/dev/null
        fi
        
        final_width=$(sips -g pixelWidth "$output_file" 2>/dev/null | grep pixelWidth | awk '{print $2}')
        final_height=$(sips -g pixelHeight "$output_file" 2>/dev/null | grep pixelHeight | awk '{print $2}')
        
        echo "  -> $output_file (${final_width}x${final_height}px)"
        count=$((count + 1))
    fi
done

echo ""
echo "Tamamlandı! $count ekran görüntüsü hazırlandı."
echo "Hazır ekran görüntüleri: $OUTPUT_DIR"

