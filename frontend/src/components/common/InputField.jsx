// src/components/common/InputField.jsx

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {/* Only render the label if one is provided */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-black text-gray-900 uppercase tracking-wide"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name} /* CRITICAL: Required for e.target.name to work */
        value={value} /* CRITICAL: Ties the input to React state */
        onChange={onChange} /* CRITICAL: Fires the state update when you type */
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors font-medium text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
};

export default InputField;
