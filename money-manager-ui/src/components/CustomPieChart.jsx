import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { formatCurrency } from "../util/validation"

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold text-gray-800 mb-1">{data.name}</p>
      <p className="text-sm text-gray-600">
        Amount: <span className="font-medium text-blue-600">{formatCurrency(data.amount)}</span>
      </p>
    </div>
  );
};

// Custom label component
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, amount }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {formatCurrency(amount)}
    </text>
  );
};

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div style={{ width: "100%", height: 400, position: "relative" }}>
      <style>
        {`
          .recharts-wrapper:focus { outline: none; }
          .recharts-surface:focus { outline: none; }
          .recharts-sector:focus { outline: none; }
          .recharts-pie-sector:focus { outline: none; }
        `}
      </style>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={130}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="amount"
            label={showTextAnchor ? renderCustomLabel : false}
            labelLine={false}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color, fontWeight: 600 }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center label showing total amount */}
      {label && totalAmount && (
        <div 
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none"
          }}
        >
          <div style={{ 
            fontSize: "14px", 
            color: "#6b7280", 
            fontWeight: 500,
            marginBottom: "4px"
          }}>
            {label}
          </div>
          <div style={{ 
            fontSize: "18px", 
            color: "#1f2937", 
            fontWeight: 700 
          }}>
            {totalAmount}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomPieChart
