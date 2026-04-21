import { updateState } from "@/lib/stateStore";

export async function POST(req: Request) {
  try {
    const { status } = await req.json();
    if (['safe', 'panic', 'inactive'].includes(status)) {
      updateState({ status });
    }
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ success: false }, { status: 400 });
  }
}
