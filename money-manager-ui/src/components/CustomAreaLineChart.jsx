import { useMemo } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
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
        width: 200,
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
        <div
          style={{
            color: point.totalamount >= 0 ? "#2563eb" : "#dc2626",
            fontWeight: 700,
          }}
        >
          {formatCurrency(point.display)}
        </div>
      </div>
      {point.items && (
        <div>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>
            Details:
          </div>
          {point.items.map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginBottom: 2,
              }}
            >
              <div style={{ color: "#6b7280" }}>{it.name}:</div>
              <div style={{ fontWeight: 600 }}>{formatCurrency(it.amount)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Props:
 *   data: array of { date, month, totalamount, items }
 *   cumulative: boolean
 *   chartType: "income" | "expense"
 */
const CustomAreaLineChart = ({
  data = [],
  cumulative = false,
  chartType = "income",
}) => {
  const prepared = useMemo(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    let acc = 0;
    return sorted.map((d) => {
      acc += d.totalamount;
      const display = cumulative
        ? parseFloat(acc.toFixed(2))
        : parseFloat(d.totalamount.toFixed(2));
      return { ...d, display };
    });
  }, [data, cumulative]);

  const peak = useMemo(() => {
    if (!prepared.length) return null;
    return prepared.reduce(
      (best, cur) => (cur.display > (best?.display || 0) ? cur : best),
      null
    );
  }, [prepared]);

  const isIncome = chartType === "income";
  const strokeGradientId = isIncome ? "incomeStroke" : "expenseStroke";
  const fillGradientId = isIncome ? "incomeFill" : "expenseFill";
  const primaryColor = isIncome ? "#2563eb" : "#ef4444"; // blue or red
  const darkStroke = isIncome ? "#1e40af" : "#b91c1c";
  const lightStroke = isIncome ? "#3b82f6" : "#f87171";

  return (
    <div
      style={{ width: "100%", height: 450, position: "relative" }}
      tabIndex={-1}
    >
      <style>
        {`
          .recharts-wrapper:focus { outline: none; }
          .recharts-surface:focus { outline: none; }
        `}
      </style>
      <ResponsiveContainer>
        <AreaChart
          data={prepared}
          margin={{ top: 50, right: 20, left: 10, bottom: 5 }}
        >
          <defs>
            {/* Fill gradient */}
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity={0.35} />
              <stop offset="60%" stopColor="#fca5a5" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#fca5a5" stopOpacity={0} />
            </linearGradient>

            {/* Stroke gradient */}
            <linearGradient id="incomeStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={darkStroke} />
              <stop offset="100%" stopColor={lightStroke} />
            </linearGradient>
            <linearGradient id="expenseStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={darkStroke} />
              <stop offset="100%" stopColor={lightStroke} />
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
            tick={{ fontSize: 12, fontWeight: 600, fill: "#4b5563" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tickFormatter={(v) => formatNumber(Math.round(v))}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 600, fill: "#4b5563" }}
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

          {/* area fill under line */}
          <Area
            type="monotone"
            dataKey="display"
            fill={`url(#${fillGradientId})`}
            stroke="none"
            activeDot={false}
            isAnimationActive={false}
            connectNulls
          />

          {/* main line */}
          <Line
            type="monotone"
            dataKey="display"
            stroke={`url(#${strokeGradientId})`}
            strokeWidth={3}
            dot={{
              r: 5,
              stroke: "#fff",
              strokeWidth: 2,
              fill: primaryColor,
            }}
            activeDot={{
              r: 7,
              stroke: "#fff",
              strokeWidth: 3,
              fill: isIncome ? "#1e40af" : "#b91c1c",
            }}
            connectNulls
            isAnimationActive={true}
            animationDuration={700}
            name={`Total ${isIncome ? "Income" : "Expense"}`}
          />

          {peak && (
            <ReferenceDot
              x={peak.month}
              y={peak.display}
              r={6}
              fill={primaryColor}
              stroke={primaryColor}
              strokeWidth={2}
              label={{
                position: "top",
                value: `${formatNumber(peak.display)}`,
                fontSize: 12,
                fill: "#1f2d55",
                fontWeight: 600,
                offset: 6,
              }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaLineChart;
