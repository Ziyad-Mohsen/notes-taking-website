import { getTranslations } from "next-intl/server";

async function Banner() {
  const t = await getTranslations("layout.banner");

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20">
      <div className="container py-3 text-center text-sm font-medium text-amber-600 dark:text-amber-400">
        {t("text")}
      </div>
    </div>
  );
}

export default Banner;
