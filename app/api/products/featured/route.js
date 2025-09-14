import db from "../../../../lib/db";

export async function GET() {
  const featuredProducts = db.data.products.slice(0, 8);
  return new Response(JSON.stringify(featuredProducts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
