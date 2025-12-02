import { Skeleton } from "../ui/skeleton";

function HeroDemo() {
  return (
    <div
      aria-hidden={true}
      className="w-full md:w-3/4 mx-auto rounded-t-lg shadow-2xl h-100 bg-background/50 backdrop-blur-3xl border overflow-hidden"
    >
      <div className="border-b h-8 flex items-center px-2 bg-secondary">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="px-5 py-2 bg-card border-b flex items-center justify-between">
        <Skeleton className="h-2 w-1/4" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array(5)
          .fill(null)
          .map((_, i) => {
            return (
              <div
                className="p-5 border rounded-lg bg-card flex flex-col space-y-3"
                key={i}
              >
                <Skeleton className="h-2 w-3/4" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-16 w-full delay-300" />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HeroDemo;
