"use client";

import { Controller, UseFormReturn, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { HTMLInputTypeAttribute } from "react";

interface InputFieldProps<TFormSchema extends Record<string, any>> {
  form: UseFormReturn<TFormSchema>;
  name: Path<TFormSchema>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: "on" | "off";
  inputButton?: {
    component: React.ReactNode;
    onClick: () => void;
  };
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function InputField<TFormSchema extends Record<string, any>>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete = "on",
  inputButton,
  startIcon,
  endIcon,
}: InputFieldProps<TFormSchema>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <InputGroup>
            {startIcon && <InputGroupAddon>{startIcon}</InputGroupAddon>}
            <InputGroupInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
              type={type}
            />
            {endIcon && (
              <InputGroupAddon align="inline-end">{endIcon}</InputGroupAddon>
            )}
            {inputButton && (
              <InputGroupButton
                className="cursor-pointer"
                variant="link"
                onClick={inputButton.onClick}
              >
                {inputButton.component}
              </InputGroupButton>
            )}
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default InputField;
