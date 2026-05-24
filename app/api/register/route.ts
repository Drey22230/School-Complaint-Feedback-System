import { registerHandler } from "@/controllers/register.controller";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await registerHandler(body);

    return Response.json(result, { status: 201 });
  } catch (error) {
    console.log(" ERROR:", error);

    return Response.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
