"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  useGetJobPostsQuery,
  useUploadCVQuery,
  useApplyJobMutation,
} from "../../../redux/api/hrApi";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const JobApplyPage = () => {
  const { jobId } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cv_pdf: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const { data: jobPostLists = [], isLoading } = useGetJobPostsQuery({});
  const jobPostDetails = jobPostLists?.find(
    (job) => String(job.id) === String(jobId)
  );

  const { data: s3UploadInfo, refetch: refetchS3 } = useUploadCVQuery(
    {},
    { skip: !form.cv_pdf }
  );

  const [applyJob] = useApplyJobMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv_pdf") {
      setForm((prev) => ({ ...prev, cv_pdf: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!s3UploadInfo?.presigned_url || !form.cv_pdf) {
        toast.error("Could not get upload URL or file missing.");
        setSubmitting(false);
        return;
      }

      const putRes = await fetch(s3UploadInfo.presigned_url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: form.cv_pdf,
      });

      if (!putRes.ok) {
        toast.error("Failed to upload CV to server.");
        setSubmitting(false);
        return;
      }

      const payload = {
        job_id: jobId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        cv_pdf: s3UploadInfo.object_name,
      };

      const res = await applyJob(payload).unwrap();
      console.log(res);

      toast.success("Application submitted!");
      setForm({ name: "", email: "", phone: "", cv_pdf: null });
    } catch (err) {
      toast.error("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow p-8">
        {isLoading ? (
          <LoadingSpinner size="large" />
        ) : jobPostDetails ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {jobPostDetails.title}
              </h1>
              <p className="text-gray-700 mb-1">
                {jobPostDetails.location} &middot;{" "}
                {jobPostDetails.employement_type}
              </p>
              <p className="text-gray-600 mb-2">{jobPostDetails.salary}</p>
              <p className="text-gray-500 text-sm mb-2">
                {jobPostDetails.job_description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs mb-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {jobPostDetails.experience_level}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {jobPostDetails.role_apply}
                </span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border rounded px-3 py-2"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full border rounded px-3 py-2"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your phone number"
                  className="w-full border rounded px-3 py-2"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Resume (PDF)
                </label>
                <input
                  type="file"
                  name="cv_pdf"
                  accept="application/pdf"
                  className="w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </>
        ) : (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Job Details
            </h1>
            <p className="text-gray-500">Loading job information...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplyPage;
