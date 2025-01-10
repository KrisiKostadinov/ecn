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
import { updateMetaTitle } from "@/app/dashboard/products/[id]/_actions";
import { Textarea } from "@/components/ui/textarea";

export const ProductMetaTitleSchema = zod.object({
  metaTitle: zod
    .string({ message: "Мета заглавие на продукта е задължително" })
    .max(70, { message: "Мета заглавието трябва да бъде до 70 символа" }),
});

export type ProductMetaTitleFormValues = zod.infer<typeof ProductMetaTitleSchema>;

type UpdateMetaTitleFormProps = {
  id: string;
  metaTitle: string | null;
};

export default function UpdateMetaTitleForm({
  id,
  metaTitle,
}: UpdateMetaTitleFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductMetaTitleFormValues>({
    resolver: zodResolver(ProductMetaTitleSchema),
    defaultValues: {
      metaTitle: metaTitle || "",
    },
  });

  const onSubmit = async (values: ProductMetaTitleFormValues) => {
    const result = await updateMetaTitle(id, values.metaTitle);

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
        <CardTitle>Мета заглавие на продукта</CardTitle>
        <CardDescription>{metaTitle ? metaTitle : "Няма"}</CardDescription>
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
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мета заглавие на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 top-2 w-5 h-5" />
                        <Textarea
                          {...field}
                          className="pl-8"
                          disabled={form.formState.isSubmitting}
                          rows={5}
                          autoFocus
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardDescription>
                Мета заглавието е текстът, който се показва като основен линк в
                резултатите от търсенето на търсачки като Google, привличайки
                вниманието на потребителите и резюмирайки съдържанието на
                страницата.
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