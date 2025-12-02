import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Noqta",
  description:
    "Noqta is a powerful yet simple note-taking app designed for clarity and productivity. Capture ideas, organize thoughts, and never lose track of what's important.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
