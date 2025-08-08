"use client";

import { login } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const handleFormSubmition = (formData: FormData) => {
    startTransition(async () => {
      try {
        const error = await login(formData);
        if (error) {
          toast.error(error);
        } else {
          toast.success("logged in successfully");
          revalidatePath("/", "layout");
          redirect("/");
        }
      } catch (error) {
        console.log("error in signup", error);
        toast.error("Somthing went wrong please try again later");
      }
    });
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-5 text-center">Log in</h2>
      <form className="flex flex-col gap-5" action={handleFormSubmition}>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button className="cursor-pointer" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              login...
            </>
          ) : (
            "login"
          )}
        </Button>
        <Link href="/auth/signup" className="underline text-sm">
          Don&apos;t have an account? <span className="font-bold">signup</span>
        </Link>
      </form>
    </>
  );
}
