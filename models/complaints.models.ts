import { pool } from "../lib/db";
import { Concern } from "../app/types/concern";

export const submitComplaint = async (complaint: Concern) => {
  try {
    const { user_id, concern, description, attachment } = complaint;

    const result = await pool.query(
      `
      INSERT INTO submissions
      (user_id, concern, description, attachment_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [user_id, concern, description, attachment],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error submitting complaint:", error);
    throw error;
  }
};
