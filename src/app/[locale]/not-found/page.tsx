"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import { easeInOut, easeOut, motion, spring } from "framer-motion";
import { Button } from "@/components/ui/button";

const CustomNotFoundPage = () => {
  const t = useTranslations("notFound");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  // JavaScript code animation variants
  const codeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: easeOut,
      },
    }),
  };

  // Button hover animations
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Image animation
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        type: spring,
        stiffness: 100,
      },
    },
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${locale}`);
    }
  };

  const handleGoHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <div
      className="flex-1 flex items-center justify-center flex-col lg:flex-row  lg:items-start gap-8 px-4 py-8 
    max-h-[75vh] overflow-y-auto scrollbar-hide"
    >
      {/* Animated Image */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="relative lg:mt-10"
      >
        <Image
          src="/images/404.png"
          alt="not found"
          width={200}
          height={200}
          className="drop-shadow-lg"
        />
        {/* Floating particles animation */}
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full opacity-60"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-2 h-2 bg-red-500 rounded-full opacity-60"
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
      </motion.div>

      {/* Code Block */}
      <motion.div
        className="p-6  font-mono text-sm max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div variants={codeVariants} initial="hidden" animate="visible">
          <div>
            <span className=" text-amber-500 mr-2">function</span>
            <span className=" text-primary">findPage</span>
            <span className=" text-popover-foreground/60">{"("}</span>
            <span className=" text-primary">url</span>
            <span className=" text-popover-foreground/60">{")"}</span>
            <span className=" text-popover-foreground/60">{"{"}</span>
          </div>
          <div className=" ml-4">
            <span className=" text-emerald-600 mr-2">const</span>
            <span className=" text-primary">page</span>
            <span className=" text-popover-foreground/60 mx-2">=</span>
            <span className=" text-primary">routes</span>
            <span className=" text-popover-foreground/60">.</span>
            <span className=" text-destructive">find</span>
            <span className=" text-popover-foreground/60">{"("}</span>
            <span className=" text-primary">route</span>
            <span className=" text-popover-foreground/60 mx-2">{"=>"}</span>
            <span className=" text-popover-foreground/60">{"{"}</span>
          </div>
          <div className=" ml-12">
            <span className=" text-primary">route</span>
            <span className=" text-popover-foreground/60">.</span>
            <span className=" text-destructive">path</span>
            <span className=" text-popover-foreground/60 mx-2">{"==="}</span>
            <span className=" text-primary">url</span>
          </div>
          <div className=" text-popover-foreground/60">{"});"}</div>

          <div className=" ml-4">
            <span className=" text-amber-500">if</span>
            <span className=" text-popover-foreground/60">{"("}</span>
            <span className=" text-popover-foreground/60">!</span>
            <span className=" text-primary">page</span>
            <span className=" text-popover-foreground/60">{")"}</span>
            <span className=" text-popover-foreground/60">{"{"}</span>
          </div>
          <div className=" ml-8">
            <span className=" text-primary">console</span>
            <span className=" text-popover-foreground/60">.</span>
            <span className=" text-destructive">log</span>
            <span className=" text-popover-foreground/60">{"(`"}</span>
            <span className=" text-pretty">{t("description")}</span>
            <span className=" text-popover-foreground/60">{"`);"}</span>
          </div>
          <div className=" ml-8">
            <span className=" text-destructive mr-2">throw</span>
            <span className=" text-emerald-600 mr-2">new</span>
            <span className=" text-destructive">Error</span>
            <span className=" text-popover-foreground/60">{"('"}</span>
            <span className=" text-primary">404: </span>
            <span className=" text-pretty">{t("title")}</span>
            <span className=" text-popover-foreground/60">{"');"}</span>
          </div>
          <div className=" ml-4 text-popover-foreground/60">{"}"}</div>
          <div className=" ml-4">
            <span className=" text-amber-500 mr-2">return</span>
            <span className=" text-primary">page</span>
            <span className=" text-popover-foreground/60">;</span>
          </div>
          <div className=" text-popover-foreground/60">{"}"}</div>
          <div>
            <Button
              onClick={handleGoBack}
              variant={"ghost"}
              className=" hover:bg-transparent text-primary hover:text-primary/40 cursor-pointer"
            >
              <span>goBack</span>
              <span>{"()"}</span>
            </Button>
            <span className=" text-popover-foreground/60">{"||"}</span>
            <Button
              onClick={handleGoHome}
              variant={"ghost"}
              className=" hover:bg-transparent text-primary hover:text-primary/40 cursor-pointer"
            >
              <span>goHome</span>
              <span>{"()"}</span>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden  z-10">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-900 rounded-full opacity-15"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default CustomNotFoundPage;
