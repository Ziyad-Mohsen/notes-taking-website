"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { signOut } from "@/actions/actions";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut();
        toast.success("Logged out");
      } catch (error) {
        console.log("Error in sign out", error);
        toast.error("Failed to logout");
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="hover:text-red-500 cursor-pointer">
          <LogOut />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        align="end"
        className="bg-accent border-1 shadow-lg border-foreground p-5 rounded-2xl flex flex-col items-center gap-2"
      >
        <div className="text-xl font-semibold">Are you sure?</div>
        <div className="flex gap-2">
          <PopoverClose asChild>
            <Button size="sm" className="cursor-pointer" disabled={isPending}>
              Cancel
            </Button>
          </PopoverClose>
          <Button
            variant="destructive"
            className="cursor-pointer"
            disabled={isPending}
            onClick={handleSignOut}
            size="sm"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Logging out..
              </>
            ) : (
              "logout"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
