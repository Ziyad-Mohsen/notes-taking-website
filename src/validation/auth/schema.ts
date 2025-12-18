import * as z from "zod";
import { TFn } from "./types";

// Fields
const nameSchema = (t: TFn) =>
  z
    .string()
    .min(1, t("errors.nameRequired"))
    .max(32, t("errors.nameMaxLength"))
    .nonoptional();

const usernameSchema = (t: TFn) =>
  z
    .string()
    .min(3, t("errors.usernameMinLength"))
    .max(32, t("errors.usernameMaxLength"))
    .regex(/^[a-zA-Z0-9_]+$/, t("errors.usernameInvalid"));

const emailSchema = (t: TFn) =>
  z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/,
      t("errors.emailInvalid")
    );

const passwordSchema = (t: TFn) =>
  z
    .string()
    .min(8, t("errors.passwordMinLength"))
    .max(100, t("errors.passwordMaxLength"))
    .regex(/[A-Z]/, t("errors.passwordUppercase"))
    .regex(/[a-z]/, t("errors.passwordLowercase"))
    .regex(/[0-9]/, t("errors.passwordNumber"))
    .regex(/[^A-Za-z0-9]/, t("errors.passwordSpecial"))
    .refine((val) => !/\s/.test(val), {
      message: t("errors.passwordSpaces"),
    });

const avatarSchema = z.instanceof(ArrayBuffer).or(z.string()).nullable();

// Forms
export const SignupFormSchema = (t: TFn) =>
  z
    .object({
      name: nameSchema(t),
      username: usernameSchema(t),
      email: emailSchema(t),
      password: passwordSchema(t),
      confirmPassword: z.string(),
      avatar: avatarSchema,
      acceptedTerms: z.boolean().refine((val) => val === true, {
        message: t("errors.mustAcceptTerms"),
      }),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("errors.passwordsNotMatch"),
          path: ["confirmPassword"],
        });
      }
    });

export const SigninFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// types
export type SignupFormSchema = z.infer<ReturnType<typeof SignupFormSchema>>;
export type SigninFormSchema = z.infer<typeof SigninFormSchema>;
export type AvatarSchemaType = z.infer<typeof avatarSchema>;
