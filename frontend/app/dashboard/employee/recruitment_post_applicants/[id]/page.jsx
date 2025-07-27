"use client";

import { useParams } from "next/navigation";
import RecruitmentPostApplicants from "../../../../../components/employee/recruitment_posts/RecruitmentPostApplicants";

const Page = () => {
  const params = useParams();
  const postId = params.id;

  return <RecruitmentPostApplicants postId={postId} />;
};

export default Page;
