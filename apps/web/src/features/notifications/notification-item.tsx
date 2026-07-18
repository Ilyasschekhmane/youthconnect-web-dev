'use client';

import { markNotificationAsRead } from '@/lib/db/mutations';
import { X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const handleDismiss = async () => {
    await markNotificationAsRead(notification.id);
  };

  const isRecent = new Date().getTime() - new Date(notification.created_at).getTime() < 300000;

  return (
    <div
      className={`flex items-start gap-3 rounded-lg p-3 transition ${
        isRecent ? 'border border-cyan-500 bg-cyan-500/10' : 'border border-slate-700 bg-slate-800'
      }`}
    >
      <div className="flex-1">
        <p className="font-semibold text-white text-sm">{notification.title}</p>
        <p className="text-sm text-slate-400 mt-1">{notification.body}</p>
        <p className="text-xs text-slate-500 mt-2">
          {new Date(notification.created_at).toLocaleString()}
        </p>
      </div>
      {!notification.is_read && (
        <button
          onClick={handleDismiss}
          className="mt-1 rounded p-1 hover:bg-slate-700 transition"
          title="Dismiss"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>
      )}
    </div>
  );
}
