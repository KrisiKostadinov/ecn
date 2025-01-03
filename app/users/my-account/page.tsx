import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Моят Акаунт - Подари усмивка",
  description: "Моят Акаунт - Подари усмивка",
  keywords: "магазин за подъръци, подаръци, подаръци за жени, подаръци за мъже, подаръци за деца, подаръци за бебета, подаръци за бременни, подаръци за майки, подаръци за бащи, подаръци за братя, подаръци за сестри",
  robots: "noindex, nofollow",
};

export default async function MyAccountPage() {
    return (
        <div className="container mx-auto">
            <div>My Account</div>
        </div>
    );
}
