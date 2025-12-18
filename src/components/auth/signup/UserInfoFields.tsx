import { useFormContext } from "react-hook-form";
import InputField from "../InputField";
import { SignupFormSchema } from "@/validation/auth/schema";
import { useTranslations } from "next-intl";
import { AtSignIcon, Eye, EyeClosed, User } from "lucide-react";
import { useState } from "react";

interface UserInfoFieldsProps {
  isActive?: boolean;
}

function UserInfoFields({ isActive = true }: UserInfoFieldsProps) {
  const form = useFormContext<SignupFormSchema>();
  const t = useTranslations("pages.auth.signup");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
        startIcon={<User />}
        inputButton={{
          component: showPassword ? <Eye /> : <EyeClosed />,
          onClick: () => {
            setShowPassword(!showPassword);
          },
        }}
      />
      <InputField
        form={form}
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        label={t("fields.confirmPassword")}
        placeholder={t("fields.confirmPasswordPlaceholder")}
        startIcon={<User />}
        inputButton={{
          component: showConfirmPassword ? <Eye /> : <EyeClosed />,
          onClick: () => {
            setShowConfirmPassword(!showConfirmPassword);
          },
        }}
      />
    </>
  );
}

export default UserInfoFields;
