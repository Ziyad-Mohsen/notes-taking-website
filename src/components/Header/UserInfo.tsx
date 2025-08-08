import { User } from "@supabase/supabase-js";

export default function UserInfo({ user }: { user: User }) {
  return <div>{user.email?.split("@")[0]}</div>;
}
