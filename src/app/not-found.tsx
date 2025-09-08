"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    // تشخیص زبان از localStorage یا browser
    const savedLocale = localStorage.getItem("locale") || "en";
    router.replace(`/${savedLocale}/not-found`);
  }, [router]);

  // صفحه loading ساده تا redirect انجام شود
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
};

export default NotFoundPage;
