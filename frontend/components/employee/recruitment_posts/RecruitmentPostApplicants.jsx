"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "../../common/Breadcrumb";
import ApplicantTable from "./ApplicantTable";
import Image from "next/image";
import {
  useGetJobApplicantsQuery,
  useGetJobPostsQuery,
  useSendMailMutation,
} from "../../../redux/api/hrApi";
import toast from "react-hot-toast";

const RecruitmentPostApplicants = ({ postId }) => {
  const [checkedApplicants, setCheckedApplicants] = useState([]);
  const [emailMessage, setEmailMessage] = useState("");

  const { data: applicantList = [] } = useGetJobApplicantsQuery({ id: postId });
  const { data: jobPostLists } = useGetJobPostsQuery({});
  const [sendMail] = useSendMailMutation();

  const jobPostDetails = jobPostLists?.find(
    (job) => String(job.id) === String(postId)
  );

  const createdAt = jobPostDetails?.created_at
    ? new Date(jobPostDetails.created_at)
    : null;

  let daysAgoText = "";
  if (createdAt) {
    const now = new Date();
    const diffTime = now.setHours(0, 0, 0, 0) - createdAt.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) daysAgoText = "Today";
    else if (diffDays === 1) daysAgoText = "1 day ago";
    else daysAgoText = `${diffDays} days ago`;
  }

  const currentItems = applicantList;

  const handleCheckboxChange = (id) => {
    setCheckedApplicants((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const handleSendEmail = async () => {
    const selectedApplicants = applicantList.filter((a) =>
      checkedApplicants.includes(a.id)
    );
    const receivers = selectedApplicants.map((applicant) => applicant?.email);

    if (receivers.length === 0) {
      return;
    }

    try {
      await sendMail({
        subject: "Regarding Your Job Application",
        body: emailMessage,
        receivers,
      }).unwrap();

      setCheckedApplicants([]);
      setEmailMessage("");

      toast.success("Email sent successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const title = jobPostDetails?.title || "Recruitment Post";
  const startDate = jobPostDetails?.created_at
    ? new Date(jobPostDetails.created_at).toLocaleDateString()
    : "";

  return (
    <div className="bg-bg-color min-h-screen pb-12">
      <Breadcrumb
        items={[
          { label: "Employee", href: "/dashboard/employee" },
          {
            label: "Recruitment Posts",
            href: "/dashboard/employee/recruitment_posts",
          },
        ]}
        currentPage="Applicants"
      />

      <div className="max-w-[85rem] px-4 mx-auto mt-6 mb-2">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Started on: <span className="font-medium">{startDate}</span>
              &middot;
              <span className="text-primary font-semibold">{daysAgoText}</span>
            </p>
          </div>
          <div>
            <Link
              href={`/apply/${jobPostDetails?.id}`}
              target="_blank"
              className="text-[1rem] font-medium text-black no-underline flex items-center gap-3"
            >
              Go to the form
              <Image
                src="https://i.ibb.co.com/gbNMx7dC/redirect.png"
                alt="Redirect"
                width={12}
                height={11.5}
              />
            </Link>
          </div>
        </div>
      </div>

      {checkedApplicants.length > 0 && (
        <div className="max-w-[85rem] px-4 mx-auto mt-4 mb-2">
          <div className="bg-white rounded-xl shadow p-6 flex flex-wrap items-center gap-4">
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 flex-1 min-w-[200px]"
              placeholder="Type your email message"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendEmail}
              disabled={!emailMessage.trim()}
            >
              Send Email
            </button>
          </div>
        </div>
      )}

      <ApplicantTable
        currentItems={currentItems}
        checkedApplicants={checkedApplicants}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default RecruitmentPostApplicants;
