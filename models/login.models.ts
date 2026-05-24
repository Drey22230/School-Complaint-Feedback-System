import { pool } from "../lib/db";
import { UserLogin } from "../types/userlogin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (user: UserLogin) => {
  const email = user.email.toLowerCase().trim();

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const foundUser = result.rows[0];

  if (!foundUser) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT secret key is not defined in environment variables");
  }
  const token = jwt.sign(
    {
      user_id: foundUser.user_id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    },
    secretKey,
    { expiresIn: "1h" },
  );
  return { token, user: foundUser };
};