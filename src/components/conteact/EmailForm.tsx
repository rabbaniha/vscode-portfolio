"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { useFormStore } from "@/stores/formStore";

const EmailForm = () => {
  const t = useTranslations("contact.form");
  const p = useTranslations("contact");

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { updateFormData, resetFormData } = useFormStore();

  const formSchema = z.object({
    name: z.string().min(2, { message: t("name.errorMsg") }),
    email: z.string().email({ message: t("email.errorMsg") }),
    subject: z
      .string()
      .min(1, { message: t("subject.errorMsg") || "Subject is required" }),
    message: z.string().min(10, {
      message:
        t("message.errorMsg") || "Message must be at least 10 characters",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Watch form values and update store
  const watchedValues = form.watch();

  useEffect(() => {
    updateFormData("name", watchedValues.name || "");
    updateFormData("email", watchedValues.email || "");
    updateFormData("subject", watchedValues.subject || "");
    updateFormData("message", watchedValues.message || "");
  }, [
    watchedValues.name,
    watchedValues.email,
    watchedValues.subject,
    watchedValues.message,
    updateFormData,
  ]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        resetFormData();
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || t("error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(t("error"));
    }
  };

  return (
    <div className="lg:col-span-4 border-e p-4 lg:overflow-y-auto lg:max-h-[77vh] scrollbar-hide">
      <h2 className=" font-semibold text-md w-[90%] mx-auto mb-8">
        {p("description")}
      </h2>
      {submitStatus === "success" ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0.5, scale: 0.5, y: -10, x: 10 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className=" w-full h-full flex flex-col gap-6 items-center justify-center"
          >
            <h2 className=" font-bold text-4xl text-foreground">
              {t("success.title")}
            </h2>
            <div>
              {t("success.message")
                .split(".")
                .map((s, i) => (
                  <p
                    className=" font-semibold sm:text-xl text-lg text-card-foreground/70 mb-2"
                    key={i}
                  >
                    {s}
                  </p>
                ))}
            </div>
            <Button onClick={() => setSubmitStatus("idle")} variant={"default"}>
              {t("success.action")}
            </Button>
          </motion.div>
        </AnimatePresence>
      ) : (
        <Form {...form}>
          <motion.form
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-[90%] mx-auto p-4 bg-destructive border border-border rounded-md flex items-center gap-2 text-foreground"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel>{t("name.label") || "نام"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={submitStatus === "loading"}
                      className="h-12 py-1 rounded-sm border-2 bg-card text-card-foreground transition-all duration-200 focus:border-primary"
                      placeholder={
                        t("name.placeholder") || "نام خود را وارد کنید"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel>{t("email.label") || "ایمیل"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={submitStatus === "loading"}
                      className="h-12 py-1 rounded-sm border-2 bg-card text-card-foreground transition-all duration-200 focus:border-primary"
                      placeholder={
                        t("email.placeholder") || "example@email.com"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel>{t("subject.label") || "موضوع"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={submitStatus === "loading"}
                      className="h-12 py-1 rounded-sm border-2 bg-card text-card-foreground transition-all duration-200 focus:border-primary"
                      placeholder={t("subject.placeholder") || "موضوع پیام"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel>{t("message.label") || "پیام"}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={submitStatus === "loading"}
                      className="h-32 py-3 rounded-sm border-2 bg-card text-card-foreground resize-none transition-all duration-200 focus:border-primary"
                      placeholder={
                        t("message.placeholder") ||
                        "پیام خود را اینجا بنویسید..."
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="w-[90%] mx-auto flex items-start justify-start pt-2">
              <Button
                type="submit"
                className="cursor-pointer min-w-[120px] transition-all duration-200 hover:scale-105"
                variant="default"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitStatus === "loading" ? t("sending") : t("submit")}
              </Button>
            </FormItem>
          </motion.form>
        </Form>
      )}
    </div>
  );
};

export default EmailForm;
