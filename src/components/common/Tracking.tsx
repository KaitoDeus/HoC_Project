"use client";

import { useEffect } from "react";
import Script from "next/script";
import { analyticsService } from "@/services/analytics.service";

export default function Tracking() {
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  const META_PIXEL_ID = "XXXXXXXXXXXXXXX";

  const isGAValid = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";
  const isPixelValid = META_PIXEL_ID && META_PIXEL_ID !== "XXXXXXXXXXXXXXX" && /^\d+$/.test(META_PIXEL_ID);

  useEffect(() => {
    if (isGAValid) {
      analyticsService.initGA(GA_MEASUREMENT_ID);
    }
    if (isPixelValid) {
      analyticsService.initPixel(META_PIXEL_ID);
    }
  }, [isGAValid, isPixelValid]);

  return (
    <>
      {isGAValid && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      )}

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
