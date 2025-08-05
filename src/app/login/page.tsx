import { signup, login } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full mx-5 md:w-1/2 xl:w-1/4 bg-secondary p-5 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-5 text-center">Sign Up</h2>
        <form className="flex flex-col gap-5">
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
          <Button className="cursor-pointer" formAction={signup}>
            signup
          </Button>
          <Button className="cursor-pointer" formAction={login}>
            login
          </Button>
        </form>
      </div>
    </div>
  );
}
