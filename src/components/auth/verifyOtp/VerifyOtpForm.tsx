"use client";

import { verifyOtp } from "@/actions/auth/verifyOtp.action";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/lib/supabase/client";
import { EmailOtpType } from "@supabase/supabase-js";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useTranslations } from "next-intl";
import { Fragment, useState, useTransition } from "react";
import { toast } from "sonner";

interface VerifyOtpFormProps {
  email: string;
  type: EmailOtpType;
}

export default function VerifyOtpForm({ email, type }: VerifyOtpFormProps) {
  const t = useTranslations("pages.auth.verifyOtp");
  const [token, setToken] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  function handleVerify() {
    startTransition(async () => {
      const { success, error } = await verifyOtp({ email, token, type });

      if (!success) {
        toast.error(error?.message, { position: "top-center" });
      }
    });
  }

  async function handleResendEmail() {
    const supabase = createClient();

    const { error } = await supabase.auth.resend({ email, type: "signup" });

    if (!error) {
      toast(t("toasts.codeSent"));
    } else {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("header")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("subtext", { email })}
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={token}
            onChange={setToken}
            disabled={isPending}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <Fragment key={i}>
                  {i === 3 && <InputOTPSeparator />}
                  <InputOTPSlot index={i} />
                </Fragment>
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Verify Button */}
        <Button
          className="w-full"
          disabled={token.length !== 6 || isPending}
          onClick={handleVerify}
        >
          {t("buttons.verify", { loading: isPending ? "true" : "false" })}
        </Button>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          {t("footer.noCode")}{" "}
          <Button
            variant="link"
            type="button"
            className="underline underline-offset-4 p-1 text-muted-foreground hover:text-foreground"
            onClick={handleResendEmail}
          >
            {t("buttons.resend")}
          </Button>
        </div>
      </div>
    </div>
  );
}
