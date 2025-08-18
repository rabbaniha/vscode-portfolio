"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher"); // برای ترجمه‌های مربوط به سوئیچر
  const locale = useLocale(); // دریافت زبان فعلی
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const locales = [
    { code: "en", name: t("en") }, // نام زبان‌ها از فایل‌های ترجمه
    { code: "fa", name: t("fa") },
    // سایر زبان‌ها
  ];

  const changeLocale = (newLocale: string) => {
    startTransition(() => {
      // جایگزینی زبان در URL
      router.replace(`/${newLocale}${pathname}`);
    });
  };

  return (
    <select
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      disabled={isPending}
      className="p-2 border rounded"
    >
      {locales.map((loc) => (
        <option key={loc.code} value={loc.code}>
          {loc.name}
        </option>
      ))}
    </select>
  );
}
