import React, { useEffect } from "react";

const MonthlyTargetCard = () => {
  useEffect(() => {
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      const targetPercent = 75.55;
      const dashArray = 251.2;
      const offset = dashArray - (dashArray * targetPercent) / 100;

      setTimeout(() => {
        progressBar.style.strokeDashoffset = offset;
      }, 300);
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-300 relative">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Monthly Target
          </h3>
          <p className="text-sm text-gray-500">
            Target you&apos;ve set for each month
          </p>
        </div>
        <a
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          href="/dashboard/sales/invoice_form"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Set Target
        </a>
      </div>

      {/* Progress Semi-Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg className="w-64 h-48" viewBox="0 0 200 120">
            {/* Background semi-circle */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            {/* Progress semi-circle */}
            <path
              id="progress-bar"
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#6A49BA"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="251.2"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center mt-4">
            <div className="text-4xl font-bold text-[#6A49BA]">75.55%</div>
            <div className="text-sm text-green-600 font-medium bg-green-100 px-2 my-2">
              +10%
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-center mb-20">
        <p className="text-gray-600 text-sm">
          You earn <span className="font-semibold">$3287</span> today, it&apos;s
          higher than last month.
        </p>
        <p className="text-gray-600 text-sm mt-1">Keep up your good work!</p>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 bg-gray-100 absolute inset-x-0 bottom-0 py-5">
        {/* Target */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Target</div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg font-bold text-gray-900">$20K</span>
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Revenue */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Revenue</div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg font-bold text-gray-900">$20K</span>
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>

        {/* Today */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Today</div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg font-bold text-gray-900">$20K</span>
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTargetCard;
