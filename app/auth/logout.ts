"use server";

import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "./auth-cookie";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies(); // Await cookies() to get the Cookies interface
  cookieStore.delete(AUTHENTICATION_COOKIE);
  redirect("/auth/login");
}