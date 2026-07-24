import { Product, ProductLayout, IProductRepository } from "@/types/product";
import { products } from "@/data/products";

class ProductService implements IProductRepository {
  private static instance: ProductService;
  private readonly products: Product[];

  private constructor() {
    this.products = products;
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public getAllProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  public getProductLayout(id: string, isReel: boolean = true): ProductLayout {
    if (isReel) {
      switch (id) {
        case "ownly-cardholder":
          return { height: "30vh", aspect: "aspect-[272/218]" };
        case "ownly-bag":
          return { height: "35vh", aspect: "aspect-square" };
        case "mooniver-bag":
          return { height: "36vh", aspect: "aspect-square" };
        case "lunaline-bag":
          return { height: "33vh", aspect: "aspect-[508/286]" };
        case "layer-bow-charm":
          return { height: "30vh", aspect: "aspect-[351/266]" };
        default:
          return { height: "35vh", aspect: "aspect-square" };
      }
    } else {
      switch (id) {
        case "ownly-cardholder":
          return { height: "34vh", aspect: "aspect-[272/218]" };
        case "ownly-bag":
          return { height: "48vh", aspect: "aspect-square" };
        case "mooniver-bag":
          return { height: "53vh", aspect: "aspect-square" };
        case "lunaline-bag":
          return { height: "40vh", aspect: "aspect-[508/286]" };
        case "layer-bow-charm":
          return { height: "34vh", aspect: "aspect-[351/266]" };
        default:
          return { height: "50vh", aspect: "aspect-square" };
      }
    }
  }

  public isInteractive(id: string): boolean {
    return id === "mooniver-bag" || id === "lunaline-bag";
  }
}

export const productService = ProductService.getInstance();
