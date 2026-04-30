"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { SigninFormSchema } from "@/validation/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, User } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import AuthHeader from "../AuthHeader";
import InputField from "../InputField";
import { useState, useTransition } from "react";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "sonner";
import { login } from "@/actions/auth/login.action";
import { confirmEmail } from "@/actions/auth/confirmEmail.action";
import { Spinner } from "@/components/ui/Spinner";

function SignInForm() {
  const t = useTranslations("pages.auth.login");
  const [isPending, startTransition] = useTransition();
  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(SigninFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleSignIn(formData: SigninFormSchema) {
    startTransition(async () => {
      const { success, error } = await login(formData);

      if (!success) {
        if (error?.code === "email_not_confirmed") {
          toast.warning(error.code, {
            position: "top-center",
            action: {
              label: "confirm",
              onClick: () => {
                handleConfirmEmail(formData.email);
              },
            },
          });
        } else {
          toast.error(error?.message, { position: "top-center" });
        }
      }
    });
  }

  async function handleConfirmEmail(email: string) {
    const { success, error } = await confirmEmail(email);

    if (!success) {
      toast.error(error?.message, { position: "top-center" });
    }
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-5">
        <AuthHeader header={t("header")} subtext={t("subtext")} />
        <form>
          <FieldGroup className="gap-3 text-start">
            <InputField
              form={form}
              name="email"
              label={t("fields.email")}
              placeholder={t("fields.emailPlaceholder")}
              startIcon={<User />}
            />
            <InputField
              form={form}
              name="password"
              type={showPassword ? "text" : "password"}
              label={t("fields.password")}
              placeholder={t("fields.passwordPlaceholder")}
              startIcon={<Lock />}
              inputButton={{
                component: showPassword ? <Eye /> : <EyeClosed />,
                onClick: () => {
                  setShowPassword(!showPassword);
                },
              }}
            />
          </FieldGroup>
        </form>
        <Button
          disabled={isPending}
          type="button"
          onClick={form.handleSubmit(handleSignIn)}
        >
          {t("buttons.login", {
            loading: isPending ? "true" : "false",
          })}
          {isPending ? <Spinner /> : <User />}
        </Button>

        {/* Separator */}
        <div className="relative w-full h-5">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3/7 h-0.5 bg-border" />
          <span className="absolute top-2/4 left-1/2 -translate-x-1/2 w-1/7 -translate-y-1/2">
            {t("buttons.or")}
          </span>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3/7 h-0.5 bg-border" />
        </div>

        {/* Have account */}
        <div className="font-light">
          {t("buttons.noAccount")}{" "}
          <Link
            className={cn(
              buttonVariants({ variant: "link" }),
              "p-1 font-bold text-md",
            )}
            href={ROUTES.SIGNUP}
          >
            {t("buttons.signup")}
          </Link>
        </div>
      </div>
    </FormProvider>
  );
}

export default SignInForm;
