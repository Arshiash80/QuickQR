"use client";

import { motion } from "framer-motion";
import { URLInput } from "@/components/url-input";

interface URLInputSectionProps {
  url: string;
  onUrlChange: (url: string) => void;
}

export function URLInputSection({ url, onUrlChange }: URLInputSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-[90%] sm:max-w-md"
    >
      <div className="space-y-3 sm:space-y-4">
        <URLInput value={url} onChange={onUrlChange} />
      </div>
    </motion.div>
  );
}
