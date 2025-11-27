import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
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
  hidePlanks?: boolean; // Bu artık kullanılmayacak ama backward compatibility için tutuyoruz
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
  return (
    <View style={styles.container}>
      {showTitle ? <Text style={styles.title}>{shelf.title}</Text> : null}
      
      {/* Raf arka planı (çizgiler) tamamen kaldırıldı. */}

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {shelf.variants.map((item) => {
          const key = buildOrderKey(item.productId, item.brandId);
          const required = requiredMap[key] ?? 0;
          const collected = collectedMap[key] ?? 0;
          const disabled = disabledKeys?.has(key) ?? false;
          const highlight = highlightKeys?.has(key) ?? false;

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
                    : () => onSelect(key)
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
    justifyContent: 'center', // Dikey ortala
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
  // shelfBackground ve shelfPlank stilleri kaldırıldı.
  productsContainer: {
    paddingHorizontal: 20,
    alignItems: 'center', // Ürünleri raf hizasında tut
    gap: 15
  },
  productWrapper: {
    width: 100,
    height: 140,
    justifyContent: 'flex-end', // Ürünü rafa oturt
  }
});
