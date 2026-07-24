import { IAnalyticsService } from "@/types/analytics";

class AnalyticsService implements IAnalyticsService {
  private static instance: AnalyticsService;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public initGA(measurementId: string): void {
    if (typeof window === "undefined" || !measurementId) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }

  public initPixel(pixelId: string): void {
    if (typeof window === "undefined" || !pixelId) return;
    if (!window.fbq) {
      interface FbqTracker {
        (...args: unknown[]): void;
        callMethod?: (...args: unknown[]) => void;
        queue: unknown[];
        version: string;
      }
      const fbqTracker: FbqTracker = function fbq(...args: unknown[]) {
        if (fbqTracker.callMethod) {
          fbqTracker.callMethod(...args);
        } else {
          fbqTracker.queue.push(args);
        }
      };
      fbqTracker.queue = [];
      fbqTracker.version = "2.0";
      window.fbq = fbqTracker;
    }
    window.fbq?.("init", pixelId);
    window.fbq?.("track", "PageView");
  }

  public trackContact(platform: string): void {
    if (typeof window === "undefined") return;
    window.gtag?.("event", "contact_click", {
      contact_platform: platform,
    });
    window.fbq?.("trackCustom", "ContactClick", {
      platform,
    });
  }

  public trackProductClick(platform: string, productId: string, productName: string): void {
    if (typeof window === "undefined") return;
    window.gtag?.("event", "contact_click", {
      contact_platform: platform,
      product_id: productId,
      product_name: productName,
    });
    window.fbq?.("trackCustom", "ContactClick", {
      platform,
      productId,
      productName,
    });
  }
}

export const analyticsService = AnalyticsService.getInstance();
