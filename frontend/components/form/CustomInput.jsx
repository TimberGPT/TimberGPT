import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const CustomInput = ({
  name,
  type = "text",
  placeholder,
  disabled = false,
  className = "",
  required = false,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordInput = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          <div className="relative">
            <input
              id={name}
              type={
                isPasswordInput ? (showPassword ? "text" : "password") : type
              }
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                error ? "border-red-500" : ""
              } ${isPasswordInput ? "pr-10" : ""} ${className}`}
              {...field}
            />

            {isPasswordInput && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default CustomInput;
