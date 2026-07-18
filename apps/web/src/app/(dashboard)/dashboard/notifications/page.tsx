import { getCurrentUser, getServerSupabase } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/button';
import { CitizenNotificationItem } from '@/components/citizen/notification-item';
import { Bell, Archive } from 'lucide-react';
import { markAllNotificationsAsRead } from '@/features/citizen/actions';

export default async function NotificationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const supabase = await getServerSupabase();

  // Fetch user's notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, title, body, is_read, created_at')
    .eq('recipient_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(100);

  const allNotifications = notifications || [];
  const unreadCount = allNotifications.filter((n) => !n.is_read).length;
  const readNotifications = allNotifications.filter((n) => n.is_read);

  return (
    <main className="space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-sm text-slate-400 mt-1">
            Stay updated with your applications, appointments, and system messages
          </p>
        </div>
        {unreadCount > 0 && (
          <form action={markAllNotificationsAsRead}>
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </form>
        )}
      </div>

      {/* Unread Notifications */}
      {allNotifications.filter((n) => !n.is_read).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-cyan-400" />
              Unread ({unreadCount})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {allNotifications
              .filter((n) => !n.is_read)
              .map((notif) => (
                <CitizenNotificationItem
                  key={notif.id}
                  id={notif.id}
                  title={notif.title}
                  body={notif.body}
                  isRead={notif.is_read}
                  createdAt={notif.created_at}
                />
              ))}
          </CardContent>
        </Card>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earlier ({readNotifications.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {readNotifications.slice(0, 20).map((notif) => (
              <CitizenNotificationItem
                key={notif.id}
                id={notif.id}
                title={notif.title}
                body={notif.body}
                isRead={notif.is_read}
                createdAt={notif.created_at}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {allNotifications.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-300 font-semibold">No notifications yet</p>
              <p className="text-slate-400 text-sm mt-2">
                You'll see updates here when your applications change or new messages arrive
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
