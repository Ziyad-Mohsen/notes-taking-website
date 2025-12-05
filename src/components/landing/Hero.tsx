import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ArrowRight, Lock, Moon, Save, Sparkles } from "lucide-react";
import HeroDemo from "./HeroDemo";
import { getTranslations } from "next-intl/server";

type FeatureTag = {
  icon: React.ElementType;
  text: string;
};

function getFeaturesTags(t): FeatureTag[] {
  return [
    { icon: Save, text: t("features.autoSave") },
    { icon: Lock, text: t("features.privacyFirst") },
    { icon: Moon, text: t("features.darkMode") },
    { icon: Sparkles, text: t("features.beautifulUI") },
  ];
}

async function Hero() {
  const t = await getTranslations("pages.landing.hero");
  const featuresTags = getFeaturesTags(t);

  return (
    <section className="relative min-h-screen bg-linear-to-br from-background via-gradient-1/90 via-40% to-background border-b border-accent">
      <div className="h-full w-full bg-background/80 backdrop-blur-2xl flex items-center">
        <div className="container section-padding">
          {/* Hero Text */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="rounded-full border bg-primary/10 text-primary py-2 px-3">
                {t("tagline")}
              </div>
              <h1 className="text-5xl font-bold text-foreground">
                {t("headline")}
                <span className="bg-linear-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent">
                  {t("headlineHighlight")}
                </span>
              </h1>
              <p className="max-w-[600px] min-w-full text-muted-foreground text-lg leading-8">
                {t("description")}
              </p>
              <div className="flex max-md:flex-col items-center gap-2">
                <Button
                  asChild
                  size="xl"
                  className="group hover:shadow-lg transition-shadow bg-linear-to-br from-gradient-1 to-gradient-2 hover:bg-linear-to-bl text-lg"
                >
                  <Link href={ROUTES.SIGNUP}>
                    {t("ctaPrimary")}
                    <ArrowRight
                      strokeWidth={2}
                      className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="bg-background hover:bg-background/30 shadow-none border text-lg text-muted-foreground"
                >
                  <Link href={ROUTES.SIGNUP}>{t("ctaSecondary")}</Link>
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {featuresTags.map((tag, i) => {
                  const Icon = tag.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-primary bg-background px-3 py-2 rounded-full border"
                    >
                      <Icon strokeWidth={1} size={20} />
                      <span className="text-muted-foreground">{tag.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hero Demonstration */}
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}

export default Hero;
