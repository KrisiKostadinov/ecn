"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipboardPen, LinkIcon, SaveIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ProductFormValues,
  ProductSchema,
} from "@/app/dashboard/products/create/_schema";
import { createSlug } from "@/lib/utils";

export default function CreateForm() {
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      quantity: 1,
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const response = await axios.post("/api/products/create", values);

      if (response.status === 201) {
        toast.success("Продуктът беше добавен успешно");
        router.push("/dashboard/products");
      }
    } catch (error: any) {
      if (error.status === 404) {
        return toast.error("Ресурсът не беше намерен");
      }
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      }
      toast.error("Нещо се обърка");
    }
  };

  const onUpdateName = () => {
    const newName = form.getValues("name");
    const newSlug = createSlug(newName);
    form.setValue("slug", newSlug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Име на продукта</FormLabel>
              <FormControl>
                <div className="relative flex items-center gap-2">
                  <ClipboardPen className="absolute left-2 w-5 h-5" />
                  <Input
                    type="text"
                    {...field}
                    className="pl-8"
                    disabled={form.formState.isSubmitting}
                    autoFocus
                    onBlur={onUpdateName}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL адрес на продукта</FormLabel>
              <FormControl>
                <div className="relative flex items-center gap-2">
                  <LinkIcon className="absolute left-2 w-5 h-5" />
                  <Input
                    type="text"
                    {...field}
                    className="pl-8"
                    disabled={form.formState.isSubmitting}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {Object.keys(form.formState.errors).map((key) => (
          <p key={key} className="text-red-500">
            {(form.formState.errors as any)[key]?.message}
          </p>
        ))}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          <SaveIcon />
          {form.formState.isSubmitting ? "Добавяне..." : "Добавяне на продукта"}
        </Button>
      </form>
    </Form>
  );
}
