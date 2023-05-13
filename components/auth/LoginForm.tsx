"use client";
import React, { useEffect } from "react";
import InputForm from "../form/FormInput";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserLogin } from "@/hooks/auth/useUserLogin";
import { userLogin } from "@/service/auth/userLogin";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useAuthFormContext } from "@/contexts/AuthFormProvider";
interface LoginFormprops {
  handleGotoRegister: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default function LoginForm({ handleGotoRegister }: LoginFormprops) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(LoginSchema) });
  const { handleAuthFormClose } = useAuthFormContext();

  const loginMutation: any = useUserLogin();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setTimeout(() => {
        handleAuthFormClose();
      }, 2000);
    }
  }, [loginMutation.isSuccess]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center">Log in</h2>
      {loginMutation?.isError ? (
        <div className="p-2 my-4 text-lg text-center text-white bg-red-500 rounded-md ">
          {loginMutation?.error?.message}
        </div>
      ) : null}
      {loginMutation?.isSuccess ? (
        <div className="p-2 my-4 text-lg text-center text-white rounded-md bg-accent ">
          Login Success!
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label="Email"
          type="email"
          register={register}
          name="email"
          errors={errors}
        />
        <InputForm
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
        />
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="block font-semibold text-white rounded-lg btn-accent btn-sm"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging in" : "Log in"}
          </button>
        </div>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          className="font-semibold cursor-pointer hover:underline hover:text-accent"
          onClick={handleGotoRegister}
        >
          Register
        </span>
      </p>
    </div>
  );
}
