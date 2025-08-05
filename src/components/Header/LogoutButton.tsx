"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    redirect("/login");
  };

  return (
    <Button
      variant="ghost"
      className="hover:text-red-500 cursor-pointer"
      onClick={signOut}
    >
      <LogOut />
    </Button>
  );
}
