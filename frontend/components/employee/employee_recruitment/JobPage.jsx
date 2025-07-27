"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import JobDetail from "./JobDetail";
import JobApplicationForm from "./JobApplicationForm";
import JobApplicationConfirmation from "./JobApplicationConfirmation";

const JobPage = ({ job }) => {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState("");

  job = {
    id: "1",
    title: "Senior Backend Developer",
    department: "Engineering",
    date: "June 10, 2024",
    location: "Berlin, Germany",
    employmentType: "Full-time",
    salary: "€70,000 - €90,000/year",
    description:
      "We are looking for a Senior Backend Developer to join our growing engineering team. You will design, develop, and maintain scalable backend services for our SaaS platform. You will work closely with frontend developers, product managers, and DevOps to deliver high-quality solutions.",
    experienceLevel: "5+ years professional experience",
    requiredSkills: [
      "Python (Django, REST Framework)",
      "PostgreSQL or MySQL",
      "API design & development",
      "Unit testing & debugging",
      "Version control (Git)",
    ],
    preferredSkills: [
      "Docker & CI/CD pipelines",
      "Cloud platforms (AWS, Azure, or GCP)",
      "Microservices architecture",
      "GraphQL",
      "Experience mentoring junior developers",
    ],
  };

  const handleSubmit = async (data) => {
    // This would typically connect to an API endpoint
    console.log("Form data submitted:", data);

    setApplicantEmail(data.email);
    setApplicationSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (applicationSubmitted) {
    return (
      <JobApplicationConfirmation
        jobTitle={job?.title}
        email={applicantEmail}
      />
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      {/* <Breadcrumb
        items={[{ label: "Employee", href: "/dashboard/employee" }]}
        currentPage={"Job Recruitment"}
      /> */}

      {/* Job Detail Section */}
      <JobDetail job={job} />

      {/* Application Form Section */}
      <JobApplicationForm jobTitle={job?.title} onSubmit={handleSubmit} />
    </>
  );
};

export default JobPage;
