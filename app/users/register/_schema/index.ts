"use client";

import { Gender } from "@prisma/client";
import * as zod from "zod";

export const RegisterSchema = zod.object({
    email: zod.string().email({ message: "Невалиден имейл адрес" }),
    password: zod
        .string()
        .min(6, { message: "Паролата трябва да съдържа минимум 6 синвола" }),
    gender: zod.enum(['MALE', 'FEMALE', 'NOT_AVAILABLE'] as const, { message: "Невалиден пол" }),
});

export type RegisterFormValues = zod.infer<typeof RegisterSchema>;

interface GenderOption {
    value: Gender;
    label: string;
}

interface GenderOption {
    value: Gender;
    label: string;
}

export const genders: GenderOption[] = [
    { value: 'MALE', label: 'Мъж' },
    { value: 'FEMALE', label: 'Жена' },
    { value: 'NOT_AVAILABLE', label: 'Предпочитам да не казвам' },
];