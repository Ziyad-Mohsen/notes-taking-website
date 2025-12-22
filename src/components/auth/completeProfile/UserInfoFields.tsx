import { useFormContext } from "react-hook-form";
import InputField from "../InputField";
import { CompleteProfileSchema } from "@/validation/auth/schema";
import { useTranslations } from "next-intl";
import { AtSignIcon, User } from "lucide-react";

interface UserInfoFieldsProps {
  isActive?: boolean;
}

function UserInfoFields({ isActive = true }: UserInfoFieldsProps) {
  const form = useFormContext<CompleteProfileSchema>();
  const t = useTranslations("pages.auth.completeProfile");

  if (!isActive) return null;

  return (
    <>
      <InputField
        form={form}
        name="name"
        label={t("fields.name")}
        placeholder={t("fields.namePlaceholder")}
        startIcon={<User />}
      />
      <InputField
        form={form}
        name="username"
        label={t("fields.username")}
        placeholder={t("fields.usernamePlaceholder")}
        startIcon={<AtSignIcon />}
      />
    </>
  );
}

export default UserInfoFields;
