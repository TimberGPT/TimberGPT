import React from "react";

const StatCard = ({ icon, title, value, percentage, isPositive }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {percentage && (
          <div
            className={`flex items-center text-sm ${
              isPositive ? "text-green-600" : "text-red-600"
            } mb-1`}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isPositive
                    ? "M5 10l7-7m0 0l7 7m-7-7v18"
                    : "M19 14l-7 7m0 0l-7-7m7 7V3"
                }
              />
            </svg>
            {percentage}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
