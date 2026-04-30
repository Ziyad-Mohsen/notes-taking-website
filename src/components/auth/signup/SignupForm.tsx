"use client";

import { SignupFormSchema } from "@/validation/auth/schema";
import AuthHeader from "../AuthHeader";
import { FormProvider, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { ArrowRight, User } from "lucide-react";
import { useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { FormStep } from "./types";
import StepsIndicator from "../StepsIndicator";
import SignupCredentialFields from "./SignupCredentialFields";
import AcceptTerms from "./AcceptTerms";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { signup } from "@/actions/auth/signup.action";
import { Spinner } from "@/components/ui/Spinner";

function SignupForm() {
  const t = useTranslations("pages.auth.signup");
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(SignupFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const formSteps: FormStep<SignupFormSchema>[] = [
    {
      title: t("steps.enterInfo"),
      component: SignupCredentialFields,
      fields: ["email", "password", "confirmPassword"],
    },
    {
      title: t("steps.termsPrivacy"),
      component: AcceptTerms,
      fields: ["acceptedTerms"],
    },
  ];

  async function handleSignUp(formData: SignupFormSchema) {
    const { email, password } = formData;
    startTransition(async () => {
      const { success, error } = await signup(email, password);

      if (!success) {
        toast.error(error?.message, { position: "top-center" });
      }
    });
  }

  const handleNextStep = async (stepFields: Path<SignupFormSchema>[]) => {
    const result = await form.trigger(stepFields);
    if (result) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  const handlePreviousStep = async () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-5">
        <AuthHeader
          header={t("header")}
          subtext={formSteps[currentStep].title}
        />
        <StepsIndicator steps={formSteps} currentStep={currentStep} />

        {/* Multi step form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-5"
        >
          <FieldGroup className="gap-3 text-start">
            {formSteps.map((step, i) => {
              const StepComponent = step.component;
              return <StepComponent key={i} isActive={currentStep === i} />;
            })}
          </FieldGroup>
        </form>

        {/* Buttons */}
        <div className="flex items-center">
          {currentStep !== 0 && (
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
            >
              <ArrowRight className="ltr:rotate-180" />
              {t("buttons.back")}
            </Button>
          )}
          {currentStep < formSteps.length - 1 && (
            <Button
              className="ms-auto"
              type="button"
              onClick={() => handleNextStep(formSteps[currentStep].fields)}
            >
              {t("buttons.next")}
              <ArrowRight className="rtl:rotate-180" />
            </Button>
          )}
          {currentStep === formSteps.length - 1 && (
            <Button
              disabled={!form.formState.isValid || isPending}
              className="ms-auto"
              type="button"
              onClick={form.handleSubmit(handleSignUp)}
            >
              {t("buttons.createAccount", {
                loading: isPending ? "true" : "false",
              })}
              {isPending ? <Spinner /> : <User />}
            </Button>
          )}
        </div>

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
