import React from "react";
import { Users, Calendar, MapPin, CreditCard, Sun } from "lucide-react";

const JobDetail = ({ job }) => {
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-2 lg:pb-0 mx-auto">
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
        {/* Job Overview */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {job?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              {job?.department}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              {job?.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              {job?.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-gray-400" />
              {job?.employmentType}
            </span>
            {job?.salary && (
              <span className="inline-flex items-center gap-1">
                <Sun className="w-4 h-4 text-gray-400" />
                {job?.salary}
              </span>
            )}
          </div>
        </div>
        {/* End Job Overview */}

        {/* Job Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Job Description
          </h2>
          <p className="text-gray-700 text-sm">{job?.description}</p>
        </div>
        {/* End Job Description */}

        {/* Experience Level */}
        {job?.experienceLevel && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Experience Level
            </h2>
            <p className="text-gray-700 text-sm">{job?.experienceLevel}</p>
          </div>
        )}
        {/* End Experience Level */}

        {/* Required Skills */}
        {job?.requiredSkills && job?.requiredSkills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Required Skills
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {job?.requiredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {/* End Required Skills */}

        {/* Preferred Skills */}
        {job?.preferredSkills && job?.preferredSkills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Preferred Skills
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {job?.preferredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {/* End Preferred Skills */}
      </div>
    </div>
  );
};

export default JobDetail;
