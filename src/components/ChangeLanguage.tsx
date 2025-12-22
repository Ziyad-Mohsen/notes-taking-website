// src/components/LocaleSwitcher.tsx (Client Component)
"use client";

import { setUserLocale } from "@/actions/changeLocale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

const languagesMap = {
  en: "English",
  ar: "العربية",
};

export default function ChangeLanguage() {
  const currentLocale = useLocale();
  const router = useRouter();

  async function handleLocaleChange(newLocale: string) {
    if (newLocale !== currentLocale) {
      await setUserLocale(newLocale);
      router.refresh();
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Languages strokeWidth={1.5} />
          {languagesMap[currentLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange("ar")}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
