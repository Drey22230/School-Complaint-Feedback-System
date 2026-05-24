import { submitComplaint } from "@/models/complaints.models";
import { Concern } from "@/app/types/concern";

export const complaintHandler = async (body: Concern, user_id: number) => {
  try {
    const { concern, description, attachment } = body;

    if (!concern || !description) {
      throw new Error("Concern and description are required");
    }

    const complaint: Concern = {
      user_id: user_id,
      concern,
      description,
      attachment: attachment ?? null,
    };

    const newComplaint = await submitComplaint(complaint);

    return newComplaint;
  } catch (error) {
    console.error("Error in complaintHandler:", error);
    throw error;
  }
};
