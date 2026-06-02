"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-5xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
                  "rounded-2xl p-6 shadow-glass-lg",
                  "bg-ocean-mid/95 backdrop-blur-xl border border-white/10",
                  "focus:outline-none",
                  sizeClasses[size],
                  className
                )}
              >
                {(title || showCloseButton) && (
                  <div className="flex items-center justify-between mb-4">
                    {title && (
                      <div>
                        <Dialog.Title className="text-lg font-semibold text-pearl font-serif">
                          {title}
                        </Dialog.Title>
                        {description && (
                          <Dialog.Description className="text-sm text-pearl/60 mt-0.5">
                            {description}
                          </Dialog.Description>
                        )}
                      </div>
                    )}
                    {showCloseButton && (
                      <Dialog.Close asChild>
                        <button
                          className="ml-auto rounded-lg p-1.5 text-pearl/60 hover:text-pearl hover:bg-white/10 transition-colors"
                          aria-label="Close modal"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </Dialog.Close>
                    )}
                  </div>
                )}

                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

// Convenience components
export function ModalTrigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
