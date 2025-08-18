"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher"); // برای ترجمه‌های مربوط به سوئیچر
  const locale = useLocale(); // دریافت زبان فعلی
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const locales = [
    { code: "en", name: t("en") }, // نام زبان‌ها از فایل‌های ترجمه
    { code: "fa", name: t("fa") },
    { code: "ar", name: t("ar") },
  ];

  const changeLocale = (newLocale: string) => {
    // حذف زبان فعلی از pathname
    const cleanPathname = pathname.replace(/^\/(en|fa|ar)/, "");
    startTransition(() => {
      // اضافه کردن زبان جدید به مسیر
      router.replace(`/${newLocale}${cleanPathname}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("fa")}>
          {t("fa")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("ar")}>
          {t("ar")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
