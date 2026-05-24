import { pool } from "../lib/db";
export const getUserDashboardData = async (user_id: number) => {
  const result = await pool.query(
    `SELECT * FROM submissions WHERE user_id = $1 ORDER BY created_at DESC`,
    [user_id],
  );

  return result.rows;
};
