"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  buttonText?: string;
  buttonLink?: string;
  children?: ReactNode;
};

export default function PageHeader({
  title,
  buttonText,
  buttonLink,
  children,
}: PageHeaderProps) {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="text-2xl font-semibold my-5 text-gray-600">
            {title}
          </div>
          {children}
        </div>
        {buttonLink && buttonText && (
          <Link href={buttonLink}>
            <Button className="hidden md:block">{buttonText}</Button>
          </Link>
        )}
      </div>
      {buttonLink && buttonText && (
        <div className="block md:hidden mb-5">
          <Link href={buttonLink}>
            <Button className="w-full">{buttonText}</Button>
          </Link>
        </div>
      )}
    </>
  );
}
