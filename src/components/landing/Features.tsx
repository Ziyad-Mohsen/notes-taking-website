import { features } from "@/constants";
import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="section-padding">
      <div className="container space-y-10">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-2xl text-foreground font-semibold">
            Powerful Features
          </h2>
          <p className="text-muted-foreground">
            Everything you need to capture, organize, and find your notes
            effortlessly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard feature={feature} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
