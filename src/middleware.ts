import { withAuth } from "next-auth/middleware";

const SECURE_ROUTES = ["/profile"];
const ADMIN_ROUTES = ["/dashboard"];
// const ROUTES = [...SECURE_ROUTES, ...ADMIN_ROUTES]; // I tried to use this but it didn't work

export default withAuth({
  callbacks: {
    authorized: ({
      token,
      req: {
        nextUrl: { pathname },
      },
    }) => {
      if (ADMIN_ROUTES.includes(pathname) && token?.role !== "ADMIN")
        return false;

      return !!token;
    },
  },
});

export const config = { matcher: ["/profile", "/dashboard"] }; // Was gonna add ROUTES here
