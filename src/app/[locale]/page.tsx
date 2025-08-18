import SnakeGame from "@/components/home/SnakeGame";
import Header from "@/components/layout/Header";
import { Link } from "@/i18n/navigation";
import { div } from "framer-motion/client";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home.hero");
  return (
    <div className=" w-full max-w-5xl m-auto h-full flex items-center justify-between ">
      <div className="space-y-16">
        <div className=" space-y-3">
          <p className=" text-sm ">{t("greeting")}</p>
          <h1 className=" text-4xl">{t("name")}</h1>
          <p className=" text-xl text-primary flex items-center gap-2">
            <ChevronRight />
            {t("title")}
          </p>
        </div>
        <div className=" space-y-3">
          <p className=" text-foreground/50 text-lg">//{t("cta.title")}</p>
          <div className=" flex items-center gap-4">
            <span className=" text-primary">{t("cta.sub-title")}</span>
            <Link
              target="/blank"
              className=" underline text-accent"
              href={"https://github.com/rabbaniha"}
            >
              {t("cta.link")}
            </Link>
          </div>
        </div>
      </div>
      <SnakeGame />
    </div>
  );
}
