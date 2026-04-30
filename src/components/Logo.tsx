"use client";

import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  dir?: "row" | "row-reverse" | "column" | "column-reverse";
  showTitle?: boolean;
}

const flexDir = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  column: "flex-col",
  "column-reverse": "flex-col-reverse",
};

function Logo({ dir = "row", showTitle = false }: LogoProps) {
  const t = useTranslations("metadata");

  return (
    <Link
      href={ROUTES.ROOT}
      className={cn("flex items-center gap-2 px-2 rounded-lg", flexDir)}
    >
      <Image
        src="/logo.svg"
        alt="website logo svg image"
        width={38}
        height={38}
      />
      {showTitle && (
        <span className="text-xl font-bold text-foreground">{t("title")}</span>
      )}
    </Link>
  );
}

export default Logo;
