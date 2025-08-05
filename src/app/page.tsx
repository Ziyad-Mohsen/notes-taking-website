import { getAuthUser, getNotes } from "@/actions/actions";
import Header from "@/components/Header";
import NotesFeed from "@/components/NotesFeed";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const user = await getAuthUser();
  const notes = await getNotes();

  return (
    <div>
      <Header />
      <div className="container my-5">
        {user !== null ? (
          <NotesFeed notes={notes} user={user} />
        ) : (
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Organize Your Thoughts <br className="hidden md:block" /> With
                Ease ✍️
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Take notes, stay productive, and access them anywhere. Secure.
                Simple. Fast.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "text-bold"
                  )}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
