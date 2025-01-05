import { Metadata } from "next";

import RegisterForm from "@/app/users/register/_components/register-form";
import CardWrapper from "@/app/users/_components/card-wrapper";

export const metadata: Metadata = {
    title: `Нов потребител - ${process.env.SITE_NAME}`,
    description: `Нов потребител - ${process.env.SITE_NAME}`,
    keywords:
        "магазин за подъръци, подаръци, подаръци за жени, подаръци за мъже, подаръци за деца, подаръци за бебета, подаръци за бременни, подаръци за майки, подаръци за бащи, подаръци за братя, подаръци за сестри",
    category: "Shopping",
    openGraph: {
        title: `Нов потребител - ${process.env.SITE_NAME}`,
        description: `Нов потребител - ${process.env.SITE_NAME}`,
        type: "website",
        locale: "bg_BG",
        url: process.env.NEXT_PUBLIC_SITE_URL + "/",
        countryName: "Bulgaria",
        siteName: process.env.SITE_NAME,
        images: [
            {
                url: process.env.NEXT_PUBLIC_SITE_URL + "/logo.svg",
                width: 1200,
                height: 630,
                alt: `${process.env.SITE_NAME} | Магазин за подаръци`,
            },
        ],
    },
};

export default async function LoginPage() {
    return (
        <div className="container mx-auto">
            <CardWrapper title="Създаване на нов потребител">
                <RegisterForm />
            </CardWrapper>
        </div>
    );
}
