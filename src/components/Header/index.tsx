import Link from "next/link";
import { buttonVariants } from "../ui/button";
import ThemeToggler from "./ThemeToggler";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-accent shadow-lg fixed top-0 left-0 w-full">
      <div className="container flex justify-between items-center py-5">
        <Link href="/" className="text-2xl">
          NoteIt
        </Link>
        <div className="flex gap-2">
          <ThemeToggler />
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
