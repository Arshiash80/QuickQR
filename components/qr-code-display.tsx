"use client";

import { QrCode, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState, forwardRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QRCodeDisplayProps {
  url: string;
}

export function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const [isLoading, setIsLoading] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const getSanitizedFilename = (url: string) => {
    try {
      let name = url.replace(/^(https?:\/\/)?(www\.)?/i, "");
      name = name.replace(/\/$/, "");
      name = name.replace(/[^a-z0-9]/gi, "-");
      name = name.replace(/-+/g, "-");
      name = name.replace(/^-+|-+$/g, "");
      name = name.slice(0, 50);
      return name || "quickqr-code";
    } catch {
      return "quickqr-code";
    }
  };

  const handleDownloadPNG = () => {
    if (!qrRef.current) {
      toast.error("Failed to download QR code");
      return;
    }

    const svg = qrRef.current.querySelector("svg");
    if (!svg) {
      toast.error("Failed to download QR code");
      return;
    }

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        const filename = getSanitizedFilename(url);
        downloadLink.download = `${filename}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };

      img.onerror = () => {
        toast.error("Failed to convert QR code to PNG");
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch {
      toast.error("Failed to download QR code");
    }
  };

  const handleDownloadSVG = () => {
    if (!qrRef.current) {
      toast.error("Failed to download QR code");
      return;
    }

    const svg = qrRef.current.querySelector("svg");
    if (!svg) {
      toast.error("Failed to download QR code");
      return;
    }

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const blobUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      const filename = getSanitizedFilename(url);
      downloadLink.download = `${filename}.svg`;
      downloadLink.href = blobUrl;
      downloadLink.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      toast.error("Failed to download QR code");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative"
    >
      <div className="mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center rounded-xl border border-white/10 bg-black/50 p-4 shadow-lg shadow-white/5 backdrop-blur-sm sm:max-w-[280px] sm:p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSpinner />
          ) : url ? (
            <QRCodeContent ref={qrRef} url={url} setIsLoading={setIsLoading} />
          ) : (
            <QRCodePlaceholder />
          )}
        </AnimatePresence>
      </div>

      <DownloadButton
        url={url}
        isLoading={isLoading}
        onDownloadPNG={handleDownloadPNG}
        onDownloadSVG={handleDownloadSVG}
      />
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
    >
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <motion.div
          className="absolute inset-0 rounded-lg border-4 border-white/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-lg border-4 border-white/40"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-lg border-4 border-white/60"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [180, 270, 360, 90, 180],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}

interface QRCodeContentProps {
  url: string;
  setIsLoading: (loading: boolean) => void;
}

const QRCodeContent = forwardRef<HTMLDivElement, QRCodeContentProps>(
  ({ url, setIsLoading }, ref) => (
    <motion.div
      key="qr"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex h-40 w-40 items-center justify-center rounded-lg bg-white/5 sm:h-48 sm:w-48"
      ref={ref}
    >
      <QRCodeSVG
        value={url}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        size={160}
        level="H"
        className="h-full w-full"
        bgColor="transparent"
        fgColor="white"
      />
    </motion.div>
  ),
);

QRCodeContent.displayName = "QRCodeContent";

function QRCodePlaceholder() {
  return (
    <motion.div
      key="placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-40 w-40 items-center justify-center rounded-lg bg-white/5 sm:h-48 sm:w-48"
    >
      <QrCode className="h-14 w-14 text-white/30 sm:h-16 sm:w-16" />
    </motion.div>
  );
}

interface DownloadButtonProps {
  url: string;
  isLoading: boolean;
  onDownloadPNG: () => void;
  onDownloadSVG: () => void;
}

function DownloadButton({
  url,
  isLoading,
  onDownloadPNG,
  onDownloadSVG,
}: DownloadButtonProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mt-4 flex justify-center sm:mt-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:max-w-[200px]"
        >
          {url && !isLoading ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/10 bg-black/50 hover:bg-black/80"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px] border-white/10 bg-black/90">
                <DropdownMenuItem
                  className="cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={onDownloadPNG}
                >
                  Download as PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={onDownloadSVG}
                >
                  Download as SVG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="lg"
              disabled
              className="w-full border-white/10 bg-black/50 opacity-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
