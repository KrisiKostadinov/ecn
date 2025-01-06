"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function PageHeader({
  title,
  buttonText,
  buttonLink,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
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