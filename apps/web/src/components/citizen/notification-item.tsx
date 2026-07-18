'use client';

import { markNotificationAsRead, deleteNotification } from '@/features/citizen/actions';
import { Button } from '@/components/button';
import { Bell, X } from 'lucide-react';
import { useState } from 'react';

interface CitizenNotificationItemProps {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  onDelete?: () => void;
}

export function CitizenNotificationItem({
  id,
  title,
  body,
  isRead,
  createdAt,
  onDelete,
}: CitizenNotificationItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkAsRead = async () => {
    setIsMarking(true);
    try {
      await markNotificationAsRead(id);
    } finally {
      setIsMarking(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteNotification(id);
      onDelete?.();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`rounded-lg border p-4 transition ${
        isRead
          ? 'border-slate-700 bg-slate-900/50'
          : 'border-cyan-500/30 bg-cyan-500/10'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {!isRead ? (
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
          ) : (
            <Bell className="h-4 w-4 text-slate-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{body}</p>
          <p className="text-xs text-slate-500 mt-2">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {!isRead && (
            <Button
              size="xs"
              variant="ghost"
              onClick={handleMarkAsRead}
              disabled={isMarking}
              title="Mark as read"
            >
              ✓
            </Button>
          )}
          <Button
            size="xs"
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
