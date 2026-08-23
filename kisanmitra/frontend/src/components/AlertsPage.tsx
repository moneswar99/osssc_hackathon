import { useEffect, useState } from 'react';
import {
  CloudRain, Bug, TrendingDown, Info, Bell,
  AlertTriangle, CheckCircle, Thermometer, Wind
} from 'lucide-react';
import { api } from '../services/api';
import type { Alert } from '../types';

const EXTRA_ALERTS: Alert[] = [
  {
    id: 5,
    type: 'weather',
    severity: 'high',
    title: 'Extreme Heat Warning',
    message: 'Temperatures expected to reach 42°C on Friday. Cover seedlings and increase irrigation frequency.',
    time: '3 days ago',
    icon: 'thermometer',
  },
  {
    id: 6,
    type: 'weather',
    severity: 'medium',
    title: 'Strong Wind Advisory',
    message: 'Wind speeds up to 45 km/h expected. Stake tall crops and secure poly-houses.',
    time: '4 days ago',
    icon: 'wind',
  },
  {
    id: 7,
    type: 'pest',
    severity: 'high',
    title: 'White Fly Outbreak Alert',
    message: 'White fly populations are high across the district. Immediate monitoring of cotton and chilli crops recommended.',
    time: '5 days ago',
    icon: 'bug',
  },
  {
    id: 8,
    type: 'market',
    severity: 'info',
    title: 'Turmeric Prices Rising',
    message: 'Turmeric prices have increased 7% this week. Nizamabad APMC reporting strong demand.',
    time: '6 days ago',
    icon: 'info',
  },
];

const severityConfig: Record<Alert['severity'], { bg: string; border: string; badge: string; dot: string }> = {
  high:   { bg: 'bg-red-50',    border: 'border-l-red-500',    badge: 'bg-red-100 text-red-700',    dot: 'bg-red-500' },
  medium: { bg: 'bg-orange-50', border: 'border-l-orange-500', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  low:    { bg: 'bg-blue-50',   border: 'border-l-blue-500',   badge: 'bg-blue-100 text-blue-700',  dot: 'bg-blue-500' },
  info:   { bg: 'bg-green-50',  border: 'border-l-green-500',  badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
};

function AlertIcon({ icon }: { icon: string }) {
  const cls = 'w-5 h-5';
  switch (icon) {
    case 'cloud-rain':  return <CloudRain className={cls} />;
    case 'bug':         return <Bug className={cls} />;
    case 'trending-down': return <TrendingDown className={cls} />;
    case 'thermometer': return <Thermometer className={cls} />;
    case 'wind':        return <Wind className={cls} />;
    default:            return <Info className={cls} />;
  }
}

const typeFilters = ['All', 'Weather', 'Pest', 'Market', 'Scheme'] as const;

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [read, setRead] = useState<Set<number>>(new Set());

  useEffect(() => {
    api.getAlerts()
      .then(d => setAlerts([...d.alerts, ...EXTRA_ALERTS]))
      .catch(() => setAlerts(EXTRA_ALERTS))
      .finally(() => setLoading(false));
  }, []);

  const markRead = (id: number) => setRead(prev => new Set([...prev, id]));
  const markAllRead = () => setRead(new Set(alerts.map(a => a.id)));

  const filtered = filter === 'All' ? alerts : alerts.filter(a => a.type === filter.toLowerCase());

  const unreadCount = alerts.filter(a => !read.has(a.id)).length;

  const severitySummary = {
    high:   alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low:    alerts.filter(a => a.severity === 'low').length,
    info:   alerts.filter(a => a.severity === 'info').length,
  };

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Critical', count: severitySummary.high, color: 'bg-red-100 text-red-700', icon: AlertTriangle },
          { label: 'Warnings', count: severitySummary.medium, color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
          { label: 'Advisories', count: severitySummary.low, color: 'bg-blue-100 text-blue-700', icon: Info },
          { label: 'Info', count: severitySummary.info, color: 'bg-green-100 text-green-700', icon: CheckCircle },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-xl p-4 text-center select-none cursor-default`}>
            <s.icon className="w-5 h-5 mx-auto mb-1 opacity-70" />
            <div className="text-2xl font-bold">{s.count}</div>
            <div className="text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {typeFilters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === f ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-green-700 font-medium flex items-center gap-1.5 hover:text-green-800"
          >
            <CheckCircle className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* Alert list */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading alerts…</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(alert => {
            const cfg = severityConfig[alert.severity];
            const isUnread = !read.has(alert.id);
            return (
              <div
                key={alert.id}
                className={`border-l-4 rounded-r-2xl p-4 flex gap-4 items-start ${cfg.bg} ${cfg.border} ${isUnread ? 'ring-1 ring-inset ring-black/5' : 'opacity-75'}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <AlertIcon icon={alert.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-gray-900">{alert.title}</span>
                        {isUnread && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />}
                      </div>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                      {isUnread && (
                        <button
                          onClick={() => markRead(alert.id)}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">No alerts in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
