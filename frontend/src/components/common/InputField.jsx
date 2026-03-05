import { forwardRef } from "react";

const InputField = forwardRef(
  ({ label, error, name, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 mb-4">
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-black text-gray-900 uppercase tracking-wide"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* LEFT ICON SLOT */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            {...props}
            className={`w-full py-3.5 border transition-all font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${
              error ? "border-red-500 bg-red-50" : "border-gray-300"
            } 
          ${leftIcon ? "pl-11" : "px-4"} 
          ${rightIcon ? "pr-11" : "px-4"}`}
          />

          {/* RIGHT ICON SLOT */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              {rightIcon}
            </div>
          )}
        </div>

        <div
          className={`h-5 transition-all ${error ? "opacity-100" : "hidden"}`}
        >
          {error && (
            <span className="text-xs font-bold text-red-500 uppercase italic">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";
export default InputField;
