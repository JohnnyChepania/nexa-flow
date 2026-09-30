"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-end justify-center bg-graphite-950/75 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="panel w-full max-w-lg bg-graphite-900 p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                {description ? (
                  <p className="mt-2 text-sm text-muted">{description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="rounded-full border border-white/10 p-2 text-white/55 transition hover:bg-white/10 hover:text-white focus-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {children ? <div className="mt-6">{children}</div> : null}
            {footer ? <div className="mt-7 flex justify-end gap-3">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
