import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { productImages } from '../assets/productImages';
import { buildOrderKey, getProductName, getVariantByKey } from '../data/products';
import { ProductId, PRODUCTS } from '../data/products';
import type { OrderItem } from '../types/level';

interface OrderListProps {
  items: OrderItem[];
  collectedMap?: Record<string, number>;
  showProgress?: boolean;
  title?: string;
  onItemPress?: (item: OrderItem) => void;
}

const toProductId = (id: string): ProductId | null => {
  const normalized = id.replace(/[-\s]/g, '_').toUpperCase();
  if (Object.prototype.hasOwnProperty.call(PRODUCTS, normalized)) {
    return normalized as ProductId;
  }
  return null;
};

// Sipariş listesini gösteren ortak komponent.
export const OrderList: React.FC<OrderListProps> = ({
  items,
  collectedMap,
  showProgress = true,
  title,
  onItemPress
}) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {items.map((item) => {
        const key = buildOrderKey(item.productId, item.brandId);
        const collected = collectedMap?.[key] ?? 0;
        const remaining = Math.max(item.quantity - collected, 0);
        const variant = getVariantByKey(item.productId, item.brandId);
        const name = variant?.displayName ?? getProductName(item.productId, item.brandId);

        const mappedId = toProductId(item.productId);
        const visuals = (mappedId ? productImages[mappedId] : undefined) 
          ?? productImages[item.productId];

        return (
          <TouchableOpacity 
            key={key} 
            style={styles.row} 
            onPress={() => onItemPress?.(item)}
            activeOpacity={onItemPress ? 0.7 : 1}
          >
            <View style={styles.iconPlaceholder}>
              {visuals?.image ? (
                <Image source={visuals.image} style={styles.iconImage} resizeMode="contain" />
              ) : (
                <Text style={styles.iconEmoji}>{visuals?.emojiFallback ?? '📦'}</Text>
              )}
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.meta}>
                {item.quantity} adet
                {variant?.badgeText ? ` · ${variant.badgeText}` : ''}
              </Text>
            </View>
            {showProgress ? (
              <View style={styles.progress}>
                <Text style={styles.progressText}>
                  {collected}/{item.quantity}
                </Text>
                {remaining === 0 ? <Text style={styles.doneLabel}>Hazır</Text> : null}
              </View>
            ) : (
              <Text style={styles.quantity}>{item.quantity}x</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#BFDBFE'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    width: 32,
    height: 32
  },
  iconEmoji: {
    fontSize: 24
  },
  details: {
    flex: 1
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  meta: {
    fontSize: 11,
    color: '#CBD5F5'
  },
  progress: {
    alignItems: 'flex-end'
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  doneLabel: {
    marginTop: 1,
    fontSize: 9,
    fontWeight: '700',
    color: '#34D399',
    textTransform: 'uppercase'
  },
  quantity: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F8FAFC'
  }
});

