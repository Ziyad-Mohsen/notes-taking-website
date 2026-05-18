"use server";

import { cookies } from "next/headers";
import { defaultLocale, locales } from "@/i18n/config";

export async function setUserLocale(newLocale: string) {
  const store = await cookies();

  if (locales.includes(newLocale as any)) {
    store.set("NEXT_LOCALE", newLocale, { path: "/" });
  } else {
    store.set("NEXT_LOCALE", defaultLocale, { path: "/" });
  }
}
