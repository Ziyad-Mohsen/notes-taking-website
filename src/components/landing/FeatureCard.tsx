import { cn } from "@/lib/utils";
import { Feature } from "@/types";

interface FeatureCardProps {
  feature: Feature;
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;
  return (
    <div className="flex flex-col gap-2 bg-background text-card-foreground p-5 rounded-lg border hover:drop-shadow-xl hover:border-primary transition-all">
      <div
        className={cn(
          "w-fit p-3 rounded-lg",
          feature.iconColor ? feature.iconColor : "text-primary",
          feature.iconBgColor ? feature.iconBgColor : "text-accent"
        )}
      >
        <Icon strokeWidth={1} />
      </div>
      <h3 className="font-semibold text-lg">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  );
}

export default FeatureCard;
