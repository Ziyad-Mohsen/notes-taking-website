import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

async function Footer() {
  const t = await getTranslations("layout.footer");

  return (
    <section className="bg-muted border-t py-5">
      <div className="container flex flex-col items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt={t("logo")}
            loading="lazy"
            width={24}
            height={24}
          />
          <span>
            &#169; {new Date().getFullYear()} {t("logo")}. {t("rights")}
          </span>
        </div>
        <div>
          {t("builtBy")}{" "}
          <Link
            className="font-semibold"
            href="https://github.com/Ziyad-Mohsen"
          >
            {t("developerName")}
          </Link>
          .
        </div>
      </div>
    </section>
  );
}

export default Footer;
