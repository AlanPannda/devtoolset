"use client";

import Script from "next/script";
import React from 'react';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!;

// Define types for window and gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function GoogleAnalyticsScript() {
  return (
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      onLoad={() => {
        if (typeof window === "undefined") {
          return;
        }

        window.dataLayer = window.dataLayer || [];

        function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", googleAnalyticsId);
      }}
    />
  );
}

export function useGoogleAnalytics() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.gtag) {
      return;
    }

    window.gtag("event", event, data);
  };

  return {
    trackEvent,
  };
}
