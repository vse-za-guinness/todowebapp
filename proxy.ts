import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Routes that require a valid JWT
const PROTECTED_PREFIXES = ["/dashboard", "/api/items"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) return NextResponse.next();

  // Read the token from the HttpOnly cookie set at login
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    console.warn("[proxy] No token — redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = verifyToken(token);
    console.log("[proxy] Authenticated user:", payload.email);

    // Forward user info to route handlers via custom headers
    const res = NextResponse.next();
    res.headers.set("x-user-id",    payload.userId);
    res.headers.set("x-user-email", payload.email);
    return res;
  } catch (err) {
    console.error("[proxy] Invalid token:", err);
    const response = NextResponse.redirect(new URL("/login", req.url));
    // Clear the bad cookie
    response.cookies.delete("auth_token");
    return response;
  }
}

// Tell Next.js which paths to run this middleware on
export const config = {
  matcher: ["/dashboard/:path*", "/api/items/:path*"],
};
