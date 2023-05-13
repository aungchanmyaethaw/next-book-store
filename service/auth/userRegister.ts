import axios from "axios";

interface RegisterProps {
  username: string;
  email: string;
  password: string;
}

export const userRegister = async (data: RegisterProps) => {
  try {
    const res = await axios.post(`/api/auth/register`, data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data);
  }
};
