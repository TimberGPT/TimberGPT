import { Controller, useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({
  name,
  placeholder,
  options = [],
  disabled = false,
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
          <div className="relative">
            <select
              id={name}
              disabled={disabled}
              className={`w-full px-3 py-2 pr-10 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                error ? "border-red-500" : ""
              } ${className}`}
              {...field}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option
                  key={option.value || option}
                  value={option.value || option}
                >
                  {option.label || option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default CustomSelect;
