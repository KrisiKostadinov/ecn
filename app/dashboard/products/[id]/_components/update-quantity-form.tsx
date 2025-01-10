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
import { updateName, updateQuantity } from "@/app/dashboard/products/[id]/_actions";

export const ProductQuantitySchema = zod.object({
  quantity: zod
    .coerce
    .number({ message: "Количеството трябва да бъде положително число или 0" })
    .min(0, { message: "Количеството трябва да бъде положително число или 0" })
});

export type ProductQuantityFormValues = zod.infer<typeof ProductQuantitySchema>;

type UpdateQuantityFormProps = {
  id: string;
  quantity: number | null;
};

export default function UpdateQuantityForm({ id, quantity }: UpdateQuantityFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<ProductQuantityFormValues>({
    resolver: zodResolver(ProductQuantitySchema),
    defaultValues: {
      quantity: quantity || 0,
    },
  });

  const onSubmit = async (values: ProductQuantityFormValues) => {
    const result = await updateQuantity(id, values.quantity);

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
        <CardTitle>Количество на продукта</CardTitle>
        <CardDescription>{quantity ? quantity : "Няма"}</CardDescription>
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 w-5 h-5" />
                        <Input
                          type="number"
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
