import { getAuthUser } from "@/actions/actions";
import ThemeToggler from "@/components/ThemeToggler";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center text-center">
      <div className="w-full mx-5 md:w-1/2 xl:w-1/4 bg-secondary text-secondary-foreground p-5 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <Link href="/">
            <ArrowLeft />
          </Link>
          <ThemeToggler />
        </div>
        {children}
      </div>
    </div>
  );
}
