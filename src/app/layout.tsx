import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import React from "react";

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
      url: "https://경희대.kr",
      locale: "ko_KR",
      images: [
        {
          url: "https://경희대.kr/og-image.png",
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
    metadataBase: new URL("https://경희대.kr"),
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="w-full h-full p-0 m-0 bg-black">
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" /> */}
        <meta name='viewport' content='initial-scale=1, viewport-fit=cover' />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> */}
      </head>
      <body className="w-full h-full">
        <div
          className="w-full h-full flex flex-col items-center justify-center m-0 p-0 bg-black"
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
