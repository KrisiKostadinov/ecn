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
import { updateMetaKeywords } from "@/app/dashboard/products/[id]/_actions";
import { Textarea } from "@/components/ui/textarea";
import { replaceNewlinesWithComma } from "@/lib/utils";

export const ProductMetaKeywordsSchema = zod.object({
  metaKeywords: zod
    .string({ message: "Мета ключови думи на продукта е задължително поле" })
    .max(1000, { message: "Мета ключови думи трябва да бъде до 1000 символа" }),
});

export type ProductMetaTitleFormValues = zod.infer<typeof ProductMetaKeywordsSchema>;

type UpdateMetaTitleFormProps = {
  id: string;
  metaKeywords: string | null;
};

export default function UpdateMetaKeywordsForm({
  id,
  metaKeywords,
}: UpdateMetaTitleFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductMetaTitleFormValues>({
    resolver: zodResolver(ProductMetaKeywordsSchema),
    defaultValues: {
      metaKeywords: metaKeywords || "",
    },
  });

  const onSubmit = async (values: ProductMetaTitleFormValues) => {
    const result = await updateMetaKeywords(id, values.metaKeywords);

    if (!result.success) {
      return toast.error("Нещо се обърка");
    }

    toast.success("Промените са запазени");
    router.refresh();
    setIsUpdate(!isUpdate);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Мета ключови думи на продукта</CardTitle>
        <CardDescription>{metaKeywords ? replaceNewlinesWithComma(metaKeywords) : "Няма"}</CardDescription>
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
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мета ключови думи на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 top-2 w-5 h-5" />
                        <Textarea
                          {...field}
                          className="pl-8"
                          disabled={form.formState.isSubmitting}
                          rows={10}
                          autoFocus
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardDescription className="space-y-2">
                <div>
                  Ключовите думи са специфични термини и фрази, които описват
                  съдържанието на страницата и помагат на търсачките да разбират
                  темата, като същевременно насочват правилната аудитория към
                  вашия сайт.
                </div>
                <div>
                  Напишете ключови думи, като поставите <strong>всяка на нов ред</strong>.
                </div>
              </CardDescription>

              <div className="flex gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <SaveIcon />
                  {form.formState.isSubmitting
                    ? "Зареждане..."
                    : "Запазване"}
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