import { X } from 'lucide-react';
import { useEffect } from 'react';


/* Modal Component - A reusable modal dialog that overlays the page
  Supports custom content, sizes and actions
*/


export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}) {

  // Different max-widths for different modal sizes
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  // Close on Escape Key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent boyd scroll when modla is open
      document.body.style.overflow = 'hidden';
    }

    // Remove listner and restore scroll when modal closes
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'
    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* Handle Backdrop Click
     Close modal when clicking out side of it 
  */
  const handleBackdropClick = (e) => {
    if (e.targe === e.currenTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" 
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal Content */}
          <div className={`
              relative w-full ${sizeStyles[size]}
              bg-white dark:bg-[#1e1e1e]
              rounded-lg shadow-xl
              transform transition-all
            `}
            >
            {/* Modal Header */}
            <div className="flex items-center justity-between p-6 border-b border-gray-200 dark:border-[#2a2a2a]">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>

              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className='p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hove:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {/* Modal Body - Main content area */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}