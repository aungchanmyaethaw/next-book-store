import { userLogin } from "@/service/auth/userLogin";
import { useMutation } from "@tanstack/react-query";

export function useUserLogin() {
  return useMutation(userLogin);
}
