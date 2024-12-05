"use client";

import Script from "next/script";
import React from 'react';

const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_URL!;

// 为 Plausible Analytics 定义类型
declare global {
  interface Window {
    plausible: (
      eventName: string,
      options?: {
        props?: Record<string, unknown>;
      }
    ) => void;
  }
}

export function PlausibleAnalyticsScript() {
  return (
    <Script
      defer
      type="text/javascript"
      data-domain={plausibleUrl}
      // src="https://plausible.io/js/script.js"
      src="https://click.pageview.click/js/script.js"
    />
  );
}

export function useAnalytics() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.plausible) {
      return;
    }

    window.plausible(event, {
      props: data,
    });
  };

  return {
    trackEvent,
  };
}
