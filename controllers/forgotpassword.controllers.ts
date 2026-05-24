import { sendForgotPasswordOTP } from "../models/forgotpassword.models";

export const forgotPasswordHandler = async (body: any) => {
  try {
    const { email } = body;

    if (!email) {
      throw new Error("Email is required");
    }

    return await sendForgotPasswordOTP(email);
  } catch (error) {
    console.error(error);

    throw new Error((error as Error).message);
  }
};
