import { loginHandler } from "@/controllers/login.controller";
import { NextRequest, NextResponse } from "next/server";
import { loginRateLimiter } from "../../../lib//ratelimiter";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") || "unknown";

    try {
      await loginRateLimiter.consume(ip);
    } catch {
      return NextResponse.json(
        {
          error:
            "Too many login attempts. Please try again later.",
        },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    const result = await loginHandler(email, password);

    if (!result?.token) {
      return NextResponse.json(
        { error: "Invalid login" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: result.user,
      },
      { status: 200 }
    );

    response.cookies.set("token", result.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60,
    });

    return response;

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}