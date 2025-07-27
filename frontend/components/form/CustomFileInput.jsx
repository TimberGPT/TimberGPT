import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const CustomFileInput = ({
  name,
  accept = "application/pdf,image/*",
  maxSize = 5242880,
  placeholder = "Choose file",
  className = "",
  required = false,
  onChange: externalOnChange,
}) => {
  const { control } = useFormContext();
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setError(null);

    if (!file) {
      setFileName("");
      field.onChange(null);
      return;
    }

    // File size validation
    if (file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      setError(`File size exceeds ${sizeMB}MB limit`);
      field.onChange(null);
      setFileName("");
      return;
    }

    setFileName(file.name);
    field.onChange(file);

    if (externalOnChange) {
      externalOnChange(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => {
        const hasError = !!fieldError || !!error;

        return (
          <div className="space-y-1">
            <div
              className={`relative ${
                hasError ? "border-red-500 rounded-lg" : ""
              }`}
            >
              <input
                ref={inputRef}
                id={name}
                type="file"
                accept={accept}
                required={required}
                onChange={(e) => handleFileChange(e, field)}
                className={`block w-full border cursor-pointer ${
                  hasError ? "border-red-500" : "border-gray-200"
                } 
                  shadow-sm rounded-lg sm:text-sm focus:z-10 
                  ${
                    hasError
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-purple-500 focus:ring-purple-500"
                  }
                  disabled:opacity-50 disabled:pointer-events-none 
                  file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4 
                  ${className}`}
              />
            </div>

            {/* Error messages */}
            {fieldError && (
              <p className="text-red-500 text-sm">{fieldError.message}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* File size indicator */}
            {fileName && !error && !fieldError && (
              <p className="text-xs text-gray-500">
                {formatFileSize(inputRef.current?.files?.[0]?.size || 0)}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default CustomFileInput;
