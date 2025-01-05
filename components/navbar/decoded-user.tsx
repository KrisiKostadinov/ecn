"use client";

import { useEffect } from "react";

import useUserStore from "@/app/users/_stores/user";
import { User } from "@prisma/client";

type DecodedUserProps = {
    userId: string;
    role: string;
    user: User | null;
};

export default function DecodedUser({ userId, role, user }: DecodedUserProps) {
    const { setUser } = useUserStore();

    useEffect(() => {
        if (!user) return;
        setUser(user);
    }, []);

    return null;
}
