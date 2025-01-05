"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardWrapperProps = {
    children: React.ReactNode;
}

export default function CardWrapper({ children }: CardWrapperProps) {
    return (
        <Card className="max-w-md mx-auto my-10">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}