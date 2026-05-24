import { verifyOTPAndResetPassword } from "../models/verifyfyotp.models";

export const verifyOtpHandler = async (
  body: any
) => {
  try {
    const {
      token,
      otp,
      newPassword,
    } = body;

    if (
      !token ||
      !otp ||
      !newPassword
    ) {
      throw new Error(
        "All fields are required"
      );
    }

    return await verifyOTPAndResetPassword(
      token,
      otp,
      newPassword
    );
  } catch (error) {
    console.error(error);

    throw new Error(
      (error as Error).message
    );
  }
};