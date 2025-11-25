import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { productImages } from '../assets/productImages';
import { PRODUCTS, buildOrderKey, getProductName } from '../data/products';
import type { OrderItem } from '../types/level';
import type { ProductId } from '../data/products';

interface CartBarProps {
  orderItems: OrderItem[];
  collectedMap: Record<string, number>;
  totalCollected: number;
  totalRequired: number;
}

const toProductId = (productId: string) => productId.replace(/[-\s]/g, '_').toUpperCase();

export const CartBar: React.FC<CartBarProps> = ({
  orderItems,
  collectedMap,
  totalCollected,
  totalRequired
}) => {
  const entries = useMemo(
    () =>
      orderItems.map((item) => {
        const key = buildOrderKey(item.productId, item.brandId);
        const collected = collectedMap[key] ?? 0;

        const mappedId = toProductId(item.productId) as ProductId;
        const isKnown = Object.prototype.hasOwnProperty.call(PRODUCTS, mappedId);
        // Prefer legacy product name if available (localized), fallback to PRODUCTS definitions, then raw ID
        const legacyName = getProductName(item.productId, item.brandId);
        const product = isKnown ? PRODUCTS[mappedId] : undefined;
        
        // Try mapped ID first, then raw ID
        const visuals = (isKnown ? productImages[mappedId] : undefined) ?? productImages[item.productId];

        return {
          key,
          required: item.quantity,
          collected,
          name: legacyName !== item.productId ? legacyName : (product?.name ?? item.productId),
          emoji: visuals?.emojiFallback ?? '🛒'
        };
      }),
    [orderItems, collectedMap]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cartIcon}>🛒</Text>
        <Text style={styles.progressText}>
          Sepet: {totalCollected} / {totalRequired}
        </Text>
      </View>
      <View style={styles.itemRow}>
        {entries.map((entry) => (
          <View key={entry.key} style={styles.itemChip}>
            <Text style={styles.itemEmoji}>{entry.emoji}</Text>
            <Text style={styles.itemName} numberOfLines={1}>
              {entry.name}
            </Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>
                {entry.collected}/{entry.required}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1220',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  cartIcon: {
    fontSize: 20
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  itemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  itemChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#111C34',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  itemEmoji: {
    fontSize: 14
  },
  itemName: {
    maxWidth: 100,
    fontSize: 11,
    color: '#E2E8F0'
  },
  countPill: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 9
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#BFDBFE'
  }
});

