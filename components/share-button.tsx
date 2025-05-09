"use client";

import {
  Share2,
  Linkedin,
  Twitter,
  MessageCircle,
  Copy,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ShareButton() {
  const websiteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://quickqr.arshiash80.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(websiteUrl);
    toast.custom(() => (
      <div
        className="flex items-center gap-2 rounded-md border px-3 py-2 shadow"
        style={{
          fontSize: 14,
        }}
      >
        <CheckCircle size={20} />
        <span className="text-sm">
          Copied to clipboard. Say hi to your friends!
        </span>
      </div>
    ));
  };

  const handleShare = (platform: string) => {
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent("Check out QuickQR - Generate QR codes instantly! " + websiteUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out QuickQR - Generate QR codes instantly!")}&url=${encodeURIComponent(websiteUrl)}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-white/10 bg-black/50 backdrop-blur-sm hover:bg-black/80"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] border-white/10 bg-black/90 backdrop-blur-sm"
        >
          <DropdownMenuItem
            className="cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => handleShare("whatsapp")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Share on WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => handleShare("linkedin")}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Share on X
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
            onClick={handleCopy}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Website URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
