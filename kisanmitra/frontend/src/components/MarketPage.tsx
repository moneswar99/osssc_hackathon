import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Info } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';
import { api } from '../services/api';
import type { MarketItem } from '../types';

// Simulated 30-day price history for chart
function generatePriceHistory(currentPrice: number, trend: 'up' | 'down' | 'stable') {
  const days = ['Jun 1', 'Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Today'];
  const trendFactor = trend === 'up' ? 1 : trend === 'down' ? -1 : 0;
  return days.map((day, i) => {
    const base = currentPrice * (1 - (trendFactor * (days.length - 1 - i) * 0.008));
    const noise = (Math.random() - 0.5) * currentPrice * 0.02;
    return { day, price: Math.round(base + noise) };
  });
}

const AI_INSIGHTS: Record<string, string> = {
  'Paddy (Raw)': 'Price is showing a steady upward trend. Kharif procurement season starting soon may push prices higher. Consider selling in November-December.',
  'Cotton': 'Cotton prices have declined due to lower export demand. If storage available, consider holding stock until February-March.',
  'Chilli (Dry)': 'Strong upward momentum driven by festive season demand. Current is a good time to sell if you have stock.',
  'Groundnut': 'Prices are stable. Market watching global edible oil trends. No major movement expected in the short term.',
  'Turmeric': 'Significant price surge due to reduced production in Telangana this season. Strong export demand from Southeast Asia.',
  'Maize': 'Prices under pressure from high arrivals. Poultry industry demand may provide some support in coming weeks.',
};

function TrendBadge({ trend, pct }: { trend: 'up' | 'down' | 'stable'; pct: number }) {
  if (trend === 'up')
    return <span className="flex items-center gap-1 text-green-600 font-semibold text-sm"><TrendingUp className="w-4 h-4" />+{pct.toFixed(2)}%</span>;
  if (trend === 'down')
    return <span className="flex items-center gap-1 text-red-600 font-semibold text-sm"><TrendingDown className="w-4 h-4" />{pct.toFixed(2)}%</span>;
  return <span className="flex items-center gap-1 text-gray-500 font-semibold text-sm"><Minus className="w-4 h-4" />0.00%</span>;
}

export default function MarketPage() {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MarketItem | null>(null);

  const load = () => {
    setLoading(true);
    api.getMarket()
      .then(d => { setItems(d.data); setLastUpdated(d.last_updated); setSelected(d.data[0]); })
      .catch(() => null)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  const chartData = selected ? generatePriceHistory(selected.current_price, selected.trend) : [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {lastUpdated ? `Updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'APMC Mandi Rates'}
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">Demo Data</span>
        </p>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800 font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Price cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(item => (
          <button
            key={item.crop}
            onClick={() => setSelected(item)}
            className={`bg-white rounded-xl p-4 shadow-sm border-2 text-left transition-all hover:shadow-md ${
              selected?.crop === item.crop ? 'border-green-500' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-xs font-medium text-gray-500 leading-tight">{item.crop}</div>
              <TrendBadge trend={item.trend} pct={Math.abs(item.change_percent)} />
            </div>
            <div className="text-xl font-extrabold text-gray-900">
              {formatPrice(item.current_price)}
            </div>
            <div className="text-xs text-gray-400">{item.unit}</div>
            <div className="mt-2 text-xs text-gray-400">{item.market}</div>
          </button>
        ))}
      </div>

      {/* Chart + AI insight for selected crop */}
      {selected && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-bold text-gray-900">{selected.crop} — Price Trend</h3>
              <p className="text-xs text-gray-500">{selected.market} · Last 30 days (estimated)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-gray-900">{formatPrice(selected.current_price)}</div>
              <div className="text-xs text-gray-400">{selected.unit}</div>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={v => `₹${(v / 1000).toFixed(1)}k`} domain={['auto', 'auto']} />
              <Tooltip
                formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Price']}
                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={selected.trend === 'up' ? '#16a34a' : selected.trend === 'down' ? '#dc2626' : '#6b7280'}
                strokeWidth={2.5}
                dot={{ r: 3, fill: selected.trend === 'up' ? '#16a34a' : selected.trend === 'down' ? '#dc2626' : '#6b7280' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* AI insight */}
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2.5">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-blue-800 mb-0.5">AI Market Analysis</div>
              <p className="text-xs text-blue-700">{AI_INSIGHTS[selected.crop] ?? 'Monitor market trends closely before making selling decisions.'}</p>
              <p className="text-xs text-blue-500 mt-1 italic">Prices are estimates. Verify with local APMC before trading.</p>
            </div>
          </div>

          {/* Details row */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Previous Price</div>
              <div className="font-bold text-gray-900">{formatPrice(selected.previous_price)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Best Selling Time</div>
              <div className="font-bold text-green-700">{selected.best_time}</div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center pb-2">
        Prices are indicative and based on demo data. Actual APMC prices may vary by market, quality, and date. Always verify before selling.
      </p>
    </div>
  );
}
