import { z } from "zod";

export const SignupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
  }).refine((ctx) => ctx.password === ctx.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"]
  })