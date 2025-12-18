import { Field, FieldError } from "@/components/ui/field";
import { ROUTES } from "@/constants/routes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import Link from "next/link";
import { SignupFormSchema } from "@/validation/auth/schema";
import { useTranslations } from "next-intl";

interface AcceptTermsProps {
  isActive?: boolean;
}

function AcceptTerms({ isActive = true }: AcceptTermsProps) {
  const t = useTranslations("pages.auth.signup.terms");
  const form = useFormContext<SignupFormSchema>();

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-3 text-sm">
        <p className="text-muted-foreground">{t("readAndAccept")}</p>
        <div className="space-y-2">
          <div className="rounded-md border p-4 space-y-2 max-h-48 overflow-y-auto">
            <h3 className="font-semibold">{t("termsOfService")}</h3>
            <p className="text-muted-foreground text-xs">{t("termsContent")}</p>
          </div>
          <div className="rounded-md border p-4 space-y-2 max-h-48 overflow-y-auto">
            <h3 className="font-semibold">{t("privacyPolicy")}</h3>
            <p className="text-muted-foreground text-xs">
              {t("privacyContent")}
            </p>
          </div>
        </div>
      </div>
      <Controller
        name="acceptedTerms"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2">
              <Checkbox
                id="acceptedTerms"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <Label
                htmlFor="acceptedTerms"
                className="text-sm font-normal cursor-pointer leading-relaxed"
              >
                {t("acceptTerms")}{" "}
                <Link
                  href={ROUTES.TERMS}
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("termsOfService")}
                </Link>{" "}
                {t("and")}{" "}
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("privacyPolicy")}
                </Link>
              </Label>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

export default AcceptTerms;
