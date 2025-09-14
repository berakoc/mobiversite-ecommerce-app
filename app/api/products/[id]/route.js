import db from "../../../../lib/db";

export async function GET(_, { params }) {
  const { id: productId } = params;
  const product = db.data.products.find((p) => p.id === parseInt(productId));
  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
