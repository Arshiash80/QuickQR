import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { sora } from "@/lib/fonts";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: "QuickQR — Fast, Free, No-Ad QR Code Generator",
  description:
    "Generate clean, instant QR codes in seconds. No ads, no bloat — just a free and minimalist QR code generator that works.",
  metadataBase: new URL("https://quickqr.arshiash80.com"),
  keywords: [
    "free qr code generator",
    "instant qr code",
    "no ad qr code",
    "simple qr code tool",
    "qr code maker",
    "quick qr generator",
    "minimal qr code",
  ],
  authors: [{ name: "Arshia Shahidi", url: "https://arshiash80.com" }],
  creator: "Arshia Shahidi",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
