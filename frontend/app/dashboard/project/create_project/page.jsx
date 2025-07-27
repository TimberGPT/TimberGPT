"use client";

import Breadcrumb from "../../../../components/common/Breadcrumb";
import ProjectForm from "../_components/ProjectForm";

const Page = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Projects Overview", href: "/dashboard/project" }]}
        currentPage="Create a project"
      />

      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
        <ProjectForm isUpdateMode={false} />
      </div>
    </>
  );
};

export default Page;
