import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent
} from 'react-native';

import { productImages } from '../assets/productImages';
import { PRODUCTS, type ProductId } from '../data/products';
import type { ProductVariant } from '../types/product';

const toProductId = (variantId: string): ProductId | null => {
  const normalized = variantId.replace(/[-\s]/g, '_').toUpperCase();
  if (Object.prototype.hasOwnProperty.call(PRODUCTS, normalized)) {
    return normalized as ProductId;
  }
  return null;
};

export interface ProductCardProps {
  productId: ProductId;
  onPress?: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ productId, onPress }) => {
  const product = PRODUCTS[productId];
  // Try exact match first, then normalization fallback if needed
  const visuals = productImages[productId] ?? productImages[toProductId(productId) ?? ''];

  const content = visuals?.image ? (
    <Image source={visuals.image} style={simpleStyles.image} resizeMode="contain" />
  ) : (
    <Text style={simpleStyles.emoji}>{visuals?.emojiFallback ?? '🛒'}</Text>
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [simpleStyles.card, pressed && simpleStyles.pressed]}
    >
      <View style={simpleStyles.imageWrapper}>{content}</View>
      <Text style={simpleStyles.name}>{product?.name ?? productId}</Text>
      <Text style={simpleStyles.category}>{product?.category ?? ''}</Text>
    </Pressable>
  );
};

const simpleStyles = StyleSheet.create({
  card: {
    width: 92,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#10172A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9
  },
  imageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  emoji: {
    fontSize: 28
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center'
  },
  category: {
    fontSize: 10,
    color: '#9CA3AF'
  }
});

export interface ShelfProductCardProps {
  variant: ProductVariant;
  requiredCount: number;
  collectedCount: number;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  highlight?: boolean;
  showRemaining?: boolean;
  triggerShake?: boolean;
}

// Ürünleri temsil eden raf kartı (mevcut gameplay akışında kullanılıyor).
export const ShelfProductCard: FC<ShelfProductCardProps> = ({
  variant,
  requiredCount,
  collectedCount,
  onPress,
  disabled = false,
  highlight = false,
  showRemaining = true,
  triggerShake = false
}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const mappedProductId = toProductId(variant.productId);
  
  // Try mapped ID first, then raw variant ID
  const visuals = (mappedProductId ? productImages[mappedProductId] : undefined) 
    ?? productImages[variant.productId];
    
  const mappedProduct = mappedProductId ? PRODUCTS[mappedProductId] : undefined;

  useEffect(() => {
    if (triggerShake) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true })
      ]).start();
    }
  }, [shakeAnim, triggerShake]);

  const remaining = Math.max(requiredCount - collectedCount, 0);
  const fulfilled = remaining === 0 && requiredCount > 0;

  return (
    <Pressable disabled={disabled || fulfilled} onPress={onPress} style={{ flex: 1 }}>
      <Animated.View
        style={[
          shelfStyles.card,
          {
            opacity: disabled ? 0.5 : 1,
            backgroundColor: highlight ? '#1E3A8A' : '#111827',
            transform: [{ translateX: shakeAnim }]
          }
        ]}
      >
        <View style={shelfStyles.imageContainer}>
          {visuals?.image ? (
            <Image source={visuals.image} style={shelfStyles.image} resizeMode="contain" />
          ) : visuals?.emojiFallback ? (
            <Text style={shelfStyles.emoji}>{visuals.emojiFallback}</Text>
          ) : (
            <View style={[shelfStyles.colorBlock, { backgroundColor: variant.color }]} />
          )}
        </View>
        <Text style={shelfStyles.name} numberOfLines={2}>
          {mappedProduct?.name ?? variant.displayName}
        </Text>
        <Text style={shelfStyles.category} numberOfLines={1}>
          {variant.shelfTitle}
        </Text>
        {variant.badgeText ? (
          <View style={shelfStyles.badge}>
            <Text style={shelfStyles.badgeText}>{variant.badgeText}</Text>
          </View>
        ) : null}
        {showRemaining ? (
          <View style={shelfStyles.remainingContainer}>
            <Text style={[shelfStyles.remainingText, fulfilled ? shelfStyles.fulfilled : undefined]}>
              {fulfilled ? 'Tamam' : `${remaining} kalan`}
            </Text>
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
};

const shelfStyles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#1F2937',
    minHeight: 112,
    justifyContent: 'space-between'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  emoji: {
    fontSize: 28
  },
  colorBlock: {
    height: 40,
    borderRadius: 10
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  category: {
    fontSize: 10,
    color: '#9CA3AF'
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#312E81',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#C7D2FE'
  },
  remainingContainer: {
    marginTop: 4
  },
  remainingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FBBF24'
  },
  fulfilled: {
    color: '#34D399'
  }
});

