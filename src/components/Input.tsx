import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
}

export default function Input({
  error,
  label,
  register,
  required = false,
  disabled = false,
  ...rest
}: Props) {
  return (
    <div className="relative flex w-full flex-col gap-1">
      {label && (
        <label className="text-gray-07 dark:text-white-softest self-start text-start text-xs uppercase">
          {label}
          {required && !disabled && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        {...register}
        {...rest}
      />
      {!!error && (
        <span className="self-start text-start text-xs uppercase text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
