"use client";
import SnakeGame from "@/components/home/SnakeGame";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { easeInOut, easeOut, motion } from "framer-motion";
import { useState, useEffect } from "react";

// انیمیشن تایپینگ سفارشی
const TypewriterText = ({ text, delay = 0, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }
      },
      currentIndex === 0 ? delay : speed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <span className="relative">
      {displayedText}
      {currentIndex <= text.length && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-primary ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </span>
  );
};

// انیمیشن‌های متنوع برای ورود
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 1.2, // شروع بعد از greeting
    },
  },
};

const chevronVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.5,
    delay: 3,
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 3,
    },
  },
};

const snakeGameVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      delay: 1.5,
      ease: easeOut,
    },
  },
};

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("home.hero");

  return (
    <motion.div
      className="w-[98%] lg:w-[90%]  mx-auto h-full flex flex-col lg:flex-row  items-center py-32 lg:py-0 gap-16 
      lg:gap-0  overflow-y-auto lg:overflow-y-hidden scrollbar-hide overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-16 lg:w-1/2">
        {/* بخش اصلی */}
        <div className="space-y-3">
          {/* Greeting با انیمیشن fade up */}
          <motion.p className="text-sm" variants={itemVariants}>
            <TypewriterText text={t("greeting")} delay={500} speed={80} />
          </motion.p>
          {/* نام با انیمیشن تایپینگ */}
          <motion.div className="relative">
            <motion.h1
              className="text-wrap text-4xl font-bold z-50"
              variants={titleVariants}
            >
              <TypewriterText text={t("name")} delay={1200} speed={100} />
            </motion.h1>

            {/* افکت نورپردازی پشت متن */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/50 to-primary/20 blur-xl z-50"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: easeInOut,
              }}
            />

            {/* حلقه نوری */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 rounded-full blur-2xl -z-20"
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          {/* عنوان با انیمیشن chevron */}
          <motion.p
            className="text-lg lg:text-xl text-primary flex items-center gap-2 cursor-pointer"
            whileHover="hover"
          >
            <motion.span variants={chevronVariants}>
              {locale === "en" ? (
                <ChevronRight className="transition-transform" />
              ) : (
                <ChevronLeft className="transition-transform" />
              )}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              {t("title")}
            </motion.span>
          </motion.p>
        </div>

        {/* بخش CTA */}
        <motion.div className="space-y-3" variants={ctaVariants}>
          <motion.p
            className="text-foreground/80 text-sm md:text-lg"
            whileHover={{
              color: "rgb(var(--foreground))",
              transition: { duration: 0.2 },
            }}
          >
            {locale === "en" ? "//" : "\\\\"} {t("cta.title")}
          </motion.p>

          <div
            dir="ltr"
            className="flex md:items-center flex-col md:flex-row gap-2 md:gap-4"
          >
            <motion.span
              className="text-primary"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <span className={`text-primary mr-2`}>const</span>
              <span className=" text-amber-500">githubLink</span>
              <span className=" text-popover-foreground mx-2">=</span>
            </motion.span>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                target="/blank"
                className="underline text-pretty  transition-colors duration-200 relative group"
                href={"https://github.com/rabbaniha"}
              >
                https://github.com/rabbaniha
                <motion.span
                  className={`absolute -bottom-1  w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ${
                    locale === "en" ? "left-0" : "right-0"
                  }`}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Snake Game با انیمیشن */}
      <motion.div
        className="  lg:w-1/2 "
        variants={snakeGameVariants}
        whileHover="hover"
      >
        <SnakeGame />
      </motion.div>
    </motion.div>
  );
}
