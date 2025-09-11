import db from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const userOrders = db.data.orders.filter((order) => order.userId === userId);
  return Response.json(userOrders);
}
