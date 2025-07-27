import React from "react";

const EmployeeStatContainer = () => {
  return (
    <div className="flex gap-[75px]">
      <div className="rounded-lg flex gap-0 overflow-hidden">
        <div className="w-[300px] h-[200px] pt-[30px] pb-[30px] pl-[100px] pr-[30px] bg-[#6a49ba] flex flex-col justify-between items-end">
          <div
            className="self-stretch text-right text-[#F6F9FF] text-[20px] font-bold leading-[30px]"
            style={{
              textBoxTrim: "trim-both",
              textBoxEdge: "cap alphabetic",
            }}
          >
            Completed
            <br />
            Projects
          </div>
          <div
            className="self-stretch text-right text-[#F6F9FF] text-[48px] font-bold break-words"
            style={{
              textBoxTrim: "trim-both",
              textBoxEdge: "cap alphabetic",
            }}
          >
            25
          </div>
        </div>

        <div className="w-[250px] h-[200px] flex flex-col">
          <div className="flex flex-col gap-5 p-[19.5px] border border-r-0 border-[#6a49ba]">
            <div
              className="self-stretch text-right text-[rgba(0,0,0,0.75)] text-[16px] font-[600] "
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              Running Project
            </div>
            <div
              className="self-stretch text-right text-[#6a49ba] text-[40px]  font-extrabold break-words"
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              1
            </div>
          </div>
          <div className="flex flex-col gap-5 p-[19px] border border-t-0 border-r-0 border-[#6a49ba]">
            <div
              className="self-stretch text-right text-[rgba(0,0,0,0.75)] text-[16px] font-semibold "
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              Cancelled Project
            </div>
            <div
              className="self-stretch text-right text-[#6a49ba] text-[40px] font-extrabold break-words"
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              1
            </div>
          </div>
        </div>

        <div className="w-[250px] h-[200px] flex flex-col">
          <div className="flex flex-col gap-5 p-[19.5px] border border-r-0 border-[#6a49ba]">
            <div
              className="self-stretch text-right text-[rgba(0,0,0,0.75)] text-[16px] font-[600] "
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              Running Project
            </div>
            <div
              className="self-stretch text-right text-[#6a49ba] text-[40px]  font-extrabold break-words"
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              1
            </div>
          </div>
          <div className="flex flex-col gap-5 p-[19px] border border-r-0 border-t-0 border-[#6a49ba]">
            <div
              className="self-stretch text-right text-[rgba(0,0,0,0.75)] text-[16px] font-semibold "
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              Cancelled Project
            </div>
            <div
              className="self-stretch text-right text-[#6a49ba] text-[40px] font-extrabold break-words"
              style={{
                textBoxTrim: "trim-both",
                textBoxEdge: "cap alphabetic",
              }}
            >
              1
            </div>
          </div>
        </div>

        <div className="p-2 w-[475px] h-[200px] flex flex-col border border-[#6a49ba] rounded-br-lg rounded-tr-lg">
          {/* Legend Indicator */}
          <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
              <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                Income
              </span>
            </div>
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
              <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                Outcome
              </span>
            </div>
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2 dark:bg-neutral-700"></span>
              <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                Others
              </span>
            </div>
          </div>
          {/* End Legend Indicator */}

          {/* Apex Lines Chart */}
          <div id="hs-curved-line-charts"></div>
          {/* End Apex Lines Chart */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatContainer;
