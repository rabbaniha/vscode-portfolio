import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/commom/LocaleSwitcher";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <div>
      <h1>{t("hero.greeting") + " " + t("hero.name")}</h1>
      <LocaleSwitcher />
      <Link href="/about">{t("about.title")}</Link>
    </div>
  );
}
