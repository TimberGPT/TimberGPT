"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PrelineScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Load and initialize Preline UI
    const loadPreline = async () => {
      try {
        // Only import Preline
        await import("preline/dist/preline.js");

        // Initialize components
        if (
          window.HSStaticMethods &&
          typeof window.HSStaticMethods.autoInit === "function"
        ) {
          window.HSStaticMethods.autoInit();
        }
      } catch (error) {
        console.error("Failed to load Preline:", error);
      }
    };

    loadPreline();
  }, [pathname]); // Re-initialize when route changes

  return null;
}
