export interface IAnalyticsService {
  initGA(measurementId: string): void;
  initPixel(pixelId: string): void;
  trackContact(platform: string): void;
  trackProductClick(platform: string, productId: string, productName: string): void;
}
