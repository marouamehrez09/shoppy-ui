"use server";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import API_URL from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";
interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  exp: number;
}

export default async function login(
  _prevState: FormResponse,
  formData: FormData
) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
    credentials: "include",
  });
  console.log("Response headers:", res);
  const parsedRes = await res.json();
  console.log("parsed res ", parsedRes);
  if (!res.ok) {
    return { error: getErrorMessage({ response: parsedRes }) };
  }
  // ✅ Récupérer le token JWT depuis Set-Cookie
  await setAuthCookie(res);

  // ✅ Décoder le token pour vérifier le rôle
  if (parsedRes.tokenPayload.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/buy_products");
}

const setAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    const cookieStore = await cookies(); // Await cookies() to get the Cookies interface
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
