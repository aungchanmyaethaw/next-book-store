import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  register: any;
  errors: any;
}

export default function InputForm({
  label,
  type = "text",
  name,
  register,
  errors,
}: FormInputProps) {
  return (
    <fieldset className="flex flex-col gap-2 my-4">
      <label htmlFor="" className="font-semibold text-slate-800">
        {label}
      </label>
      <input
        type={type}
        placeholder="Type here"
        className="w-full input input-bordered input-md"
        {...register(name)}
      />
      {errors?.[name] ? (
        <span className="my-1 text-red-500">{errors?.[name].message}</span>
      ) : null}
    </fieldset>
  );
}
