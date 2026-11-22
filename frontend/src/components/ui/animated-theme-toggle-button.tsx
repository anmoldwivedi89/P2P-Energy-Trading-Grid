"use client";

import React, { useRef, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export type ThemeTransitionType = "horizontal" | "vertical";

type AnimatedThemeToggleButtonProps = {
  type?: ThemeTransitionType;
  className?: string;
};

function triggerThemeTransition(type: ThemeTransitionType) {
  if (type === "horizontal") {
    document.documentElement.animate(
      {
        clipPath: [
          "inset(50% 0 50% 0)",
          "inset(0 0 0 0)"
        ]
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  } else if (type === "vertical") {
    document.documentElement.animate(
      {
        clipPath: [
          "inset(0 50% 0 50%)",
          "inset(0 0 0 0)"
        ]
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }
}

export const AnimatedThemeToggleButton = ({
  type = "vertical",
  className
}: AnimatedThemeToggleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { themeMode, syncThemeToMode } = useTheme();
  const isDark = themeMode === "dark";

  const handleToggle = useCallback(async () => {
    if (!buttonRef.current) return;
    const nextIsDark = !isDark;
    const targetMode = nextIsDark ? "dark" : "light-grid";

    const updateDOM = () => {
      syncThemeToMode(targetMode);
    };

    if (!document.startViewTransition) {
      updateDOM();
      return;
    }

    try {
      await document.startViewTransition(() => {
        flushSync(() => {
          updateDOM();
        });
      }).ready;

      triggerThemeTransition(type);
    } catch {
      updateDOM();
    }
  }, [isDark, type, syncThemeToMode]);

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label={`Toggle theme - ${type}`}
      title={`Switch to ${isDark ? "Neumorphic Light" : "Warm Dark"} theme`}
      type="button"
      className={cn(
        "flex items-center justify-center rounded-full outline-none focus:outline-none active:outline-none focus:ring-0 cursor-pointer border transition-all duration-300 active:scale-95",
        isDark
          ? "bg-[#2A2A2A] border-[#383430] text-[#DAA520] hover:border-[#DAA520] hover:text-[#FF4500]"
          : "bg-[#EAE6DE] border-[#DCD6CB] shadow-[3px_3px_8px_rgba(186,178,166,0.4),-3px_-3px_8px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(186,178,166,0.4)] text-[#FF6F61]",
        className
      )}
      style={{ minWidth: 36, minHeight: 36 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="text-[#DAA520]"
          >
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="text-[#FF6F61]"
          >
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AnimatedThemeToggleButton;
