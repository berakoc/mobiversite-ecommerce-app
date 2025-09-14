import db from "../../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const userOrders = db.data.orders.filter(
    (order) => order.userId === parseInt(userId, 10)
  );
  return Response.json(userOrders);
}

export async function POST(request) {
  const requestData = await request.json();

  const newOrder = {
    userId: 1,
    id: db.data.orders.length + 1,
    products: requestData,
    createdAt: new Date().toISOString(),
    status: "Pending",
    total: requestData.length,
  };

  db.data.orders.push(newOrder);
  await db.write();

  return new Response(JSON.stringify(newOrder), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
