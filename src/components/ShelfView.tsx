import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import type { ShelfDefinition } from '../data/products';
import { buildOrderKey } from '../data/products';
import { ShelfProductCard } from './ProductCard';

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
}

// Raf içeriğini grid formatında gösteriyoruz. Basit placeholder kartlar yeterli.
export const ShelfView: React.FC<ShelfViewProps> = ({
  shelf,
  requiredMap,
  collectedMap,
  onSelect,
  disabledKeys,
  highlightKeys,
  wrongSelectionKey,
  showTitle = true,
  interactionDisabled = false
}) => {
  return (
    <View style={styles.container}>
      {showTitle ? <Text style={styles.title}>{shelf.title}</Text> : null}
      <FlatList
        data={shelf.variants}
        keyExtractor={(item) => buildOrderKey(item.productId, item.brandId)}
        renderItem={({ item }) => {
          const key = buildOrderKey(item.productId, item.brandId);
          const required = requiredMap[key] ?? 0;
          const collected = collectedMap[key] ?? 0;
          const disabled = disabledKeys?.has(key) ?? false;
          const highlight = highlightKeys?.has(key) ?? false;
          return (
            <View style={styles.item}>
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
                    : () => {
                        onSelect(key);
                      }
                }
              />
            </View>
          );
        }}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 24,
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 10,
    textAlign: 'left'
  },
  listContent: {
    paddingBottom: 32,
    gap: 10
  },
  columnWrapper: {
    gap: 10,
    justifyContent: 'space-between'
  },
  item: {
    flex: 1,
    minWidth: 0
  }
});

