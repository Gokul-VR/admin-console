
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "md",
  closeOnEsc = true,
  closeOnBackdropClick = true,
  className
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    if (closeOnEsc) {
      window.addEventListener("keydown", handleEsc);
    }

    // Add overflow hidden to body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full mx-4"
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeOnBackdropClick ? onClose : undefined} 
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
        role="dialog"
        aria-modal="true"
      >
        <div 
          className={cn(
            "bg-white rounded-lg shadow-xl w-full transform transition-all",
            maxWidthClasses[maxWidth],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="p-4 sm:p-6 border-b border-border">
              {typeof title === 'string' ? (
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              ) : (
                title
              )}
            </div>
          )}
          
          {/* Body */}
          <div className="p-4 sm:p-6">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="p-4 sm:p-6 border-t border-border">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { CustomModal };
