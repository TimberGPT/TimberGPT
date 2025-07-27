import StatsBox from "../../../components/dashboard/StatsBox";
import Navbar from "../../../components/common/Navbar";
import EmployeeStatContainer from "../../../components/employee/EmployeeStatContainer";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Navbar />
      <div class="flex items-center mx-auto py-[175px] justify-center flex-col gap-[50px] max-w-[1275px]">
        <EmployeeStatContainer />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.5rem] font-bold">Employees Details</h1>
            <Link
              href="/dashboard/employee/recruitment_posts"
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
            </Link>
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
              href="/dashboard/employee/employee_hierarchy"
              width="w-[250px]"
              variant="link"
            >
              Click here →
            </StatsBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
