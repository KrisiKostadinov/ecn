import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подари усмивка | Магазин за подаръци",
  keywords: "магазин за подъръци, подаръци, подаръци за жени, подаръци за мъже, подаръци за деца, подаръци за бебета, подаръци за бременни, подаръци за майки, подаръци за бащи, подаръци за братя, подаръци за сестри",
  description: "Подари усмивка е магазин за подаръци, който предлага разнообразие от подаръци за всеки повод.",
  category : "Shopping",
  openGraph: {
    title: "Подари усмивка | Магазин за подаръци",
    description: "Подари усмивка е магазин за подаръци, който предлага разнообразие от подаръци за всеки повод.",
    type: "website",
    locale: "bg_BG",
    url: process.env.NEXT_PUBLIC_SITE_URL + "/",
    countryName: "Bulgaria",
    siteName: "Подари усмивка",
    images: [
      {
        url: process.env.NEXT_PUBLIC_SITE_URL + "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Подари усмивка | Магазин за подаръци",
      },
    ],
  }
};

export default function Home() {
  return <div className="container mx-auto">Home!</div>;
}
