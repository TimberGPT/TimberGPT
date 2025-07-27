import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const CustomTextarea = ({
  name,
  placeholder,
  rows = 4,
  disabled = false,
  className = "",
  required = false,
  maxLength,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1 w-full">
          <div className="relative">
            <textarea
              id={name}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 resize-vertical ${
                error ? "border-red-500" : ""
              } ${className}`}
              {...field}
            />
          </div>

          <div className="flex justify-between">
            {error && <p className="text-red-500 text-sm">{error.message}</p>}

            {maxLength && field.value && (
              <p
                className={`text-xs ${
                  field.value.length > maxLength * 0.9
                    ? "text-amber-600"
                    : "text-gray-500"
                }`}
              >
                {field.value.length}/{maxLength}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default CustomTextarea;
