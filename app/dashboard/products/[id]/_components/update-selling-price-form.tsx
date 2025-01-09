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
import { updateSellingPrice } from "@/app/dashboard/products/[id]/_actions";
import { formatPrice } from "@/lib/utils";

export const ProductSellingPriceSchema = zod.object({
  sellingPrice: zod
    .coerce
    .number({ message: "Промоцията на продукта е задължителна" })
    .min(1, { message: "Промоцията на продукта е задължителнa" })
});

export type ProductSellingPriceFormValues = zod.infer<typeof ProductSellingPriceSchema>;

type UpdateSellingPriceFormProps = {
  id: string;
  sellingPrice: number | null;
  originalPrice: number | null;
};

export default function UpdateSellingPriceForm({ id, sellingPrice, originalPrice }: UpdateSellingPriceFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<UpdateSellingPriceFormProps>({
    resolver: zodResolver(ProductSellingPriceSchema),
    defaultValues: {
      sellingPrice,
    },
  });

  const onSubmit = async (values: UpdateSellingPriceFormProps) => {
    if (!values.sellingPrice) {
      return form.setError("sellingPrice", { message: "Промоцията на продукта е задължителна" });
    }

    if (originalPrice && values.sellingPrice >= originalPrice) {
      return form.setError("sellingPrice", { message: "Промоционалната цена не може да бъде по-висока или равна на основната цена" });
    }

    const result = await updateSellingPrice(id, values.sellingPrice);

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
        <CardTitle>Промоция на продукта</CardTitle>
        <CardDescription>{sellingPrice ? formatPrice(sellingPrice) : "Няма"}</CardDescription>
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
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Промоция на продукта</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center gap-2">
                        <ClipboardPen className="absolute left-2 w-5 h-5" />
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          className="pl-8"
                          disabled={form.formState.isSubmitting}
                          step={0.01}
                          formNoValidate
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
                    : "Запазване на промоцията"}
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
