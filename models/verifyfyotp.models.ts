import { pool } from "../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyOTPAndResetPassword = async (
  token: string,
  otp: string,
  newPassword: string,
) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
      otp: string;
    };

    if (decoded.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users
         SET password = $1
         WHERE email = $2`,
      [hashedPassword, decoded.email],
    );

    return {
      message: "Password updated successfully",
    };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
