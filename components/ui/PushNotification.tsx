import React, { useEffect } from 'react';

interface PushNotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

const PushNotification: React.FC<PushNotificationProps> = ({ title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-5 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PushNotification;
