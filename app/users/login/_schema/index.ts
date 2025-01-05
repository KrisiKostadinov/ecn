"use client";

import * as zod from "zod";

export const LoginSchema = zod.object({
    email: zod.string().email({ message: "Невалиден имейл адрес" }),
    password: zod
        .string()
        .min(6, { message: "Паролата трябва да съдържа минимум 6 синвола" }),
    rememberMe: zod.boolean({ message: "Това поле трябва да бъде 'bool' тип" }),
});

export type LoginFormValues = zod.infer<typeof LoginSchema>;
