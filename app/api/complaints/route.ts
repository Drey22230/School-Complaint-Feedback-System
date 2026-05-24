import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { complaintHandler } from "../../../controllers/complaints.controllers";
import { supabase } from "../../../lib/supabase";

export async function POST(req: NextRequest) {
  try {
    
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No token" },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        user_id: number;
      };
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    
    const formData = await req.formData();

    const concern = formData.get("concern") as string;
    const description = formData.get("description") as string;
    const attachment = formData.get("attachment") as File | null;

    
    let attachmentUrl: string | null = null;

    if (attachment && attachment.size > 0) {
      const fileExt = attachment.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const arrayBuffer = await attachment.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from("complaints")
        .upload(fileName, buffer, {
          contentType: attachment.type,
        });

      console.log("UPLOAD ERROR:", error); 

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      const publicUrl = supabase.storage
        .from("complaints")
        .getPublicUrl(fileName).data.publicUrl;

      attachmentUrl = publicUrl;
    }

    
    const newComplaint = await complaintHandler(
      {
        concern,
        description,
        attachment: attachmentUrl,
      },
      decoded.user_id,
    );

    return NextResponse.json(newComplaint, {
      status: 201,
    });

  } catch (error) {
    console.error("COMPLAINT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to submit complaint" },
      { status: 500 }
    );
  }
}