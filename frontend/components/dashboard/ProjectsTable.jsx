import React from "react";
import { formatCurrency } from "../../utils/formatters";

const ProjectsTable = () => {
  const projects = [
    {
      id: "ADUQ2189H1-0038",
      amount: "US $400.00",
      status: "Paid",
      due: "10 Jan 2023",
      created: "28 Dec, 12:12",
    },
    {
      id: "ADUQ2189H1-0039",
      amount: "US $1,200.00",
      status: "Paid",
      due: "15 Jan 2023",
      created: "29 Dec, 14:22",
    },
    {
      id: "ADUQ2189H1-0040",
      amount: "US $3,500.00",
      status: "Paid",
      due: "20 Jan 2023",
      created: "30 Dec, 09:45",
    },
    {
      id: "ADUQ2189H1-0041",
      amount: "US $2,800.00",
      status: "Paid",
      due: "25 Jan 2023",
      created: "02 Jan, 11:30",
    },
  ];

  return (
    <div className="mx-auto box-content md:box-border">
      {/* Card */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="bg-white border border-gray-300 overflow-hidden rounded-2xl">
              {/* Header */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Recent Projects
                  </h2>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <a
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 text-black hover:bg-gray-50"
                      href="/dashboard/sales/invoice_view"
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
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View
                    </a>
                    <a
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 text-black hover:bg-gray-50"
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
                      Create
                    </a>
                  </div>
                </div>
              </div>
              {/* End Header */}

              {/* Table */}
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start w-[30%]">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Invoice number
                          </span>
                          <div className="hs-tooltip">
                            <div className="hs-tooltip-toggle">
                              <svg
                                className="shrink-0 size-4 text-gray-500"
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
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <path d="M12 17h.01" />
                              </svg>
                              <span
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs"
                                role="tooltip"
                              >
                                Invoice number related popup
                              </span>
                            </div>
                          </div>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start w-[15%]">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Amount
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start w-[15%]">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Status
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start w-[20%]">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Due
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start w-[20%]">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Created
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-3 whitespace-nowrap">
                          <a
                            href="/dashboard/sales/invoice"
                            className="block"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                          >
                            <span className="font-mono text-sm text-purple-600">
                              {project.id}
                            </span>
                          </a>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <a
                            href="/dashboard/sales/invoice"
                            className="block"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                          >
                            <span className="text-sm text-gray-600">
                              {formatCurrency(project.amount)}
                            </span>
                          </a>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <a
                            href="/dashboard/sales/invoice"
                            className="block"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                          >
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                              <svg
                                className="size-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              {project.status}
                            </span>
                          </a>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <a
                            href="/dashboard/sales/invoice"
                            className="block"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                          >
                            <span className="text-sm text-gray-600">
                              {project.due}
                            </span>
                          </a>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <a
                            href="/dashboard/sales/invoice"
                            className="block"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                          >
                            <span className="text-sm text-gray-600">
                              {project.created}
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* End Table */}
            </div>
          </div>
        </div>
      </div>
      {/* End Card */}
    </div>
  );
};

export default ProjectsTable;
