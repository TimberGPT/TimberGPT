"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../components/form/CustomInput";
import CustomTextarea from "../../../../components/form/CustomTextarea";
import CustomFileInput from "../../../../components/form/CustomFileInput";
import CustomForm from "../../../../components/form/CustomForm";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  useUpdateProfileMutation,
  useGetMyProfileQuery,
} from "../../../../redux/api/profileApi";

const profileSchema = z.object({
  profile_photo: z.any(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone_no: z.string().min(1, "Phone number is required"),
  dob: z.string().optional(),
  bio: z.string().optional(),
});

const ProfileSettings = () => {
  const [imagePreview, setImagePreview] = useState(
    "https://preline.co/assets/img/160x160/img1.jpg"
  );

  // Get profile data
  const { data: profileData, isLoading } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const formRef = useRef(null);

  console.log(profileData);

  useEffect(() => {
    if (profileData?.profile_photo) {
      setImagePreview(profileData.profile_photo);
    }
  }, [profileData]);

  const handleImageChange = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Update profile info
  const handleSubmit = async (data) => {
    const toastId = toast.loading("Updating profile...");

    try {
      const formData = {
        name: data.name,
        phone_no: data.phone_no,
        dob: data.dob || "",
        bio: data.bio || "",
        photo: "https://i.ibb.co/zW6RJFbs/Frame-63.png",
      };

      const res = await updateProfile(formData).unwrap();
      console.log(res);
      toast.success("Profile updated successfully!", { id: toastId });

      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        id: toastId,
      });
    }
  };

  const defaultValues = profileData
    ? {
        profile_photo: null,
        name: profileData.name || "",
        email: profileData.email || "",
        phone_no: profileData.phone_no || "",
        dob: profileData.dob || "",
        bio: profileData.bio || "",
      }
    : {
        profile_photo: null,
        name: "",
        email: "",
        phone_no: "",
        dob: "",
        bio: "",
      };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xs p-4 sm:p-7">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Profile</h2>
        <p className="text-sm text-gray-600">
          Manage your name, password and account settings.
        </p>
      </div>

      <CustomForm
        ref={formRef}
        onSubmit={handleSubmit}
        onError={(errors) => {
          console.error("Form validation errors:", errors);
        }}
        resolver={zodResolver(profileSchema)}
        defaultValues={defaultValues}
      >
        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
          {/* Profile Photo */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Profile photo
              <span className="font-bold text-red-600">*</span>
            </label>
          </div>
          <div className="sm:col-span-9">
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16">
                <Image
                  className="rounded-full ring-2 ring-white object-cover"
                  src={imagePreview}
                  alt="Avatar"
                  fill
                  sizes="64px"
                  priority
                />
              </div>
              <CustomFileInput
                name="profile_photo"
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Name */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Name
              <span className="font-bold text-red-600">*</span>
            </label>
          </div>
          <div className="sm:col-span-9">
            <CustomInput
              name="name"
              placeholder="Your name"
              required
              className="w-full"
            />
          </div>

          {/* Email section */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Email
            </label>
          </div>
          <div className="sm:col-span-9">
            <CustomInput
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full"
              disabled={true}
              readOnly={true}
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-3">
            <div className="inline-block">
              <label className="inline-block text-sm text-gray-800 mt-2.5">
                Phone
                <span className="font-bold text-red-600">*</span>
              </label>
            </div>
          </div>
          <div className="sm:col-span-9">
            <CustomInput
              name="phone_no"
              placeholder="+x(xxx)xxx-xx-xx"
              required
              className="w-full"
            />
          </div>

          {/* Date of Birth */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              Date of Birth
            </label>
          </div>
          <div className="sm:col-span-9">
            <CustomInput name="dob" type="date" className="w-full" />
          </div>

          {/* Bio */}
          <div className="sm:col-span-3">
            <label className="inline-block text-sm text-gray-800 mt-2.5">
              BIO
            </label>
          </div>
          <div className="sm:col-span-9">
            <CustomTextarea
              name="bio"
              placeholder="Type your bio"
              rows={5}
              maxLength={500}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-x-2">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50"
            onClick={() => window.location.reload()}
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

export default ProfileSettings;
