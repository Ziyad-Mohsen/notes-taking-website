import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ArrowRight, Lock, Moon, Save, Sparkles } from "lucide-react";
import HeroDemo from "./HeroDemo";

type FeatureTag = {
  icon: React.ElementType;
  text: string;
};

const featureTags: FeatureTag[] = [
  { icon: Save, text: "Auto Save" },
  { icon: Lock, text: "Privacy-first" },
  { icon: Moon, text: "Dark Mode" },
  { icon: Sparkles, text: "Beautiful UI" },
];

function Hero() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-background via-gradient-1/90 via-40% to-background">
      <div className="h-full w-full bg-background/80 backdrop-blur-2xl flex items-center">
        <div className="container section-padding">
          {/* Hero Text */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="rounded-full border bg-primary/10 text-primary py-2 px-3">
                Your thoughts, beautifully organized
              </div>
              <h1 className="text-5xl font-bold text-foreground">
                Your Second Brain,{" "}
                <span className="bg-linear-to-br from-gradient-1 to-gradient-2 bg-clip-text text-transparent">
                  Reimagined.
                </span>
              </h1>
              <p className="max-w-[600px] min-w-full text-muted-foreground text-lg leading-8">
                Noqta is a powerful yet simple note-taking app designed for
                clarity and productivity. Capture ideas, organize thoughts, and
                never lose track of what's important.
              </p>
              <div className="flex max-md:flex-col items-center gap-2">
                <Button
                  asChild
                  size="xl"
                  className="group hover:shadow-lg transition-shadow bg-linear-to-br from-gradient-1 to-gradient-2 hover:bg-linear-to-bl text-lg"
                >
                  <Link href={ROUTES.SIGNUP}>
                    Get Started{" "}
                    <ArrowRight
                      strokeWidth={2}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="bg-background hover:bg-background/30 shadow-none border text-lg text-muted-foreground"
                >
                  <Link href={ROUTES.SIGNUP}>Explore Features</Link>
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {featureTags.map((tag, i) => {
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
