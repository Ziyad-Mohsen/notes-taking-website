import { SidebarTrigger } from "../ui/sidebar";
import SearchBar from "./SearchBar";
import ThemeToggler from "../ThemeToggler";
import ChangeLanguage from "../ChangeLanguage";
import { headers } from "next/headers";

async function WorkspaceHeader() {
  const headersStore = await headers();
  const pathname = headersStore.get("x-pathname");

  // console.log(pathname);

  return (
    <header className="bg-sidebar border-b border-sidebar-border w-full">
      <div className="py-1.5 px-2 flex items-center justify-between">
        <SidebarTrigger />

        <div className="fex items-center gap-2">
          <ThemeToggler />
          <ChangeLanguage />
        </div>
      </div>
    </header>
  );
}

export default WorkspaceHeader;
