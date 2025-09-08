import { useTranslations } from "next-intl";

const CustomNotFoundPage = () => {
  const t = useTranslations("notFound");

  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      <p className="text-muted-foreground text-center max-w-md">
        {t("description")}
      </p>
    </div>
  );
};

export default CustomNotFoundPage;
