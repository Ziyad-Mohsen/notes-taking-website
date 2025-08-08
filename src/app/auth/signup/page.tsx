"use client";

import { signup } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleFormSubmition = (formData: FormData) => {
    startTransition(async () => {
      try {
        const error = await signup(formData);
        if (error) {
          toast.error(error);
        } else {
          toast.success("signed up successfully");
          router.push("/");
        }
      } catch (error) {
        console.log("error in signup", error);
        toast.error("Somthing went wrong please try again later");
      }
    });
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-5 text-center">Sign up</h2>
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
              sign up...
            </>
          ) : (
            "sign up"
          )}
        </Button>
        <Link href="/auth/login" className="underline text-sm">
          Have an account? <span className="font-bold">login</span>
        </Link>
      </form>
    </>
  );
}
