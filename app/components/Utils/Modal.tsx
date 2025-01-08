import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <aside
      className="fixed inset-0 z-10 flex h-screen justify-end bg-black/50 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-full rounded-l-xl shadow-lg overflow-y-auto bg-white dark:bg-gray-800 overflow-hidden"
        onClick={(event) => event.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </aside>
  );
};

export default Modal;
