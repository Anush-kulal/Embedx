export async function POST() {
  console.log('[ACTION TRIGGERED]: Unlocking front door for emergency access.');
  
  return Response.json({
    success: true
  });
}
