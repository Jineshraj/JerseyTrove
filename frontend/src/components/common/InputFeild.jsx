const InputFeild = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3 text-gray-400" size={20} />
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
      />
    </div>
  );
};

export default InputFeild;
