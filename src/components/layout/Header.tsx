import { LogoName } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { CircleQuestionMark, Github, Mail, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggler from "../ThemeToggler";
import SmallScreensSidebar from "./SmallScreensSidebar";

export type NavLink = {
  icon?: React.ReactNode;
  title: string;
  href: string;
  target?: string;
};

const navLinks: NavLink[] = [
  { icon: <Mail />, title: "Contact", href: ROUTES.CONTACT },
  { icon: <CircleQuestionMark />, title: "FAQs", href: ROUTES.FAQS },
  {
    icon: <Github />,
    title: "GitHub",
    href: "https://github.com/Ziyad-Mohsen/notes-taking-website",
    target: "_blank",
  },
];

function Header() {
  return (
    <header className="bg-background border-b border-primary/20">
      <div className="container">
        <div className="py-3 flex items-center justify-between">
          <Link
            href={ROUTES.ROOT}
            className="flex items-center gap-2 px-2 rounded-lg"
          >
            <Image src="/logo.svg" alt={LogoName} width={38} height={38} />
            <span className="text-xl font-bold text-foreground">
              {LogoName}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
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
              className="h-4 w-[2px] bg-secondary rounded-lg"
              role="separator"
              aria-disabled
            />
            <div className="flex items-center ms-4 gap-4 text-muted-foreground">
              <Button variant="outline" asChild>
                <Link href={ROUTES.LOGIN}>
                  <User />
                  Login
                </Link>
              </Button>
              <Button
                asChild
                className="hover:shadow-lg hover:scale-105 transition-all bg-linear-to-br from-gradient-1 to-gradient-2 hover:bg-linear-to-bl"
              >
                <Link href={ROUTES.SIGNUP}>Signup</Link>
              </Button>
              <ThemeToggler />
            </div>
          </nav>
          <SmallScreensSidebar navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}

export default Header;
