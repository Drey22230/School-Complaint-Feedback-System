import { pool } from "@/lib/db";

export const dashboardData = async () => {
  const result = await pool.query(`
    SELECT 
  s.*,
  u.username
FROM submissions s
JOIN users u ON s.user_id = u.user_id
ORDER BY s.created_at DESC;
  `);

  return result.rows;
};

export const updateSubmissionStatus = async (
  submission_id: number,
  status: string,
) => {
  const result = await pool.query(
    `
    UPDATE submissions
    SET status = $1
    WHERE submission_id = $2
    RETURNING *
    `,
    [status, submission_id],
  );

  return result.rows[0];
};

export const deleteSubmission = async (submission_id: number) => {
  const result = await pool.query(
    `
    DELETE FROM submissions
    WHERE submission_id = $1
    RETURNING *
    `,
    [submission_id],
  );

  return result.rows[0];
};

export const addAdminResponse = async (
  submission_id: number,
  admin_response: string,
) => {
  const result = await pool.query(
    `
    UPDATE submissions
    SET admin_response = $1,
        status = 'reviewed'
    WHERE submission_id = $2
    RETURNING *
    `,
    [admin_response, submission_id],
  );

  return result.rows[0];
};
