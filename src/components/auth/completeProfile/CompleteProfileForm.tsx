"use client";

import { CompleteProfileSchema } from "@/validation/auth/schema";
import AuthHeader from "@/components/auth/AuthHeader";
import { FormProvider, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { ArrowRight, UserCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FormStep } from "@/components/auth/signup/types";
import StepsIndicator from "@/components/auth/StepsIndicator";
import AvatarSelector from "@/components/auth/completeProfile/AvatarSelector";
import { useTranslations } from "next-intl";
import UserInfoFields from "@/components/auth/completeProfile/UserInfoFields";
import { useRouter } from "next/navigation";
import { completeProfile } from "@/actions/auth/completeProfile.action";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";

function CompleteProfileForm() {
  const t = useTranslations("pages.auth.completeProfile");
  const router = useRouter();
  const form = useForm<CompleteProfileSchema>({
    resolver: zodResolver(CompleteProfileSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      avatar: null,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const formSteps: FormStep<CompleteProfileSchema>[] = [
    {
      title: t("steps.userInfo"),
      component: UserInfoFields,
      fields: ["name", "username", "avatar"],
    },
    {
      title: t("steps.uploadAvatar"),
      component: AvatarSelector,
      fields: ["avatar"],
    },
  ];

  function handleCompleteProfile(formData: CompleteProfileSchema) {
    startTransition(async () => {
      const { success, error } = await completeProfile(formData);

      if (!success) {
        toast.error(error?.message, { position: "top-center" });
      }
    });
  }

  const handleNextStep = async (stepFields: Path<CompleteProfileSchema>[]) => {
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
              onClick={form.handleSubmit(handleCompleteProfile)}
            >
              {t("buttons.createAccount", {
                loading: isPending ? "true" : "false",
              })}
              {isPending ? <Spinner /> : <UserCheck />}
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}

export default CompleteProfileForm;
