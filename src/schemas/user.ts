import z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const SignUpSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const TokenSchema = z.object({
  token: z.string().min(10, "Token must be at least 10 characters"),
});
