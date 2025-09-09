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
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const locales = [
    { code: "en", name: t("en") },
    { code: "fa", name: t("fa") },
    { code: "ar", name: t("ar") },
  ];

  const changeLocale = (newLocale: string) => {
    const cleanPathname = pathname.replace(/^\/(en|fa|ar)/, "");
    startTransition(() => {
      router.replace(`/${newLocale}${cleanPathname}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {locale === "fa" ? "فا" : locale === "en" ? "en" : "العر"}
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
