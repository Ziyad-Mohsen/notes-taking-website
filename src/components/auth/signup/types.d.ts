import { SignupFormSchema } from "@/validation/auth/schema";
import { Path } from "react-hook-form";

export type SignupFormStep = {
  title: string;
  component: React.ComponentType<{ isActive?: boolean }>;
  fields: Path<SignupFormSchema>[];
};
