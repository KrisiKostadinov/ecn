"use client";

import * as zod from "zod";
import { ClipboardPen, PenIcon, SaveIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateSlug } from "@/app/dashboard/products/[id]/_actions";

export const ProductSlugSchema = zod.object({
  slug: zod
    .string({ message: "URL адресът на продукта е задължително" })
    .min(1, { message: "URL адресът на продукта е задължително" })
    .max(255, { message: "URL адресът трябва да бъде до 255 символа" }),
});

export type ProductSlugFormValues = zod.infer<typeof ProductSlugSchema>;

type UpdateSlugFormProps = {
  id: string;
  slug: string;
};

export default function UpdateSlugForm({ id, slug }: UpdateSlugFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductSlugFormValues>({
    resolver: zodResolver(ProductSlugSchema),
    defaultValues: {
      slug,
    },
  });

  const onSubmit = async (values: ProductSlugFormValues) => {
    const result = await updateSlug(id, values.slug);

    if (!result.success) {
      return toast.error(result.error || "Нещо се обърка");
    }

    toast.success("Промените са запазени");
    router.refresh();
    setIsUpdate(!isUpdate);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>URL адрес на продукта</CardTitle>
        <CardDescription>{slug ? slug : "Няма"}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isUpdate ? (
          <Button variant={"outline"} onClick={() => setIsUpdate(!isUpdate)}>
            <PenIcon />
            <span>Редактиране</span>
          </Button>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL адрес на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 w-5 h-5" />
                        <Input
                          type="text"
                          {...field}
                          className="pl-8"
                          disabled={form.formState.isSubmitting}
                          autoFocus
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <SaveIcon />
                  {form.formState.isSubmitting
                    ? "Запазване..."
                    : "Запазване на URL адресът"}
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => setIsUpdate(!isUpdate)}
                >
                  Отказ
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
