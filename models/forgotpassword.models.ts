import { pool } from "../lib/db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET!;

export const sendForgotPasswordOTP = async (email: string) => {
  const normalizedEmail = email.toLowerCase().trim();

  const result = await pool.query(
    "SELECT user_id FROM users WHERE email = $1",
    [normalizedEmail],
  );

  if (result.rows.length === 0) {
    throw new Error("Email not found");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const token = jwt.sign(
    {
      email: normalizedEmail,
      otp,
    },
    JWT_SECRET,
    {
      expiresIn: "5m",
    },
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: normalizedEmail,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}`,
  });

  return {
    message: "OTP sent successfully",
    token,
  };
};
