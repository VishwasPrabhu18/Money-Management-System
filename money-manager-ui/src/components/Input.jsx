import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  isSelect,
  options,
  labelClassName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-1">
      <label className={`text-slate-800 block mb-1 ${labelClassName ? labelClassName : "text-[13px]"}`}>{label}</label>
      <div className="relative">
        {isSelect ? (
          <select
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            value={value}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option
                key={option.value || index}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
        )}

        {type === "password" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <Eye
                size={20}
                className="text-purple-600"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeOff
                size={20}
                className="text-slate-400"
                onClick={togglePasswordVisibility}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
