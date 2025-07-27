import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlySalesChart = () => {
  const data = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 32 },
    { name: "Mar", value: 24 },
    { name: "Apr", value: 28 },
    { name: "May", value: 26 },
    { name: "Jun", value: 22 },
    { name: "Jul", value: 28 },
    { name: "Aug", value: 16 },
    { name: "Sep", value: 24 },
    { name: "Oct", value: 36 },
    { name: "Nov", value: 30 },
    { name: "Dec", value: 20 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Sales</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
      </div>

      {/* Chart container */}
      <div className="h-48 relative">
        {/* Only keep the Recharts component */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6A49BA" }}
            />
            <YAxis hide={true} />
            <Tooltip
              cursor={{ fill: "rgba(106, 73, 186, 0.1)" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Bar
              dataKey="value"
              fill="#6A49BA"
              radius={[2, 2, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySalesChart;
