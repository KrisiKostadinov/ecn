import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <Navbar />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}