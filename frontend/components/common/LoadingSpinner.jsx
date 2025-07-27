import React from "react";

const LoadingSpinner = ({
  size = "medium",
  className = "",
  fullScreen = false,
}) => {
  // Size variants
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-[3px]",
    xl: "h-16 w-16 border-4",
  };

  // Container classes for fullScreen option
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/80 z-50"
    : "flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div
        className={`
          animate-spin rounded-full 
          border-current border-t-transparent
          text-purple-600
          ${sizeClasses[size] || sizeClasses.medium}
          ${className}
        `}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
