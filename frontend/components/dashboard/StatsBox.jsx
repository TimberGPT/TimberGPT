import React from "react";
import Link from "next/link";

const StatsBox = ({
  title,
  children,
  href,
  width,
  variant = "number",
  height,
  blur = false,
  target = "_self",
}) => {
  const commonClasses = `border border-primary flex flex-col gap-5 rounded-lg p-6 text-center ${
    height || (variant === "avatar" ? "h-[135px]" : "")
  }`;

  const variantClasses =
    variant === "link"
      ? `items-center justify-center ${width || "w-[250px]"}`
      : variant === "avatar"
      ? `items-center ${width || "flex-1 min-w-[150px]"}`
      : width || "flex-1 min-w-[150px]";

  const content = (
    <>
      <div
        className="text-[20px] font-semibold text-[#333] mb-2"
        style={{
          textBoxTrim: "trim-both",
          textBoxEdge: "cap alphabetic",
        }}
      >
        {title}
      </div>
      <div
        className={
          variant === "link"
            ? "text-[18px] text-[#555]"
            : variant === "avatar"
            ? ""
            : "text-[40px] font-bold text-[#333]"
        }
        style={{
          textBoxTrim: "trim-both",
          textBoxEdge: "cap alphabetic",
        }}
      >
        {/* Apply blur conditionally for avatar groups */}
        <div className={blur ? "blur-[3px]" : ""}>{children}</div>
      </div>
    </>
  );

  return href ? (
    <Link
      href={href}
      target={target}
      className={`${commonClasses} ${variantClasses}`}
    >
      {content}
    </Link>
  ) : (
    <div className={`${commonClasses} ${variantClasses}`}>{content}</div>
  );
};

export default StatsBox;
