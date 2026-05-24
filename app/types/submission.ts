export  interface Submission {
  submission_id: number;
  user_id: number;
  username: string;
  concern: string;
  description: string;
  attachment_url: string;
  status: "pending" | "reviewed" | "resolved";
  admin_response: string;
  created_at: string;
}