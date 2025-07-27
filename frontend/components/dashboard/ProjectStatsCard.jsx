import React from "react";

const ProjectStatsCard = ({
  highlightNumber,
  highlightTitle,
  topRightTitle,
  topRightValue,
  bottomRightTitle,
  bottomRightValue,
}) => {
  return (
    <div className="rounded-lg flex gap-0">
      {/* Left side */}
      <div className="w-[300px] h-[200px] pt-[30px] pb-[30px] pl-[100px] pr-[30px] bg-primary flex flex-col justify-between items-end rounded-l-lg">
        <div
          className="self-stretch text-right text-[#F6F9FF] text-[20px] font-bold leading-[30px]"
          style={{
            textBoxTrim: "trim-both",
            textBoxEdge: "cap alphabetic",
          }}
        >
          {highlightTitle}
        </div>
        <div
          className="self-stretch text-right text-[#F6F9FF] text-[48px] font-bold break-words"
          style={{
            textBoxTrim: "trim-both",
            textBoxEdge: "cap alphabetic",
          }}
        >
          {highlightNumber}
        </div>
      </div>

      {/* Right side */}
      <div className="w-[300px] h-[200px] flex flex-col">
        <div className="flex flex-col gap-5 p-[19.5px] border border-primary rounded-tr-lg h-[100px]">
          <div
            className="self-stretch text-right text-[rgba(0,0,0,0.75)] text-[16px] font-semibold"
            style={{
              textBoxTrim: "trim-both",
              textBoxEdge: "cap alphabetic",
            }}
          >
            {topRightTitle}
          </div>
          <div
            className="self-stretch text-right text-primary text-[40px] font-extrabold break-words"
            style={{
              textBoxTrim: "trim-both",
              textBoxEdge: "cap alphabetic",
            }}
          >
            {topRightValue}
          </div>
        </div>

        <div className="flex flex-col gap-5 p-[19.5px] border border-primary border-t-0 rounded-br-lg h-[100px]">
          <div
            className="self-stretch text-right text-[rgba(0,0,0,0.75)] text-[16px] font-semibold"
            style={{
              textBoxTrim: "trim-both",
              textBoxEdge: "cap alphabetic",
            }}
          >
            {bottomRightTitle}
          </div>
          <div
            className="self-stretch text-right text-primary text-[40px] font-extrabold break-words"
            style={{
              textBoxTrim: "trim-both",
              textBoxEdge: "cap alphabetic",
            }}
          >
            {bottomRightValue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsCard;
