import { userRegister } from "@/service/auth/userRegister";
import { useMutation } from "@tanstack/react-query";

export function useUserRegister() {
  return useMutation(userRegister);
}
