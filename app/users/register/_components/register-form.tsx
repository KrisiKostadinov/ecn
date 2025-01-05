"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
    RegisterSchema,
    RegisterFormValues,
    genders,
} from "@/app/users/register/_schema";
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
import { EyeIcon, EyeOffIcon, KeyIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { email: "", password: "", gender: "NOT_AVAILABLE" },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            const response = await axios.post("/api/users/register", values);
            if (response.status === 201) {
                toast.success("Регистрацията беше успешна!", { duration: 3000 });
                router.push("/users/login");
            }
        } catch (error: any) {
            if (error.status === 404) {
                return toast.error("Ресурсът не е намерен");
            }
            if (error.response.data.message) {
                return toast.error(error.response.data.message);
            }
            toast.error("Възникна грешка");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имейл Адрес</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center gap-2">
                                    <MailIcon className="absolute left-2 w-5 h-5" />
                                    <Input
                                        type="email"
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

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Парола</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center gap-2">
                                    <KeyIcon className="absolute left-2 w-5 h-5" />
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...field}
                                        className="pl-8"
                                        disabled={form.formState.isSubmitting}
                                    />
                                    {showPassword ? (
                                        <EyeOffIcon
                                            className="absolute right-2 cursor-pointer w-5 h-5"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : (
                                        <EyeIcon
                                            className="absolute right-2 cursor-pointer w-5 h-5"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Изберете Пол</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Изберете..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genders.map((gender) => (
                                            <SelectItem
                                                key={gender.value}
                                                value={gender.value}
                                            >
                                                {gender.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-5">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting
                            ? "Създаване..."
                            : "Създаване на нов потребител"}
                    </Button>

                    <div>
                        <span>Вече имате създаден акаунт?</span>
                        <Button asChild variant={"link"}>
                            <Link href={"/users/login"}>Натиснете тук!</Link>
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
