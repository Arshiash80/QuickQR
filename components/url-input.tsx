"use client";

import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const MAX_URL_LENGTH = 250;
const SHOW_COUNTER_THRESHOLD = 100; // Show counter when within 248 characters of max

interface URLInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function URLInput({ value, onChange }: URLInputProps) {
  const remainingChars = MAX_URL_LENGTH - value.length;
  const shouldShowCounter = value.length >= SHOW_COUNTER_THRESHOLD;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_URL_LENGTH) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Input
          type="url"
          value={value}
          onChange={handleChange}
          placeholder="Enter URL or text..."
          className="h-11 border-white/10 bg-black/50 pr-16 text-base transition-all duration-200 focus:border-white/20 focus:ring-2 focus:ring-white/10 sm:h-12 sm:text-lg"
        />
      </motion.div>
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
        {shouldShowCounter && (
          <motion.div
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-3 bottom-1 text-[10px] ${
              remainingChars < 100 ? "text-red-400" : "text-white/40"
            }`}
          >
            {remainingChars}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
