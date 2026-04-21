export async function POST() {
  return Response.json({
    status: "success",
    action: "amber_lights_activated",
  });
}
