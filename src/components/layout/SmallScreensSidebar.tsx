"use client";

import { Button } from "@/components/ui/button";
import { Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "./Header";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import ThemeToggler from "../ThemeToggler";

function SmallScreensSidebar({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Disable scroll when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll when sidebar is closed
      document.body.style.overflow = "auto";
    }

    function handleResize() {
      const isSmallDevice = window.innerWidth < 768;
      if (!isSmallDevice) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <div className="relative md:hidden z-10">
      <div className="flex items-center">
        <ThemeToggler />
        <Button
          variant="ghost"
          className="cursor-pointer"
          aria-label="open sidebar"
          onClick={() => {
            setIsOpen((state) => !state);
          }}
        >
          <Menu />
        </Button>
      </div>
      <div
        className={`fixed top-0 ${
          isOpen ? "end-0" : "-end-full"
        } bg-background p-10 h-full w-full flex flex-col justify-center items-center transition-all gap-5`}
      >
        <Button
          variant="outline"
          className="cursor-pointer absolute top-3 end-3"
          aria-label="close sidebar"
          onClick={() => {
            setIsOpen((state) => !state);
          }}
        >
          <X />
        </Button>
        {navLinks.map((link, i) => {
          return (
            <Button asChild key={i} variant="ghost" className="w-full">
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
          role="separator"
          aria-orientation="horizontal"
          aria-disabled
          className="w-full h-px bg-secondary rounded-lg"
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
        </div>
      </div>
    </div>
  );
}

export default SmallScreensSidebar;
