import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";

// const SECURE_ROUTES = ["/profile"];
const ADMIN_ROUTES = ["/dashboard"];
// const ROUTES = [...SECURE_ROUTES, ...ADMIN_ROUTES]; // I tried to use this but it didn't work

export default withAuth(async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) return;

  if (ADMIN_ROUTES.includes(req.nextUrl.pathname) && token?.role !== "ADMIN")
    // The only way I found to send errors to the page using the middleware is to send a parameter in the URL
    // The other way would be to make a custom error page, but I didn't like that approach
    return NextResponse.redirect(new URL("/?error=unauthorized", req.url));

  return;
});

export const config = { matcher: ["/profile", "/dashboard"] }; // Was gonna add ROUTES here
