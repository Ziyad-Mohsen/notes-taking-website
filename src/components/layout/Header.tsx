import { ROUTES } from "@/constants/routes";
import {
  CircleQuestionMark,
  Github,
  Mail,
  SquareChartGantt,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggler from "../ThemeToggler";
import SmallScreensSidebar from "./SmallScreensSidebar";
import ChangeLanguage from "../ChangeLanguage";
import { getTranslations } from "next-intl/server";
import UserAvatar from "../UserAvatar";
import { getProfile } from "@/lib/dal";
import Logo from "../Logo";

export type NavLink = {
  icon?: React.ReactNode;
  title: string;
  href: string;
  target?: string;
};

function getNavLinks(t): NavLink[] {
  return [
    {
      icon: <Mail />,
      title: t("navLinks.contact"),
      href: ROUTES.CONTACT,
    },
    {
      icon: <CircleQuestionMark />,
      title: t("navLinks.faqs"),
      href: ROUTES.FAQS,
    },
    {
      icon: <Github />,
      title: t("navLinks.github"),
      href: "https://github.com/Ziyad-Mohsen/notes-taking-website",
      target: "_blank",
    },
    {
      icon: <SquareChartGantt />,
      title: t("navLinks.workspace"),
      href: ROUTES.WORKSPACE,
    },
  ];
}

async function Header() {
  const t = await getTranslations("layout.header");
  const navLinks = getNavLinks(t);
  const profile = await getProfile();

  return (
    <header className="bg-background border-b border-primary/20">
      <div className="container">
        <div className="py-3 flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => {
              return (
                <Button asChild key={i} variant="ghost">
                  <Link
                    href={link.href}
                    className="text-muted-foreground leading-none"
                    target={link.target && link.target}
                  >
                    {link.icon && link.icon}
                    {link.title}
                  </Link>
                </Button>
              );
            })}
            <div
              className="h-4 w-[2px] bg-secondary rounded-lg mx-2"
              role="separator"
              aria-disabled
            />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex items-center">
                <ChangeLanguage />
                <ThemeToggler />
              </div>
              {profile ? (
                <div className="flex items-center gap-2">
                  <UserAvatar src={profile.avatar_url} name={profile.name} />
                  <div className="flex flex-col text-sm">
                    <span className="text-foreground">
                      {t("profile.greetings")}
                    </span>
                    <span>{profile.name}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center ms-4 gap-2">
                  <Button variant="outline" asChild>
                    <Link href={ROUTES.LOGIN}>
                      <User />
                      {t("login")}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="hover:shadow-lg hover:scale-105 transition-all bg-linear-to-br from-gradient-1 to-gradient-2 hover:bg-linear-to-bl"
                  >
                    <Link href={ROUTES.SIGNUP}>{t("signup")}</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
          <SmallScreensSidebar profile={profile} navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}

export default Header;
