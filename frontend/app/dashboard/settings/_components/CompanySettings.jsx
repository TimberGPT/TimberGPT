"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../components/form/CustomInput";
import CustomSelect from "../../../../components/form/CustomSelect";
import CustomTextarea from "../../../../components/form/CustomTextarea";
import CustomFileInput from "../../../../components/form/CustomFileInput";
import CustomForm from "../../../../components/form/CustomForm";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRegisterCompanyMutation } from "../../../../redux/api/companyApi";
import { useRouter } from "next/navigation";
import { logout } from "../../../../actions/auth";
import { removeFromLocalStorage } from "../../../../utils/local-storage";
import { useGetMycompanyQuery } from "../../../../redux/api/companyApi";
import { useUpdateCompanyInfoMutation } from "../../../../redux/api/companyApi";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

const companySchema = z.object({
  logo_url: z.any(),
  name: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  industry_type: z.string().min(1, "Industry type is required"),
  founding_year: z.string().min(1, "Founding year is required"),
  website_url: z.string().url().optional(),
  monthly_target: z.string().min(0),
  problem_solve: z.string().optional(),
  how_work: z.string().optional(),
});

const CompanySettings = ({ companyId }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(
    "https://preline.co/assets/img/160x160/img1.jpg"
  );

  const [registerCompany] = useRegisterCompanyMutation();
  const [updateCompanyInfo] = useUpdateCompanyInfoMutation();
  const { data: companyData, isLoading } = useGetMycompanyQuery({
    id: companyId,
  });

  const defaultValues = companyData
    ? {
        logo_url: companyData.logo_url || null,
        name: companyData.name || "",
        location: companyData.location || "",
        industry_type: companyData.industry_type || "",
        founding_year: companyData.founding_year?.toString() || "",
        website_url: companyData.website_url || "",
        monthly_target: companyData.monthly_target.toString() || 0,
        problem_solve: companyData.problem_solve || "",
        how_work: companyData.how_work || "",
      }
    : {
        logo_url: null,
        name: "",
        location: "",
        industry_type: "",
        founding_year: "",
        website_url: "",
        monthly_target: 0,
        problem_solve: "",
        how_work: "",
      };

  const handleImageChange = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (data) => {
    const toastId = toast.loading(
      companyId ? "Updating company..." : "Creating company..."
    );

    try {
      const formData = {
        name: data.name,
        location: data.location,
        industry_type: data.industry_type,
        founding_year: Number(data.founding_year),
        problem_solve: data.problem_solve || "",
        how_work: data.how_work || "",
        website_url: data.website_url || "",
        monthly_target: Number(data.monthly_target),
        logo_url: "https://i.ibb.co/zW6RJFbs/Frame-63.png",
        primary_color: "#6941C6",
        secondary_color: "#E9D7FE",
      };

      if (companyId) {
        await updateCompanyInfo({ data: formData, id: companyId }).unwrap();
        toast.success("Company updated successfully!", { id: toastId });
        window.location.reload();
      } else {
        await registerCompany(formData).unwrap();
        toast.success("Company created successfully!", { id: toastId });

        try {
          removeFromLocalStorage(process.env.NEXT_PUBLIC_AUTH_KEY);
          await logout();
          router.push("/login");
        } catch (logoutError) {
          console.error("Logout failed:", logoutError);
        }
      }
    } catch (error) {
      console.error("Failed to handle company data:", error);
      toast.error(
        `Failed to ${
          companyId ? "update" : "create"
        } company. Please try again.`,
        { id: toastId }
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Company</h2>
        <p className="text-sm text-gray-600">
          Manage your company details and branding settings.
        </p>
      </div>

      <CustomForm
        onSubmit={handleSubmit}
        onError={(errors) => {
          console.error("Form validation errors:", errors);
        }}
        resolver={zodResolver(companySchema)}
        defaultValues={defaultValues}
      >
        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          {/* Company Logo */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Company logo
              <span className="font-bold text-red-600">*</span>
            </label>
          </div>
          <div className="sm:col-span-9">
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16">
                <Image
                  className="rounded-lg ring-2 ring-white object-cover"
                  src={imagePreview}
                  alt="Company Logo"
                  fill
                  sizes="64px"
                  priority
                />
              </div>
              <CustomFileInput
                name="logo_url"
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Company name
              <span className="font-bold text-red-600">*</span>
            </label>
          </div>
          <div className="sm:col-span-9">
            <CustomInput
              name="name"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Location & Industry Type */}
          <div className="sm:col-span-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Location
                  <span className="font-bold text-red-600">*</span>
                </label>
                <CustomInput
                  name="location"
                  placeholder="Enter company location"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Industry type
                  <span className="font-bold text-red-600">*</span>
                </label>
                <CustomSelect
                  name="industry_type"
                  placeholder="Select industry"
                  options={[
                    "Technology",
                    "Healthcare",
                    "Finance",
                    "Education",
                    "Other",
                  ]}
                  required
                />
              </div>
            </div>
          </div>

          {/* Founding Year & Website URL */}
          <div className="sm:col-span-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Founding Year
                  <span className="font-bold text-red-600">*</span>
                </label>
                <CustomInput
                  name="founding_year"
                  type="number"
                  placeholder="e.g. 2020"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Website URL
                </label>
                <CustomInput
                  name="website_url"
                  type="url"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Monthly Target */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Monthly Target
              <span className="font-bold text-red-600">*</span>
            </label>
          </div>
          <div className="sm:col-span-9">
            <CustomInput
              name="monthly_target"
              type="number"
              placeholder="Enter monthly target"
              required
            />
          </div>

          {/* Problem Solve & How Work */}
          <div className="sm:col-span-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  What problem do you solve?
                </label>
                <CustomTextarea
                  name="problem_solve"
                  placeholder="Describe the problem your company solves"
                  rows={3}
                  maxLength={500}
                />
              </div>
              <div className="flex-1">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  How does your company work?
                </label>
                <CustomTextarea
                  name="how_work"
                  placeholder="Describe how your company operates"
                  rows={3}
                  maxLength={500}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-x-2">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-700 text-white hover:bg-purple-800"
          >
            Save changes
          </button>
        </div>
      </CustomForm>
    </div>
  );
};

export default CompanySettings;
