import CompleteProfileForm from "@/components/auth/completeProfile/CompleteProfileForm";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CompleteProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(ROUTES.LOGIN);
  } else {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) {
      redirect(ROUTES.ROOT);
    }
  }

  return <CompleteProfileForm />;
}
