import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-lg p-6 w-full max-w-sm shadow-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-lg p-1 rounded hover:bg-muted"
          onClick={onClose}
          title="Close"
        >
          ×
        </button>
        {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal; 