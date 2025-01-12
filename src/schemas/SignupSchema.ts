import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((ctx) => ctx.password === ctx.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });
