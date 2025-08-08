import { redirect } from "next/navigation";

export default async function auth() {
  redirect("/auth/login");
}
