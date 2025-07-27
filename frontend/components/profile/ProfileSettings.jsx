"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomTextarea from "@/components/form/CustomTextarea";
import CustomSelect from "@/components/form/CustomSelect";
import CustomRadioGroup from "@/components/form/CustomRadioGroup";
import Image from "next/image";
import Breadcrumb from "../common/Breadcrumb";

// Validation schema using Zod
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  phone: z.string().optional(),
  phoneType: z.string().optional(),
  gender: z.enum(["male", "female"]),
  bio: z.string().optional(),
});

const ProfileSettings = ({ userData, onSubmit }) => {
  const [profileImage, setProfileImage] = useState(
    userData?.profileImage || "https://preline.co/assets/img/160x160/img1.jpg"
  );

  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    if (onSubmit) {
      onSubmit({ ...data, profileImage });
    }
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    // Add any additional cancel logic here
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server/CDN
      // For now, we'll create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const phoneTypes = [
    { value: "mobile", label: "Mobile" },
    { value: "home", label: "Home" },
    { value: "work", label: "Work" },
    { value: "fax", label: "Fax" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const defaultValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    currentPassword: "",
    newPassword: "",
    phone: userData?.phone || "",
    phoneType: userData?.phoneType || "mobile",
    gender: userData?.gender || "male",
    bio: userData?.bio || "",
  };

  return (
    <>
      <Breadcrumb
        items={[{ label: "Settings", href: "/dashboard/setings" }]}
        currentPage="Profile Settings"
      />

      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
            <p className="text-sm text-gray-600">
              Manage your name, password and account settings.
            </p>
          </div>

          <CustomForm
            onSubmit={handleFormSubmit}
            resolver={zodResolver(profileSchema)}
            defaultValues={defaultValues}
          >
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Profile photo
                </label>
              </div>

              {/* Profile picture */}
              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Image
                    className="inline-block size-16 rounded-full ring-2 ring-white"
                    src={profileImage}
                    alt="Avatar"
                    width={64}
                    height={64}
                  />
                  <div className="flex gap-x-2">
                    <div>
                      <label
                        htmlFor="profile-photo-upload"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 cursor-pointer"
                      >
                        <Upload className="shrink-0 size-4" />
                        Upload photo
                        <input
                          id="profile-photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Full name
                </label>
              </div>

              {/* Full name */}
              <div className="sm:col-span-9">
                <div className="grid sm:grid-cols-2 gap-4">
                  <CustomInput
                    name="firstName"
                    placeholder="First name"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-md sm:text-sm focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                  <CustomInput
                    name="lastName"
                    placeholder="Last name"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-md sm:text-sm focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Email
                </label>
              </div>

              {/* Email */}
              <div className="sm:col-span-9">
                <CustomInput
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="currentPassword"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Password
                </label>
              </div>

              {/* password */}
              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <CustomInput
                    name="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                  <CustomInput
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="phone"
                    className="inline-block text-sm text-gray-800 mt-2.5"
                  >
                    Phone
                  </label>
                  <span className="text-sm text-gray-400"> (Optional) </span>
                </div>
              </div>

              {/* Phone */}
              <div className="sm:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-2 sm:gap-4">
                  <CustomInput
                    name="phone"
                    placeholder="+x(xxx)xxx-xx-xx"
                    className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-md sm:text-sm focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <CustomSelect
                    name="phoneType"
                    options={phoneTypes}
                    className="py-1.5 sm:py-2 px-3 pe-9 block w-full sm:w-auto min-w-[120px] border-gray-200 shadow-2xs rounded-md sm:text-sm focus:z-10 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Gender
                </label>
              </div>

              <div className="sm:col-span-9">
                <CustomRadioGroup name="gender" options={genderOptions} />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="bio"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  BIO
                </label>
              </div>

              <div className="sm:col-span-9">
                <CustomTextarea
                  name="bio"
                  rows={6}
                  placeholder="Type your message..."
                  className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
            {/* End Grid */}

            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
