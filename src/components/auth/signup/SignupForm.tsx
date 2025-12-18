"use client";

import { SignupFormSchema } from "@/validation/auth/schema";
import AuthHeader from "../AuthHeader";
import { FormProvider, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { ArrowRight, User } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SignupFormStep } from "./types";
import StepsIndicator from "./StepsIndicator";
import UserInfoFields from "./UserInfoFields";
import AvatarSelector from "./AvatarSelector";
import AcceptTerms from "./AcceptTerms";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function SignupForm() {
  const t = useTranslations("pages.auth.signup");
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(SignupFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      acceptedTerms: false,
    },
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps = useMemo<SignupFormStep[]>(
    () =>
      [
        {
          title: t("steps.enterInfo"),
          component: <UserInfoFields />,
          fields: ["name", "username", "email", "password", "confirmPassword"],
        },
        {
          title: t("steps.uploadAvatar"),
          component: <AvatarSelector />,
          fields: ["avatar"],
        },
        {
          title: t("steps.termsPrivacy"),
          component: <AcceptTerms />,
          fields: ["acceptedTerms"],
        },
      ] as const,
    [t]
  );

  async function handleSignUp(data: SignupFormSchema) {
    console.log(data);
  }

  const handleNextStep = async (stepFields: Path<SignupFormSchema>[]) => {
    const result = await form.trigger(stepFields);
    if (result) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePreviousStep = async () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-5">
        <AuthHeader header={t("header")} subtext={steps[currentStep].title} />
        <StepsIndicator steps={steps} currentStep={currentStep} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-5"
        >
          <Fragment>
            <FieldGroup className="gap-3 text-start">
              {steps[currentStep].component}
            </FieldGroup>
          </Fragment>
        </form>
        <div className="flex items-center">
          {currentStep !== 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
            >
              <ArrowRight className="ltr:rotate-180" />
              {t("buttons.back")}
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              className="ms-auto"
              type="button"
              onClick={() => handleNextStep(steps[currentStep].fields)}
            >
              {t("buttons.next")}
              <ArrowRight className="rtl:rotate-180" />
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              disabled={!form.formState.isValid}
              className="ms-auto"
              type="button"
              onClick={form.handleSubmit(handleSignUp)}
            >
              {t("buttons.createAccount")}
              <User />
            </Button>
          )}
        </div>
        <div className="relative w-full h-5">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3/7 h-0.5 bg-border" />
          <span className="absolute top-2/4 left-1/2 -translate-x-1/2 w-1/7 -translate-y-1/2">
            {t("buttons.or")}
          </span>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3/7 h-0.5 bg-border" />
        </div>
        <div className="font-light">
          {t("buttons.alreadyHaveAccount")}{" "}
          <Link
            className={cn(
              buttonVariants({ variant: "link" }),
              "p-1 font-bold text-md"
            )}
            href={ROUTES.LOGIN}
          >
            {t("buttons.login")}
          </Link>
        </div>
      </div>
    </FormProvider>
  );
}

export default SignupForm;
