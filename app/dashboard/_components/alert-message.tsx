"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideIcon } from "lucide-react";

type AlertMessageProps = {
  title?: string;
  message: string;
  variant?: "default" | "destructive";
  icon?: LucideIcon;
};

export default function AlertMessage({
  title,
  message,
  variant = "default",
  icon: Icon,
}: AlertMessageProps) {
  return (
    <Alert variant={variant}>
      {Icon && <Icon className="h-4 w-4" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="text-muted-foreground">{message}</AlertDescription>
    </Alert>
  );
}