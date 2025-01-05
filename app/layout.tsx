import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { getSession } from "@/lib/session";
import { prisma } from "@/db/prisma";
import DecodedUser from "@/components/navbar/decoded-user";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const decodedUser = await getSession("auth");
    const user = await prisma.user.findUnique({
        where: { id: decodedUser?.userId || "" },
    });

    return (
        <html lang="bg">
            <body>
                <DecodedUser
                    userId={decodedUser?.userId}
                    role={decodedUser?.role}
                    user={user}
                />
                <TooltipProvider>
                    <Navbar />
                    {children}
                </TooltipProvider>
                <Toaster position="top-center" />
            </body>
        </html>
    );
}