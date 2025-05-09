"use client";

import { motion } from "framer-motion";
import { URLInputSection } from "@/components/url-input-section";
import { QRCodeDisplay } from "@/components/qr-code-display";
import { Footer } from "@/components/footer";
import { ShareButton } from "@/components/share-button";
import { Toaster } from "sonner";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex min-h-screen flex-col items-center justify-start px-4 py-20 sm:justify-center sm:p-4">
        {/* Header */}
        <header className="mb-8 w-full max-w-[90%] text-center sm:mb-12 sm:max-w-md">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-white">QuickQR</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Generate QR codes instantly
          </p>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full flex-col items-center justify-center gap-10"
        >
          {/* Main Content */}
          <URLInputSection url={url} onUrlChange={setUrl} />
          <QRCodeDisplay url={url} />

          <Footer />
        </motion.main>

        {/* Share Button */}
        <ShareButton />
      </div>
    </>
  );
}
