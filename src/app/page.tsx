import { getAuthUser, getNotes } from "@/actions/actions";
import Hero from "@/components/landing/Hero";
import Header from "@/components/layout/Header";

export default async function Home() {
  const user = await getAuthUser();
  const notes = await getNotes();

  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}
