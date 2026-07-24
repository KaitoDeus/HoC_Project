declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      version?: string;
    };
    dataLayer?: unknown[];
  }
}

export {};
