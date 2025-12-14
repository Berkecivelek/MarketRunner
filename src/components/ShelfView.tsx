import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { ShelfProductCard } from './ProductCard';
import type { ShelfDefinition } from '../data/products';
import { buildOrderKey } from '../data/products';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ShelfViewProps {
  shelf: ShelfDefinition;
  requiredMap: Record<string, number>;
  collectedMap: Record<string, number>;
  onSelect: (variantKey: string) => void;
  disabledKeys?: Set<string>;
  highlightKeys?: Set<string>;
  wrongSelectionKey?: string | null;
  showTitle?: boolean;
  interactionDisabled?: boolean;
  hidePlanks?: boolean;
}

export const ShelfView: React.FC<ShelfViewProps> = ({
  shelf,
  requiredMap,
  collectedMap,
  onSelect,
  disabledKeys,
  highlightKeys,
  wrongSelectionKey,
  showTitle = true,
  interactionDisabled = false,
  hidePlanks = false
}) => {
  // Tüm reyonlar için mevcut horizontal scroll tasarımı
  return (
    <View style={styles.container}>
      {showTitle ? <Text style={styles.title}>{shelf.title}</Text> : null}
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {shelf.variants.map((item) => {
          const key = buildOrderKey(item.productId, item.brandId);
          
          // ÖNEMLİ: Brand'ları olan ürünler için genel kontrol
          // Eğer brand variant görünüyorsa ama requiredMap'te default variant varsa, default variant'ı kullan
          let required = requiredMap[key] ?? 0;
          let collected = collectedMap[key] ?? 0;
          let actualKey = key; // Tıklanınca kullanılacak key
          
          // Eğer bu variant'ta required yoksa ama default variant'ta varsa, default variant'ı kullan
          if (required === 0) {
            const defaultKey = `${item.productId}__default`;
            const defaultRequired = requiredMap[defaultKey] ?? 0;
            if (defaultRequired > 0) {
              // Bu variant için required ve collected değerlerini default variant'tan al
              required = defaultRequired;
              collected = collectedMap[defaultKey] ?? 0;
              actualKey = defaultKey; // Tıklanınca default key'i kullan
            }
          }
          
          const disabled = disabledKeys?.has(actualKey) ?? false;
          const highlight = highlightKeys?.has(actualKey) ?? false;

          return (
            <View key={key} style={styles.productWrapper}>
              <ShelfProductCard
                variant={item}
                requiredCount={required}
                collectedCount={collected}
                disabled={interactionDisabled || disabled}
                highlight={highlight}
                triggerShake={wrongSelectionKey === key}
                showRemaining={required > 0}
                onPress={
                  interactionDisabled
                    ? undefined
                    : () => onSelect(actualKey)
                }
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 20,
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Horizontal scroll için stiller
  productsContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 15
  },
  productWrapper: {
    width: 100,
    height: 140,
    justifyContent: 'flex-end',
  }
});
