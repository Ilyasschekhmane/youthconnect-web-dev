import { getUserNotifications } from '@/lib/db/queries';
import { getCurrentUser } from '@/lib/db/queries';
import { NotificationItem } from './notification-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';

export async function NotificationsList() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">Please log in to view notifications</p>
        </CardContent>
      </Card>
    );
  }

  const notifications = await getUserNotifications(user.id);

  if (notifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">You have no notifications yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </CardContent>
    </Card>
  );
}
