import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 transition-all duration-300 ${
            isAnimating ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
          }`}
          onClick={handleClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className={`inline-block align-bottom bg-gradient-to-br from-white to-indigo-50 rounded-3xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8 ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'
        }`}>
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
          
          <div className="relative">
            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={handleClose}
                className="btn-ripple bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full p-2 hover:from-red-600 hover:to-pink-700 transform hover:scale-110 hover:rotate-90 transition-all duration-200 shadow-xl"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                  {title}
                </h3>
                <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
