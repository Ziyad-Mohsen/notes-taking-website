import { TFn } from "./types";

export function msg(
  t: TFn | undefined,
  defaultErrors: Record<string, string>,
  key: keyof typeof defaultErrors
) {
  return t ? t(`errors.${key}`) : defaultErrors[key];
}
