import { NextResponse } from "next/server";
import { UserDashboardController } from "@/controllers/userdashboard.controllers";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const user_id = Number(searchParams.get("user_id"));

        const result = await UserDashboardController(user_id);

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}