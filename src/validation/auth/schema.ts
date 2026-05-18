import * as z from "zod";
import { TFn } from "../types";
import { msg } from "../getDefaultErrors";
import { defaultErrors } from "./defaultErrors";

// Fields
export const nameSchema = (t?: TFn) =>
  z
    .string()
    .min(1, msg(t, defaultErrors, "nameRequired"))
    .max(32, msg(t, defaultErrors, "nameMaxLength"));

export const usernameSchema = (t?: TFn) =>
  z
    .string()
    .min(3, msg(t, defaultErrors, "usernameMinLength"))
    .max(32, msg(t, defaultErrors, "usernameMaxLength"))
    .regex(/^[a-zA-Z0-9_]+$/, msg(t, defaultErrors, "usernameInvalid"));

export const emailSchema = (t?: TFn) =>
  z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/,
      msg(t, defaultErrors, "emailInvalid")
    );

export const signupPasswordSchema = (t?: TFn) =>
  z
    .string()
    .min(8, msg(t, defaultErrors, "passwordMinLength"))
    .max(100, msg(t, defaultErrors, "passwordMaxLength"))
    .regex(/[A-Z]/, msg(t, defaultErrors, "passwordUppercase"))
    .regex(/[a-z]/, msg(t, defaultErrors, "passwordLowercase"))
    .regex(/[0-9]/, msg(t, defaultErrors, "passwordNumber"))
    .regex(/[^A-Za-z0-9]/, msg(t, defaultErrors, "passwordSpecial"))
    .refine((val) => !/\s/.test(val), {
      message: msg(t, defaultErrors, "passwordSpaces"),
    });

export const signInPasswordSchema = (t?: TFn) =>
  z.string().min(1, msg(t, defaultErrors, "passwordRequired"));

export const avatarSchema = z.string().nullable();

// Forms
export const SignupFormSchema = (t: TFn) =>
  z
    .object({
      email: emailSchema(t),
      password: signupPasswordSchema(t),
      confirmPassword: z.string(),
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

export const CompleteProfileSchema = (t: TFn) =>
  z.object({
    name: nameSchema(t),
    username: usernameSchema(t),
    avatar: avatarSchema,
  });

export const SigninFormSchema = (t: TFn) =>
  z.object({
    email: emailSchema(t),
    password: signInPasswordSchema(t),
  });

// types
export type SignupFormSchema = z.infer<ReturnType<typeof SignupFormSchema>>;
export type CompleteProfileSchema = z.infer<
  ReturnType<typeof CompleteProfileSchema>
>;
export type SigninFormSchema = z.infer<ReturnType<typeof SigninFormSchema>>;
export type AvatarSchemaType = z.infer<typeof avatarSchema>;
