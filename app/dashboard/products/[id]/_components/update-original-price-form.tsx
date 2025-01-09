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
import { updateOriginalPrice } from "@/app/dashboard/products/[id]/_actions";
import { formatPrice } from "@/lib/utils";

export const ProductOriginalPriceSchema = zod.object({
  originalPrice: zod
    .coerce
    .number({ message: "Цената на продукта е задължителна" })
    .min(1, { message: "Цената на продукта е задължителнa" })
});

export type ProductOriginalPriceFormValues = zod.infer<typeof ProductOriginalPriceSchema>;

type UpdateOriginalPriceFormProps = {
  id: string;
  originalPrice: number | null;
};

export default function UpdateSlugForm({ id, originalPrice }: UpdateOriginalPriceFormProps) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm<UpdateOriginalPriceFormProps>({
    resolver: zodResolver(ProductOriginalPriceSchema),
    defaultValues: {
      originalPrice,
    },
  });

  const onSubmit = async (values: UpdateOriginalPriceFormProps) => {
    console.log(values.originalPrice);
    
    if (!values.originalPrice) {
      return form.setError("originalPrice", { message: "Цената на продукта е задължителна" });
    }

    const result = await updateOriginalPrice(id, values.originalPrice);

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
        <CardTitle>Цена на продукта</CardTitle>
        <CardDescription>{originalPrice ? formatPrice(originalPrice) : "Няма"}</CardDescription>
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
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена на продукта</FormLabel>
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
                    : "Запазване на цената"}
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
