import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bg">
            <body>
                <TooltipProvider>
                    <Navbar />
                    {children}
                </TooltipProvider>
                <Toaster />
            </body>
        </html>
    );
}
