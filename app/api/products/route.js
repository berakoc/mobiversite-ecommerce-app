import db from "@/lib/db";

export async function GET() {
  return new Response(JSON.stringify(db.data.products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
