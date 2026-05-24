import { NextResponse } from "next/server";
import {
  dashboardData,
  updateSubmissionStatus,
  deleteSubmission,
  addAdminResponse,
} from "@/models/dashboard.models";

export const getDashboard = async () => {
  try {
    const data = await dashboardData();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const updateStatus = async (req: Request) => {
  try {
    const { submission_id, status } = await req.json();

    const updated = await updateSubmissionStatus(submission_id, status);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
export const respondSubmission = async (req: Request) => {
  try {
    const {submission_id, admin_response} = await req.json();

    const updated = await addAdminResponse(submission_id,admin_response);

    return NextResponse.json(updated);
  }catch(error) {
    return NextResponse.json(
      {message: error},
      {status: 500}
    )
  }
}

export const removeSubmission = async (req: Request) => {
  try {
    const {submission_id} = await req.json();

    const deleted = await deleteSubmission(submission_id);

    return NextResponse.json(deleted);
  }  catch(error) {
    return NextResponse.json(
      {message: error},
      {status: 500}
    )
  }
}
