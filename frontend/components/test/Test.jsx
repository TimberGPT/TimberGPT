import React from "react";
import Navbar from "../common/Navbar";
import ProjectStatsCard from "../dashboard/ProjectStatsCard";
import StatsBox from "../dashboard/StatsBox";
import Image from "next/image";

const Test = () => {
  return (
    <>
      <Navbar />
      {/* <!-- Nav Bar Ends--> */}

      {/* <!-- Main Content Starts--> */}
      <div className="flex items-center mx-auto py-[175px] justify-center flex-col gap-[50px] max-w-[1275px]">
        {/* <!-- Stats Container Starts--> */}
        <div className="flex gap-[75px]">
          <ProjectStatsCard
            highlightNumber="25"
            highlightTitle={
              <>
                Completed
                <br />
                Projects
              </>
            }
            topRightTitle="Running Project"
            topRightValue="1"
            bottomRightTitle="Cancelled Project"
            bottomRightValue="1"
          />

          <ProjectStatsCard
            highlightNumber="10"
            highlightTitle={
              <>
                Completed
                <br />
                Projects
              </>
            }
            topRightTitle="Running Project"
            topRightValue="1"
            bottomRightTitle="Cancelled Project"
            bottomRightValue="1"
          />
        </div>
        {/* <!-- Stats Container Ends--> */}

        {/* <!-- Project Overview Starts--> */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.5rem] font-bold">Projects Overview</h1>
            <a
              href="#"
              className="text-[1.5rem] font-semibold text-black no-underline flex items-center gap-5"
            >
              Add a project
              <Image
                src="https://i.ibb.co.com/gbNMx7dC/redirect.png"
                alt="Redirect"
                width={18}
                height={18}
                className="object-contain"
              />
            </a>
          </div>

          <div className="flex gap-6">
            <StatsBox title="This Week">2</StatsBox>

            <StatsBox title={"This Week"}>2</StatsBox>

            <StatsBox title={"This Week"}>2</StatsBox>

            <StatsBox
              title="Project Dashboard"
              href="#"
              width="w-[250px]"
              variant="link"
            >
              Click here →
            </StatsBox>
          </div>
        </div>
        {/* <!-- Project Overview Ends--> */}

        {/* <!-- Earning Summary Starts--> */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.5rem] font-bold">Projects Overview</h1>
            <a
              href="#"
              className="text-[1.5rem] font-semibold text-black no-underline flex items-center gap-5"
            >
              Add a project
              <Image
                src="https://i.ibb.co.com/gbNMx7dC/redirect.png"
                alt="Redirect"
                width={18}
                height={18}
                className="object-contain"
              />
            </a>
          </div>

          <div className="flex gap-6">
            <StatsBox title="This Week">2</StatsBox>

            <StatsBox title={"This Week"}>2</StatsBox>

            <StatsBox title={"This Week"}>2</StatsBox>

            <StatsBox
              title="Project Dashboard"
              href="#"
              width="w-[250px]"
              variant="link"
            >
              Click here →
            </StatsBox>
          </div>
        </div>
        {/* <!-- Earning Summary Ends--> */}

        {/* <!-- Employee Details Starts--> */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.5rem] font-bold">Employees Details</h1>
            <a
              href="#"
              className="text-[1.5rem] font-semibold text-black no-underline flex items-center gap-5"
            >
              Recruit a member
              <Image
                src="https://i.ibb.co.com/gbNMx7dC/redirect.png"
                alt="Redirect"
                width={18}
                height={18}
                className="object-contain"
              />
            </a>
          </div>

          <div className="flex gap-6">
            <StatsBox title="Members" variant="avatar">
              <div className="flex -space-x-2">
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                  alt="Avatar"
                />
              </div>
            </StatsBox>

            <StatsBox title="New Members" variant="avatar">
              <div className="flex -space-x-2">
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                  alt="Avatar"
                />
              </div>
            </StatsBox>

            <StatsBox title="Recruit Applicants" variant="avatar" blur={true}>
              <div className="flex -space-x-2">
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <img
                  className="inline-block size-11 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                  alt="Avatar"
                />
              </div>
            </StatsBox>

            <StatsBox
              title="See Hierarchy"
              href="#"
              width="w-[250px]"
              variant="link"
            >
              Click here →
            </StatsBox>
          </div>
        </div>
        {/* <!-- Employee Details Ends--> */}
      </div>
      {/* <!-- Main Content Ends--> */}
    </>
  );
};

export default Test;
