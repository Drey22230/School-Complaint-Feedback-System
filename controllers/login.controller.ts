import { loginUser } from "@/models/login.models";
import { UserLogin } from "@/types/userlogin";
export const loginHandler = async (email: string, password: string) => {
  const user = { email, password };
  const result = await loginUser(user as UserLogin);
  return result;
};
