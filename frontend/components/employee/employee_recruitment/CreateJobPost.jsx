"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import CustomTextarea from "../../../components/form/CustomTextarea";
import CustomSelect from "../../../components/form/CustomSelect";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { useRouter } from "next/navigation";
import { useCreateJobPostMutation } from "../../../redux/api/hrApi";
import toast from "react-hot-toast";

const jobPostSchema = z.object({
  title: z.string().min(1),
  job_description: z.string().min(50),
  role_apply: z.string().min(1),
  prefered_engagement: z.string().min(1),
  skill_require: z.string().min(1),
  skill_prefer: z.string().min(1),
  experience_level: z.string().min(1),
  location: z.string().min(1),
  employement_type: z.string().min(1),
  salary: z.string().optional(),
  end_date: z.string().min(1),
});

const employmentTypes = [
  { value: "", label: "Select type" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Temporary", label: "Temporary" },
];

const CreateJobPost = () => {
  const router = useRouter();
  const [createJobPost] = useCreateJobPostMutation();

  const handleSubmit = async (data) => {
    const toastId = toast.loading("Creating job post...");
    try {
      const now = new Date();
      const endDate = new Date(data.end_date);
      const payload = {
        title: data.title,
        job_description: data.job_description,
        role_apply: data.role_apply,
        prefered_engagement: data.prefered_engagement,
        skill_require: data.skill_require,
        skill_prefer: data.skill_prefer,
        experience_level: data.experience_level,
        location: data.location,
        employement_type: data.employement_type,
        salary: data.salary || "",
        created_at: now.toISOString(),
        end_date: endDate.toISOString(),
      };
      await createJobPost(payload).unwrap();
      toast.success("Job post created successfully!", { id: toastId });
      router.push("/dashboard/employee/recruitment_posts");
    } catch (error) {
      toast.error("Failed to create job post", { id: toastId });
    }
  };

  return (
    <>
      <Breadcrumb
        items={[{ label: "Employee", href: "/dashboard/employee" }]}
        currentPage="Create Job Requirement"
      />
      <div className="max-w-4xl px-4 py-10 mb-10 sm:px-6 lg:px-8 lg:pt-2 lg:pb-0 mx-auto">
        <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            New Job Requirement
          </h1>
          <CustomForm
            onSubmit={handleSubmit}
            resolver={zodResolver(jobPostSchema)}
            defaultValues={{
              title: "",
              job_description: "",
              role_apply: "",
              prefered_engagement: "",
              skill_require: "",
              skill_prefer: "",
              experience_level: "",
              location: "",
              employement_type: "",
              salary: "",
              end_date: "",
            }}
          >
            <div className="mb-5">
              <label
                htmlFor="job-title"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Job Title
              </label>
              <CustomInput
                name="title"
                id="job-title"
                placeholder="e.g., Frontend Developer"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="role-apply"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Role Apply
              </label>
              <CustomInput
                name="role_apply"
                id="role-apply"
                placeholder="e.g., Software Engineer"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="preferred-engagement"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Preferred Engagement
              </label>
              <CustomTextarea
                name="prefered_engagement"
                id="preferred-engagement"
                rows={2}
                placeholder="Describe preferred engagement terms"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="job-description"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Job Description
              </label>
              <CustomTextarea
                name="job_description"
                id="job-description"
                rows={4}
                placeholder="Summary of duties, expectations, and context"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="required-skills"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Required Skills
              </label>
              <CustomTextarea
                name="skill_require"
                id="required-skills"
                rows={2}
                placeholder="List must-have skills, separated by commas"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="preferred-skills"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Preferred Skills
              </label>
              <CustomTextarea
                name="skill_prefer"
                id="preferred-skills"
                rows={2}
                placeholder="List nice-to-have skills, separated by commas"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="experience-level"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Experience Level
              </label>
              <CustomInput
                name="experience_level"
                id="experience-level"
                placeholder="e.g., Entry, Mid, Senior, 3+ years"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex flex-row gap-4 mb-5">
              <div className="w-1/2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Location
                </label>
                <CustomInput
                  name="location"
                  id="location"
                  placeholder="e.g., Berlin, Germany or Remote"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="employment-type"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Employment Type
                </label>
                <CustomSelect
                  name="employement_type"
                  id="employment-type"
                  options={employmentTypes}
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 mb-8">
              <div className="w-1/2">
                <label
                  htmlFor="salary-range"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Salary Range (optional)
                </label>
                <CustomInput
                  name="salary"
                  id="salary-range"
                  placeholder="e.g., €70,000 - €90,000/year"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="posted-date"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  End Date
                </label>
                <CustomInput
                  name="end_date"
                  id="posted-date"
                  type="date"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg shadow-2xs sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Start and Publish
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/employee")}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-400 text-white hover:bg-gray-500 focus:outline-hidden focus:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              >
                Cancel
              </button>
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default CreateJobPost;
