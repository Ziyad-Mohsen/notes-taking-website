"use server";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthActionReturn } from "./types";

export async function signup(
  email: string,
  password: string
): AuthActionReturn {
  const supabase = await createClient();

  let success = false;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success, error };
    }

    if (user) {
      success = true;
    }
  } catch (error) {
    console.error("Error in signup server action: " + error);
    return { success, error: { message: "Server or network error" } };
  }

  if (success) {
    redirect(ROUTES.VERIFY_OTP + `?type=signup&email=${email}`);
  }

  return { success: false, error: { message: "Unexpected error" } };
}
