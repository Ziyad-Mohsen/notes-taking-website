import * as z from "zod";

// Fields
const nameSchema = z
  .string()
  .min(1, "Name field is required")
  .max(32, "first name must be at most 32 characters")
  .nonoptional();
const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(32, "Username must me at most 32 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Only letters, numbers, and underscores are allowed"
  );
const emailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/,
    "Invalid email address."
  );
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password is too long.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character."
  )
  .refine((val) => !/\s/.test(val), {
    message: "Password cannot contain spaces.",
  });
const avatarSchema = z.instanceof(ArrayBuffer).or(z.string()).nullable();

// Forms
export const SignupFormSchema = z
  .object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    avatar: avatarSchema,
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms of service and privacy policy",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const SigninFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// types
export type SignupFormSchema = z.infer<typeof SignupFormSchema>;
export type SigninFormSchema = z.infer<typeof SigninFormSchema>;
export type AvatarSchemaType = z.infer<typeof avatarSchema>;
