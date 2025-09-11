import db from "@/lib/db";

export async function POST(request, { params }) {
  const { id } = params;
  const orderData = await request.json();

  const product = db.data.products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const newOrder = {
    id: db.data.orders.length + 1,
    productId: product.id,
    quantity: orderData.quantity || 1,
    totalPrice: product.price * (orderData.quantity || 1),
    orderDate: new Date().toISOString(),
  };

  await db.update("orders", (orders) => [...orders, newOrder]);

  return new Response(JSON.stringify(newOrder), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
