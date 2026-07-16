"use client";

import { useEffect } from "react";
import Script from "next/script";

// Khai báo kiểu dữ liệu cho TypeScript
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

export default function Tracking() {
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Sẽ được cấu hình qua Env sau
  const META_PIXEL_ID = "XXXXXXXXXXXXXXX"; // Sẽ được cấu hình qua Env sau

  const isGAValid = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";
  const isPixelValid = META_PIXEL_ID && META_PIXEL_ID !== "XXXXXXXXXXXXXXX" && /^\d+$/.test(META_PIXEL_ID);

  useEffect(() => {
    // Khởi tạo dataLayer cho GA4 nếu ID hợp lệ
    if (isGAValid) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID);
    }

    // Khởi tạo fbq cho Meta Pixel nếu ID hợp lệ
    if (isPixelValid) {
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
      window.fbq?.("init", META_PIXEL_ID);
      window.fbq?.("track", "PageView");
    }
  }, [isGAValid, isPixelValid]);

  return (
    <>
      {/* Google Analytics 4 Script */}
      {isGAValid && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      )}

      {/* Meta Pixel Script */}
      {isPixelValid && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            `,
          }}
        />
      )}
    </>
  );
}
