import db from "@/lib/db";

export async function GET(_, { params }) {
  const { id: userId } = params;
  const user = db.data.users.find((u) => u.id === parseInt(userId));
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const newUser = await request.json();
  newUser.id = db.data.users.length + 1;
  await db.update("users", (users) => [...users, newUser]);
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
