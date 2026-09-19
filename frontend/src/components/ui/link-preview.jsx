import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export const LinkPreview = ({
  children,
  url = "#",
  className,
  width = 240,
  height = 140,
  quality = 60,
  isStatic = false,
  imageSrc = "",
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  let initialSrc;
  if (!isStatic && url && url.startsWith("http")) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 2.5,
      "viewport.height": height * 2.5,
    });
    initialSrc = `https://api.microlink.io/?${params}`;
  } else {
    initialSrc = imageSrc || "/images/orbit/solar-1.jpg";
  }

  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 120, damping: 18 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  const handleImageError = () => {
    // Fallback to local high-res solar image if remote preview fails
    if (imageSrc && currentSrc !== imageSrc) {
      setCurrentSrc(imageSrc);
    } else if (currentSrc !== "/images/orbit/solar-1.jpg") {
      setCurrentSrc("/images/orbit/solar-1.jpg");
    }
  };

  return (
    <>
      {isMounted && (
        <div className="hidden">
          <img
            src={currentSrc}
            width={width}
            height={height}
            alt="hidden prefetch"
            loading="eager"
            onError={handleImageError}
          />
        </div>
      )}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={120}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn(
            "inline-flex items-center gap-1 font-medium text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors duration-200",
            className
          )}
          href={url}
          target={url.startsWith("http") ? target : undefined}
          rel={url.startsWith("http") ? rel : undefined}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="z-[99999] [transform-origin:var(--radix-hover-card-content-transform-origin)] pointer-events-auto"
            side="top"
            align="center"
            sideOffset={12}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 280,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, y: 10, scale: 0.85 }}
                  className="shadow-2xl rounded-2xl p-1.5 bg-slate-950/95 border border-white/20 backdrop-blur-2xl ring-1 ring-emerald-500/20"
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    target={url.startsWith("http") ? target : undefined}
                    rel={url.startsWith("http") ? rel : undefined}
                    className="block rounded-xl overflow-hidden group/link relative"
                    style={{ fontSize: 0 }}
                  >
                    <img
                      src={currentSrc}
                      width={width}
                      height={height}
                      className="rounded-lg object-cover w-[230px] h-[130px] group-hover/link:scale-105 transition-transform duration-300"
                      alt="preview"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                      <div className="flex items-center justify-between w-full text-[11px] font-sans font-medium text-white/90">
                        <span className="truncate max-w-[170px]">{url.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};

export default LinkPreview;

