import ChangeLanguage from "@/components/ChangeLanguage";
import ThemeToggler from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("pages.auth.layout");

  return (
    <main className="relative min-h-screen bg-linear-to-br from-background via-accent/50 to-background flex items-center justify-center">
      <header className="absolute z-10 top-0 start-0  p-2 bg-card ltr:rounded-br-lg rtl:rounded-bl-lg flex items-center gap-2 shadow-lg">
        <Button asChild variant="default">
          <Link href={ROUTES.ROOT}>
            <ArrowLeft className="rtl:rotate-180" />
            <span>{t("homeLink")}</span>
          </Link>
        </Button>
        <ChangeLanguage />
        <ThemeToggler />
      </header>
      <section className="w-[600px] max-w-full m-5 mt-20 bg-card/60 px-5 py-8 rounded-lg shadow-md border text-center">
        {children}
      </section>
    </main>
  );
}
