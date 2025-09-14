"use client";

import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export const TextInput = ({
  label,
  placeholder = "",
  type = "text",
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-black">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          className="border border-neutral-100 bg-neutral-100 rounded-xl px-3 py-2.5 w-full 
                     ring-0 focus:bg-white focus:outline-green-500"
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-0 h-full flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
