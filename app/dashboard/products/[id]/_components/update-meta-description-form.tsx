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
import { updateMetaDescription } from "@/app/dashboard/products/[id]/_actions";
import { Textarea } from "@/components/ui/textarea";

export const ProductMetaDescriptionSchema = zod.object({
  metaDescription: zod
    .string({ message: "Мета описанието на продукта е задължително" })
    .max(170, { message: "Мета описанието трябва да бъде до 170 символа" }),
});

export type ProductMetaDescriptionFormValues = zod.infer<
  typeof ProductMetaDescriptionSchema
>;

type UpdateMetaDescriptionFormProps = {
  id: string;
  metaDescription: string | null;
};

export default function UpdateMetaDescriptionForm({
  id,
  metaDescription,
}: UpdateMetaDescriptionFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductMetaDescriptionFormValues>({
    resolver: zodResolver(ProductMetaDescriptionSchema),
    defaultValues: {
      metaDescription: metaDescription || "",
    },
  });

  const onSubmit = async (values: ProductMetaDescriptionFormValues) => {
    const result = await updateMetaDescription(id, values.metaDescription);

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
        <CardTitle>Мета описание на продукта</CardTitle>
        <CardDescription>
          {metaDescription ? metaDescription : "Няма"}
        </CardDescription>
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
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мета описание на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 top-2 w-5 h-5" />
                        <Textarea
                          {...field}
                          className="pl-8"
                          disabled={form.formState.isSubmitting}
                          rows={7}
                          autoFocus
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardDescription>
                Мета описанието е кратък текст, който се показва под заглавието
                в резултатите от търсенето. То предоставя обобщение на
                съдържанието на страницата, насърчавайки потребителите да
                кликнат върху линка.
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
