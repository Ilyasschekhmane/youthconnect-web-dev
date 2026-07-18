import Link from 'next/link';

export function NotificationsPanel({ notifications }: { notifications: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>
        <Link href="/dashboard/notifications" className="text-sm text-slate-400 hover:text-slate-200">View all</Link>
      </div>

      <div className="mt-4 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-slate-400">No notifications</p>
        ) : (
          notifications.slice(0, 6).map((n) => (
            <div key={n.id} className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white">{n.title}</p>
                <p className="text-xs text-slate-400">{n.body}</p>
              </div>
              <div className="text-xs text-slate-400">{new Date(n.created_at).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
