import VerifyOtpForm from "@/components/auth/verifyOtp/VerifyOtpForm";
import { ROUTES } from "@/constants/routes";
import { emailSchema } from "@/validation/auth/schema";
import { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const EMAIL_OTP_TYPES: EmailOtpType[] = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
];

export default async function VerifyOtp({
  searchParams,
}: {
  searchParams: Promise<{ type: EmailOtpType; email: string }>;
}) {
  const { type, email } = await searchParams;

  // @ts-ignore
  const result = emailSchema().safeParse(email);
  const isValidEmail = result.success;

  if (!type || !EMAIL_OTP_TYPES.includes(type) || !email || !isValidEmail) {
    redirect(ROUTES.LOGIN);
  }

  return <VerifyOtpForm type={type} email={email} />;
}
