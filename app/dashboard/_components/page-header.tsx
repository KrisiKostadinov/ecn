"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  children: ReactNode;
};

export default function PageHeader({
  title,
  buttonText,
  buttonLink,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold my-5 mx-6 text-gray-600">
          {title}
        </div>
        {children}
      </div>
      {buttonText && buttonLink && (
        <Link href={buttonLink}>
          <Button>
            <PlusIcon />
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}
