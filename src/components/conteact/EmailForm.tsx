"use client";
import React from "react";
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
  FormDescription,
} from "../ui/form";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string,
});

const EmailForm = () => {
  const t = useTranslations("contact.form");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = () => {};
  return (
    <div className=" col-span-4 border-e p-8">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" w-[90%] mx-auto ">
                <FormLabel>{t("name.label")}</FormLabel>
                <FormControl>
                  <Input className=" h-12 py-1 rounded-sm border-2 bg-card text-card-foreground"/>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </div>
  );
};

export default EmailForm;
