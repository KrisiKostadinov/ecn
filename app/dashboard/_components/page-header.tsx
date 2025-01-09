"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
};

export default function PageHeader({
  title,
  buttonText,
  buttonLink,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="text-2xl font-semibold my-5 mx-6 text-gray-600">
        {title}
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