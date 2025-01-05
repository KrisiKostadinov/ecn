"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";

import { LoginSchema, LoginFormValues } from "@/app/users/login/_schema";
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

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "", rememberMe: false },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const response = await axios.post("/api/users/login", values);
            if (response.status === 200) {
                toast.success("Login successful");
                router.push("/");
            }
        } catch (error: any) {
            if (error.status === 404) {
                return toast.error("Not found");
            }
            if (error.response.data.message) {
                return toast.error(error.response.data.message);
            }
            toast.error("An error occurred");
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

                <div>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Влизане..." : "Вход"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}