import { NextRequest } from "next/server";
import { unauthenticatedRoutes } from "./app/common/constants/routes";
import authenticated from "./app/auth/actions/authenticated";

export function middleware(request: NextRequest) {

  if (
    !authenticated() &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route.path)
    )
  ) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
