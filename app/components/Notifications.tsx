"use client";

import { Info } from "lucide-react";
import { useEffect } from "react";

interface NotificationsProps {
  message: string;
  type: "success" | "error";
  onclose: () => void;
}

const Notifications = ({ message, type, onclose }: NotificationsProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onclose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onclose]);

  const alertClass = type === "error" ? "alert-error" : "alert-success";

  return (
    <div className="toast toast-bottom toast-end">
      <div className={`alert ${alertClass} p-2 text-sm shadow-lg`}>
        <span>
          <Info className="w-4 mr-2 font-bold text-accent" />  
            {message}
        </span>
      </div>
    </div>
  );
};

export default Notifications;