import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotify = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-15 right-4 z-50 animate-slide-in-out w-fit">
          <div className={`alert alert-${notification.type} shadow-lg`}>
            <span>{notification.message}</span>
          </div>
          <div className="hidden">
            <div className="alert alert-success"></div>
            <div className="alert alert-error"></div>
            <div className="alert alert-warning"></div>
            <div className="alert alert-info"></div>
          </div>
        </div>
      )}

      {/* Animation via Tailwind utility classes (no config needed) */}
      <style>{`
        @keyframes slideInOut {
          0% { transform: translateX(150%); opacity: 0; }
          10% { transform: translateX(0); opacity: 1; }
          90% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(150%); opacity: 0; }
        }
        .animate-slide-in-out {
          animation: slideInOut 3s ease-in-out forwards;
        }
      `}</style>
    </NotificationContext.Provider>
  );
};
