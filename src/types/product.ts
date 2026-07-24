export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
  additionalImages?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  priceVi: string;
  priceEn: string;
  image: string;
  dimensions: string;
  descriptionVi: string;
  descriptionEn: string;
  sloganVi: string;
  sloganEn: string;
  materialVi: string;
  materialEn: string;
  isOutOfStock?: boolean;
  colorVariants?: ColorVariant[];
  additionalImages?: string[];
}

export interface ProductLayout {
  height: string;
  aspect: string;
}

export interface IProductRepository {
  getAllProducts(): Product[];
  getProductById(id: string): Product | null;
  getProductLayout(id: string, isReel?: boolean): ProductLayout;
  isInteractive(id: string): boolean;
}
