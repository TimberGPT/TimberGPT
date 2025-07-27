"use client";

import React from "react";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomFileInput from "@/components/form/CustomFileInput";
import CustomTextarea from "@/components/form/CustomTextarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation constants
const MAX_FILE_SIZE = 5242880; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

// Define the validation schema using Zod
const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  resume: z
    .instanceof(File)
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only PDF, JPEG, JPG and PNG files are accepted"
    )
    .nullable()
    .optional(),
  personalSummary: z
    .string()
    .min(50, "Summary must be at least 50 characters long")
    .max(1000, "Summary must be less than 1000 characters"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

const JobApplicationForm = ({ jobTitle, onSubmit }) => {
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(applicationSchema)}
          defaultValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            personalSummary: "",
            agreeToTerms: false,
          }}
        >
          {/* Section: Personal Info */}
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
            <div className="sm:col-span-12">
              <h2 className="text-lg font-semibold text-gray-800">
                Submit your application{jobTitle && ` for ${jobTitle}`}
              </h2>
            </div>

            <div className="sm:col-span-3">
              <label className="inline-block text-sm font-medium text-gray-500 mt-2.5">
                Full name
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="sm:flex gap-4">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <CustomInput
                    name="firstName"
                    placeholder="First name"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <CustomInput
                    name="lastName"
                    placeholder="Last name"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="inline-block text-sm font-medium text-gray-500 mt-2.5">
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <CustomInput
                name="email"
                type="email"
                placeholder="your@email.com"
                className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="inline-block text-sm font-medium text-gray-500 mt-2.5">
                Phone
              </label>
            </div>

            <div className="sm:col-span-9">
              <CustomInput
                name="phone"
                placeholder="Your phone number"
                className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
          {/* End Section: Personal Info */}

          {/* Section: Profile */}
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
            <div className="sm:col-span-12">
              <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
            </div>

            <div className="sm:col-span-3">
              <label className="inline-block text-sm font-medium text-gray-500 mt-2.5">
                Resume/CV
              </label>
            </div>

            <div className="sm:col-span-9">
              <CustomFileInput
                name="resume"
                accept="application/pdf,image/jpeg,image/png,image/jpg"
                placeholder="Upload your resume or CV"
                className="block w-full border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="sm:col-span-3">
              <div className="inline-block">
                <label className="inline-block text-sm font-medium text-gray-500 mt-2.5">
                  Personal summary
                </label>
              </div>
            </div>

            <div className="sm:col-span-9">
              <CustomTextarea
                name="personalSummary"
                rows={6}
                placeholder="Add a cover letter or anything else you want to share."
                maxLength={1000}
                className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
          {/* End Section: Profile */}

          {/* Section: Submit application */}
          <div className="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Submit application
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              In order to contact you with future jobs that you may be
              interested in, we need to store your personal data.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              If you are happy for us to do so please click the checkbox
              below.
            </p>

            <div className="mt-5 flex">
              <CustomInput
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                className="shrink-0 mt-0.5 border-gray-300 rounded-sm text-purple-600 checked:border-purple-600 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none"
              />
              <label
                htmlFor="agreeToTerms"
                className="text-sm text-gray-500 ms-2"
              >
                Allow us to process your personal information.
              </label>
            </div>
          </div>
          {/* End Section: Submit application */}

          <button
            type="submit"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Submit application
          </button>
        </CustomForm>
      </div>
    </div>
  );
};

export default JobApplicationForm;
