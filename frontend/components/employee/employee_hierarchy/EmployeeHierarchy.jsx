"use client";

import Breadcrumb from "../../../components/common/Breadcrumb";
import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import TeamLevelContainer from "./TeamLevelContainer";

const EmployeeHierarchy = ({
  companyName = "Our Company",
  companyDescription = "Organization Structure",
}) => {
  const [expandedDepartments, setExpandedDepartments] = useState({});

  const toggleDepartment = (departmentId) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentId]: !prev[departmentId],
    }));
  };

  const organizationData = {
    executive: {
      title: "Executive Leadership",
      members: [
        {
          id: "ceo-1",
          name: "David Forren",
          role: "Founder / CEO",
          image:
            "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
          bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
          social: {
            twitter: "#",
            github: "#",
            linkedin: "#",
          },
        },
        {
          id: "cto-1",
          name: "Sarah Johnson",
          role: "CTO",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
          bio: "Leading our technical vision with over 15 years of experience in software development.",
          social: {
            twitter: "#",
            github: "#",
            linkedin: "#",
          },
        },
        {
          id: "coo-1",
          name: "Michael Chen",
          role: "COO",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
          bio: "Overseeing day-to-day administrative and operational functions with a focus on efficiency.",
          social: {
            twitter: "#",
            github: "#",
            linkedin: "#",
          },
        },
      ],
    },
    departments: [
      {
        id: "eng-dept",
        name: "Engineering",
        head: {
          id: "eng-head-1",
          name: "Alicia Torres",
          role: "VP of Engineering",
          image:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
          bio: "Building the technological foundation of our products with innovation and precision.",
          social: {
            twitter: "#",
            github: "#",
            linkedin: "#",
          },
        },
        teams: [
          {
            name: "Frontend Team",
            members: [
              {
                id: "fe-1",
                name: "Jason Miller",
                role: "Lead Frontend Developer",
                image:
                  "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
                bio: "Creating beautiful and intuitive user experiences with modern web technologies.",
                social: {
                  twitter: "#",
                  github: "#",
                  linkedin: "#",
                },
              },
              {
                id: "fe-2",
                name: "Emily Nguyen",
                role: "UI/UX Designer",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
                bio: "Crafting user-friendly interfaces that delight our customers.",
                social: {
                  twitter: "#",
                  github: "#",
                  linkedin: "#",
                },
              },
            ],
          },
          {
            name: "Backend Team",
            members: [
              {
                id: "be-1",
                name: "Robert Jackson",
                role: "Lead Backend Developer",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
                bio: "Building robust backend systems that scale with our growing user base.",
                social: {
                  twitter: "#",
                  github: "#",
                  linkedin: "#",
                },
              },
              {
                id: "be-2",
                name: "Priya Patel",
                role: "Database Engineer",
                image:
                  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
                bio: "Optimizing data structure and flow for maximum performance.",
                social: {
                  twitter: "#",
                  github: "#",
                  linkedin: "#",
                },
              },
            ],
          },
        ],
      },
      {
        id: "marketing-dept",
        name: "Marketing",
        head: {
          id: "marketing-head-1",
          name: "James Wilson",
          role: "Marketing Director",
          image:
            "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
          bio: "Driving our brand presence and customer engagement strategies.",
          social: {
            twitter: "#",
            github: "#",
            linkedin: "#",
          },
        },
        teams: [
          {
            name: "Content Team",
            members: [
              {
                id: "content-1",
                name: "Sophia Lee",
                role: "Head of Content",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
                bio: "Creating compelling stories that connect with our audience.",
                social: {
                  twitter: "#",
                  github: "#",
                  linkedin: "#",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Employee", href: "/dashboard/employee" }]}
        currentPage="Employee Hierarchy"
      />

      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 mt-8">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          {companyName}
        </h2>
        <p className="mt-1 text-gray-600">{companyDescription}</p>
      </div>
      {/* End Title */}

      {/* Executive Leadership */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 pb-2">
          {organizationData.executive.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {organizationData.executive.members.map((executive) => (
            <EmployeeCard
              key={executive.id}
              employee={executive}
              isLeadership
            />
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="space-y-12">
        {organizationData.departments.map((department) => (
          <div
            key={department.id}
            className="border border-gray-200 rounded-xl p-6"
          >
            <div
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleDepartment(department.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {department.name} Department
              </h3>
              <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-700">
                  {expandedDepartments[department.id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Department Head */}
            <div className="mb-8">
              <EmployeeCard employee={department.head} isDepartmentHead />
            </div>

            {/* Teams */}
            {expandedDepartments[department.id] && (
              <div className="space-y-8">
                {department.teams.map((team, index) => (
                  <TeamLevelContainer key={index} team={team} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hiring CTA */}
      <div className="mt-12">
        <a
          className="group flex flex-col justify-center text-center rounded-xl p-4 md:p-6 border border-dashed border-gray-200 hover:shadow-2xs focus:outline-hidden focus:shadow-2xs"
          href="#"
        >
          <h3 className="text-lg text-gray-800">We are hiring!</h3>
          <div>
            <span className="inline-flex items-center gap-x-2 text-blue-600 group-hover:text-blue-700 group-focus:text-blue-700">
              See all opening positions
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default EmployeeHierarchy;
