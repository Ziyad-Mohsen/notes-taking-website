"use server";

import { ROUTES } from "@/constants/routes";
import { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthActionReturn } from "./types";

type VerifyOtpParams = {
  email: string;
  token: string;
  type: EmailOtpType;
};

export async function verifyOtp({
  email,
  token,
  type,
}: VerifyOtpParams): AuthActionReturn {
  const supabase = await createClient();

  let success = false;

  try {
    if (email) {
      const {
        data: { user },
        error,
      } = await supabase.auth.verifyOtp({ token, email, type });

      if (error) {
        return { success, error };
      }

      if (user) {
        success = true;
      }
    }
  } catch (error) {
    console.error("Error in verifyOtp server action: " + error);
    return { success: false, error: { message: "Server or network error" } };
  }

  if (success) {
    switch (type) {
      case "signup":
        redirect(ROUTES.COMPLETE_PROFILE);
      case "email_change":
        redirect(ROUTES.LOGIN);
      default:
        redirect(ROUTES.SIGNUP);
    }
    return { success, error: null };
  }

  return { success: false, error: { message: "Verification failed" } };
}
