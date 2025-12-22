import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default async function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
