import { Bell } from 'lucide-react';
import { getUserNotifications } from '@/lib/db/queries';
import { getCurrentUser } from '@/lib/db/queries';
import { NotificationItem } from './notification-item';

export async function NotificationBell() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const notifications = await getUserNotifications(user.id);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="relative inline-block">
      <button className="relative rounded-lg p-2 hover:bg-slate-800 transition">
        <Bell className="h-5 w-5 text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
        )}
      </button>
    </div>
  );
}
