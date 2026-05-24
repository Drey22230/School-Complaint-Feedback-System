import { verifyOtpHandler } from "../../../controllers/verifyotp.controllers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result =
      await verifyOtpHandler(body);

    return Response.json(result, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      {
        message: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}