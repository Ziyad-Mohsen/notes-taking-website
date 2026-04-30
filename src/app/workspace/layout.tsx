import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/workspace/Sidebar/AppSidebar";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import { getProfile } from "@/lib/dal";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  return (
    <SidebarProvider>
      <AppSidebar
        profile={profile}
        side={locale === "ar" ? "right" : "left"}
        collapsible="icon"
      />
      <main className="w-full max-h-screen flex flex-col bg-secondary">
        <WorkspaceHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
