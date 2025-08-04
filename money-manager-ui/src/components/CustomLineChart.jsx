import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Area,
} from "recharts";
import { formatCurrency } from "../util/validation";

function formatNumber(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const TooltipCard = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0].payload;
  return (
    <div
      style={{
        background: "#fff",
        padding: "12px 14px",
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        fontSize: 13,
        width: 180,
        position: "relative",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div style={{ color: "#555" }}>Total:</div>
        <div style={{ color: "#6e44ff", fontWeight: 700 }}>
          {formatCurrency(point.display)}
        </div>
      </div>
      {point.items && (
        <div>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>
            Details:
          </div>
          <div className="flex flex-col gap-1">
            {point?.items?.map((item, index) => (
              <div
                key={index}
                className="text-sm flex items-center gap-1 justify-between"
              >
                <span className="text-gray-500">{item.name}:</span>
                <span className="font-medium text-blue-900">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CustomLineChart = ({ data = [], cumulative = false }) => {
  const prepared = useMemo(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    let running = 0;
    return sorted.map((d) => {
      running += d.totalamount;
      return {
        ...d,
        display: cumulative
          ? parseFloat(running.toFixed(2))
          : parseFloat(d.totalamount.toFixed(2)),
      };
    });
  }, [data, cumulative]);

  const peak = useMemo(() => {
    if (!prepared.length) return null;
    return prepared.reduce(
      (best, cur) => (cur.display > (best?.display || 0) ? cur : best),
      null
    );
  }, [prepared]);

  return (
    <div
      style={{ width: "100%", height: 450, position: "relative" }}
      tabIndex={-1} // prevent default focus outline
    >
      <style>
        {`
          /* remove any focus outline from recharts internals */
          .recharts-wrapper:focus { outline: none; }
          .recharts-surface:focus { outline: none; }
        `}
      </style>
      <ResponsiveContainer>
        <LineChart
          data={prepared}
          margin={{ top: 50, right: 20, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#f0f2f7"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
            padding={{ left: 10, right: 10 }}
          />

          <YAxis
            tickFormatter={(v) => formatNumber(Math.round(v))}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
            width={70}
            domain={["dataMin", "dataMax"]}
            padding={{ top: 10, bottom: 20 }}
          />

          <Tooltip
            content={<TooltipCard />}
            cursor={{
              stroke: "#c7d2fe",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
          />

          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />

          <Line
            type="monotone"
            dataKey="display"
            stroke="url(#strokeGradient)"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: "#7c3aed" }}
            activeDot={{
              r: 7,
              stroke: "#fff",
              strokeWidth: 3,
              fill: "#6366f1",
            }}
            connectNulls
            isAnimationActive={true}
            animationDuration={700}
            name="Income"
            fill="url(#fillGradient)"
          />

          {peak && (
            <ReferenceDot
              x={peak.month}
              y={peak.display}
              r={6}
              fill="#6e44ff"
              stroke="#6e44ff"
              strokeWidth={2}
              label={{
                position: "top",
                value: `${formatNumber(peak.display)}`,
                fontSize: 12,
                fill: "#373f68",
                fontWeight: "600",
                offset: 8,
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
