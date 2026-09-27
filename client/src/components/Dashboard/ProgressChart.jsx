import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function ProgressChart({ data }) {
  return (
    <div className="card chart-card">
      <div className="chart-card-header">
        <h3>This week</h3>
        <p>Tasks created vs. completed, last 7 days</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="completedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="createdFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              fontSize: 13,
              boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
            }}
          />
          <Area type="monotone" dataKey="created" stroke="#94a3b8" fill="url(#createdFill)" strokeWidth={2} name="Created" />
          <Area type="monotone" dataKey="completed" stroke="#2563eb" fill="url(#completedFill)" strokeWidth={2} name="Completed" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
