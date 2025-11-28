import Link from "next/link";
import { buttonVariants } from "../ui/button";
import ThemeToggler from "../ui/ThemeToggler";
import LogoutButton from "./LogoutButton";
import { getAuthUser } from "@/actions/actions";
import UserInfo from "./UserInfo";

export default async function Header() {
  const user = await getAuthUser();

  return (
    <header className="bg-secondary shadow-lg fixed top-0 left-0 w-full">
      <div className="container flex justify-between items-center py-5">
        <Link href="/" className="text-2xl">
          NoteIt
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          {user ? (
            <>
              <UserInfo user={user} />
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "default" })}
            >
              login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
