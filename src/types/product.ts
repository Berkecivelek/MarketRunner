export type ProductCategory =
  | 'dairy'
  | 'produce'
  | 'beverage'
  | 'pantry'
  | 'electronics'
  | 'butcher';

export interface ProductBrand {
  id: string;
  name: string;
  accentColor: string;
  shortCode?: string;
}

export interface ProductDefinition {
  id: string;
  name: string;
  category: ProductCategory;
  baseColor: string;
  icon?: string;
  shelfTitle: string;
  brands?: ProductBrand[];
}

export interface ProductVariant {
  productId: string;
  brandId?: string;
  displayName: string;
  color: string;
  icon?: string;
  shelfTitle: string;
  badgeText?: string;
}

