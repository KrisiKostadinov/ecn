"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardWrapperProps = {
    title: string;
    children: React.ReactNode;
}

export default function CardWrapper({ title, children }: CardWrapperProps) {
    return (
        <Card className="max-w-md mx-auto my-10">
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
