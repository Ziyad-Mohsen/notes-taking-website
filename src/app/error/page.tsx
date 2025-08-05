"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const [error, setError] = useState<string | null>("something went wrong");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("message")) {
      setError(searchParams.get("message"));
    }
  }, [searchParams]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-4xl">
      <h2 className="text-4xl">Erorr</h2>
      <p>{error}</p>
    </div>
  );
}
