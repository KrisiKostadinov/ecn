"use client";

import * as zod from "zod";
import { ClipboardPen, SaveIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { updateName } from "../_actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const ProductNameSchema = zod.object({
  name: zod
    .string({ message: "Името на продукта е задължително" })
    .min(1, { message: "Името на продукта е задължително" })
    .max(255, { message: "Името трябва да бъде до 255 символа" }),
});

export type ProductNameFormValues = zod.infer<typeof ProductNameSchema>;

type UpdateNameFormProps = {
  id: string;
  name: string;
};

export default function UpdateNameForm({ id, name }: UpdateNameFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductNameFormValues>({
    resolver: zodResolver(ProductNameSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (values: ProductNameFormValues) => {
    const result = await updateName(id, values.name);

    if (!result.success) {
      return toast.error(result.error || "Нещо се обърка");
    }

    toast.success("Промените са запазени");
    router.refresh();
    setIsUpdate(!isUpdate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Име на продукта</CardTitle>
        <CardDescription>{name ? name : "Няма"}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isUpdate ? (
          <Button variant={"outline"} onClick={() => setIsUpdate(!isUpdate)}>
            <SaveIcon />
            <span>Редактиране</span>
          </Button>
        ) : (
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
                    : "Запазване на името"}
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
