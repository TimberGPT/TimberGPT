import Navbar from "../../../components/common/Navbar";
import StatsBox from "../../../components/dashboard/StatsBox";
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
            <h1 className="text-[1.5rem] font-bold">Earning Summary</h1>
            <Link
              href="/dashboard/sales/invoice_form"
              className="text-[1.5rem] font-semibold text-black no-underline flex items-center gap-5"
            >
              Make an Invoice
              <Image
                src="https://i.ibb.co.com/gbNMx7dC/redirect.png"
                alt="Redirect"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>
          </div>

          {/* <!-- Earning Summary Starts--> */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-6">
              <StatsBox title="This Week">12k</StatsBox>

              <StatsBox title={"This Month"}>30k</StatsBox>

              <StatsBox title={"This Year"}>150k</StatsBox>

              <StatsBox
                title="Sales Report"
                href="/dashboard/sales/sales_report"
                width="w-[250px]"
                variant="link"
              >
                Click here →
              </StatsBox>
            </div>
          </div>
          {/* <!-- Earning Summary Ends--> */}
        </div>
      </div>
    </>
  );
};

export default page;
