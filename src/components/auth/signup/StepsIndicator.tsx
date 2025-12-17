import React, { Fragment } from "react";
import { SignupFormStep } from "./types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function StepsIndicator({
  steps,
  currentStep,
}: {
  steps: SignupFormStep[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        {steps.map((step, i) => {
          return (
            <Fragment key={i}>
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center p-4",
                  currentStep >= i
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <div>{currentStep <= i ? i + 1 : <Check size={18} />}</div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-10 h-1 rounded-lg",
                    currentStep > i ? "bg-primary" : "bg-secondary"
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default StepsIndicator;
