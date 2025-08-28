import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { unauthenticatedRoutes } from "./app/common/constants/routes";

export function middleware(request: NextRequest) {
  // Ici on check le cookie "Authentication" (ou celui que tu utilises dans ton NestJS)
  const token = request.cookies.get("Authentication")?.value;

  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.path),
  );

  // 🔹 Si pas de token et on n’est pas sur une route publique → redirige vers /auth/login
  if (!token && !isUnauthenticatedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 🔹 Si token et on essaye d’aller sur login → redirige vers /
  if (token && request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
