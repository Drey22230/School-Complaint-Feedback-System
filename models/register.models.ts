import { pool } from "../lib/db";
import { UserRegister } from "../types/userRegister";
import bcrypt from "bcrypt";

export const registerUser = async (user: UserRegister) => {
  try {
    const username = user.username.trim();
    const email = user.email.toLowerCase().trim();

    const existingUser = await pool.query(
      "SELECT user_id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const role = "student";

    const result = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, username, email, role`,
      [username, email, hashedPassword, role]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};