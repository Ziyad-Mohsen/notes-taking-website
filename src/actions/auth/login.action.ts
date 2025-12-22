"use server";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import { SigninFormSchema } from "@/validation/auth/schema";
import { redirect } from "next/navigation";
import { AuthActionReturn } from "./types";

export async function login(loginData: SigninFormSchema): AuthActionReturn {
  const supabase = await createClient();

  let success = false;

  try {
    const { email, password } = loginData;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success, error: { message: error.message, code: error.code } };
    }

    success = true;
  } catch (error) {
    console.error("Error in login server action: " + error);
    return { success, error: { message: "Server or network error" } };
  }

  if (success) {
    redirect(ROUTES.WORKSPACE);
  }

  return { success: false, error: { message: "Unexpected error" } };
}
