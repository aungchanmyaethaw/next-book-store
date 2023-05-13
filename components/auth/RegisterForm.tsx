import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../form/FormInput";
import { useUserRegister } from "@/hooks/auth/useUserRegister";

interface RegisterFormProps {
  handleGogoLogin: () => void;
}

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const RegisterSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "password did not match!"),
});

export default function RegisterForm({ handleGogoLogin }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(RegisterSchema) });

  const registerMutation: any = useUserRegister();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const tempData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    registerMutation.mutate(tempData);
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      handleGogoLogin();
    }
  }, [registerMutation.isSuccess]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center">
        Register Your Account
      </h2>
      {registerMutation?.isError ? (
        <div className="p-2 my-4 text-lg text-center text-white bg-red-500 rounded-md ">
          {registerMutation?.error?.message}
        </div>
      ) : null}
      {registerMutation?.isSuccess ? (
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
          label="username"
          type="username"
          register={register}
          name="username"
          errors={errors}
        />
        <InputForm
          label="Password"
          type="password"
          register={register}
          name="password"
          errors={errors}
        />
        <InputForm
          label="Confirm Password"
          type="password"
          name="confirmpassword"
          register={register}
          errors={errors}
        />
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="block font-semibold text-white rounded-lg btn-accent btn-sm"
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Registering" : "Register"}
          </button>
        </div>
      </form>
      <p
        className="flex items-center gap-2 font-semibold cursor-pointer hover:underline hover:text-accent "
        onClick={handleGogoLogin}
      >
        <BsArrowLeft />
        Back to Log in
      </p>
    </div>
  );
}
