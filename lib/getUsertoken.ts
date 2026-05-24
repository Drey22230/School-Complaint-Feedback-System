import jwt from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      user_id: number;
      username: string;
      email: string;
      role: string;
    };
  } catch {
    throw new Error("Invalid token");
  }
};