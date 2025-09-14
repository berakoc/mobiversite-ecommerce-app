import { LoginPage } from "../../ui";
import { connection } from "next/server";

export default async function Login() {
  await connection();

  return <LoginPage />;
}
