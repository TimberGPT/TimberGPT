"use client";

import React from "react";
import StatCard from "./StatCard";
import MonthlySalesChart from "./MonthlySalesChart";
import MonthlyTargetCard from "./MonthlyTargetCard";
import ProjectsTable from "./ProjectsTable";
import SalesTable from "./SalesTable";
import Image from "next/image";
import {
  useGetTotalsQuery,
  useGetMonthlySalesQuery,
  useGetMonthlyTargetsQuery,
} from "../../redux/api/dashboardApi";

const DashboardLayout = () => {
  const { data: totals } = useGetTotalsQuery({});
  const { data: monthlySalaries } = useGetMonthlySalesQuery({});
  const { data: monthlyTargets } = useGetMonthlyTargetsQuery({});

  console.log("Totals:", totals);
  console.log("Monthly Salaries:", monthlySalaries);
  console.log("Monthly Targets:", monthlyTargets);

  return (
    <div className="max-w-7xl mx-auto mt-28 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Row - Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Card */}
            <StatCard
              icon={
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              }
              title="Total Projects"
              value="50"
              percentage="33%"
              isPositive={true}
            />

            {/* Sales Card */}
            <StatCard
              icon={
                <Image
                  width={24}
                  height={24}
                  src="https://img.icons8.com/material-outlined/48/sales-performance.png"
                  alt="sales-performance"
                  className="opacity-50"
                  priority
                />
              }
              title="Total Sales"
              value="Tk. 25k"
              percentage="9.05%"
              isPositive={false}
            />

            {/* Employee Card */}
            <StatCard
              icon={
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              title="Total Employees"
              value="5"
              percentage="9.05%"
              isPositive={false}
            />
          </div>

          {/* Monthly Sales Chart */}
          <MonthlySalesChart />
        </div>

        {/* Right Column - Monthly Target */}
        <MonthlyTargetCard />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Table */}
        <ProjectsTable />

        {/* Sales Table */}
        <SalesTable />
      </div>
    </div>
  );
};

export default DashboardLayout;
