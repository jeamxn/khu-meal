import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";

import Providers from "@/providers";

export const generateMetadata = async (): Promise<Metadata> => {
  const json = await import("../../public/manifest.json");
  return {
    title: json.name,
    description: json.description,
    openGraph:{
      title: json.name,
      siteName: json.name,
      description: json.description,
      type: "website",
      url: "http://192.168.0.76:3000",
      locale: "ko_KR",
      images: [
        {
          url: "http://192.168.0.76:3000/og-image.png",
          width: 4800,
          height: 2520,
        }
      ],
    },
    appleWebApp: true,
    icons: [
      { 
        "url": "/favicon.ico", 
        "type": "image/x-icon", 
        "sizes": "16x16 32x32"
      },
      { 
        "url": "/icons/icon-192.png", 
        "type": "image/png", 
        "sizes": "192x192"
      },
      { 
        "url": "/icons/icon-512.png", 
        "type": "image/png", 
        "sizes": "512x512"
      },
    ],
    manifest: "/manifest.json",
    metadataBase: new URL("http://192.168.0.76:3000"),
  };
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="w-full h-full p-0 m-0">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className="w-full flex flex-col items-center justify-center h-screen"
      >
        <Providers>
          {children}
        </Providers>
        <GoogleAnalytics gaId="G-Q120PCDL4Z" />
      </body>
    </html>
  );
}
