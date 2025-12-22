"use server";

import { CompleteProfileSchema } from "@/validation/auth/schema";
import { AuthActionReturn } from "./types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export async function completeProfile(
  profileData: CompleteProfileSchema
): AuthActionReturn {
  const supabase = await createClient();

  let success = false;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return { success, error };
    }

    if (user) {
      const { name, username, avatar } = profileData;
      const { data: profile, error } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          name,
          username,
          avatar_url: avatar,
        })
        .select()
        .single();

      if (error) {
        return { success, error };
      }

      if (profile) {
        success = true;
      }
    }
  } catch (error) {
    console.error("Error in complete profile server action: " + error);
    return { success, error: { message: "Server or network error" } };
  }

  if (success) {
    redirect(ROUTES.ROOT);
  }

  return { success: false, error: { message: "Unexpected error" } };
}
