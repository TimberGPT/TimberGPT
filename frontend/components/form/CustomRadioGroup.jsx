import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const CustomRadioGroup = ({
  name,
  options = [],
  className = "",
  required = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          <div className={`sm:flex ${className}`}>
            {options.map((option) => {
              const isSelected = field.value === option.value;
              return (
                <label
                  key={option.value}
                  htmlFor={`${name}-${option.value}`}
                  className="flex py-2 px-3 w-full border border-gray-200 shadow-2xs -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => field.onChange(option.value)}
                    className="shrink-0 mt-0.5 border-gray-300 rounded-full text-primary-600 focus:ring-primary-500 checked:border-primary-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  />
                  <span
                    className={`sm:text-sm ms-3 cursor-pointer ${
                      isSelected ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default CustomRadioGroup;
