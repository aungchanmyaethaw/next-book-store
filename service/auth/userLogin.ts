import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginProps {
  email: string;
  password: string;
}

export const userLogin = async (data: LoginProps) => {
  try {
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (!status?.error) {
      return status;
    } else {
      throw new Error(status.error);
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
