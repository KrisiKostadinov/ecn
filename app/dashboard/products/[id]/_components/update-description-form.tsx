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
import { updateDescription } from "@/app/dashboard/products/[id]/_actions";
import { Textarea } from "@/components/ui/textarea";

export const ProductDescriptionSchema = zod.object({
  description: zod.string().nullable(),
});

export type ProductDescriptionFormValues = zod.infer<
  typeof ProductDescriptionSchema
>;

type UpdateDescriptionFormProps = {
  id: string;
  description: string | null;
};

export default function UpdateDescriptionForm({
  id,
  description,
}: UpdateDescriptionFormProps) {
  const formattedDescription = description
    ? description.replace(/\n/g, "<br>")
    : "Няма";
  
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductDescriptionFormValues>({
    resolver: zodResolver(ProductDescriptionSchema),
    defaultValues: {
      description: description || "",
    },
  });

  const onSubmit = async (values: ProductDescriptionFormValues) => {
    const result = await updateDescription(id, values.description);

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
        <CardTitle>Описание на продукта</CardTitle>
        <CardDescription>
          <div dangerouslySetInnerHTML={{
          __html: formattedDescription ? formattedDescription : "Няма",
        }} />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мета описание на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 top-2 w-5 h-5" />
                        <Textarea
                          {...field}
                          value={field.value || ""}
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