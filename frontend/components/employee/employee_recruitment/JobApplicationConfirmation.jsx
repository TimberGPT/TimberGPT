import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const JobApplicationConfirmation = ({
  jobTitle,
  email,
  nextSteps = [
    "Our hiring team will review your application",
    "We'll email you to confirm whether you've been shortlisted",
    "Shortlisted candidates will be invited for an interview",
  ],
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Application Submitted!
        </h1>

        <p className="text-gray-600 mb-6">
          {jobTitle
            ? `Thank you for applying for the ${jobTitle} position.`
            : "Thank you for submitting your application."}
          {email && ` We've sent a confirmation to ${email}.`}
        </p>

        {nextSteps && nextSteps.length > 0 && (
          <div className="max-w-md mx-auto mb-6 text-left">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Next steps:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link
            href="/jobs"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-gray-200 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            View other openings
          </Link>

          <Link
            href="/"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-purple-600 font-medium text-white hover:bg-purple-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Return to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationConfirmation;
