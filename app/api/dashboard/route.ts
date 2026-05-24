import {
  getDashboard,
  updateStatus,
  respondSubmission,
  removeSubmission,
} from "@/controllers/dashboard.controllers";

export async function GET() {
  return getDashboard();
}
export async function PATCH(req: Request) {
  return updateStatus(req);
}

export async function POST(req: Request) {
  return respondSubmission(req);
}

export async function DELETE(req: Request) {
  return removeSubmission(req);
}
