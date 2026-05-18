"use server";

import { createClient } from "@/lib/supabase/client";
import { AuthActionReturn } from "./types";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export async function confirmEmail(email: string): AuthActionReturn {
  const supabase = createClient();
  const { error } = await supabase.auth.resend({ email, type: "signup" });

  if (error) {
    return {
      success: false,
      error: { message: error.message, code: error.code },
    };
  }

  redirect(ROUTES.VERIFY_OTP + `?type=signup&email=${email}`);
}
