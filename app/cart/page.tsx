import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Количка - Подари усмивка",
  description: "Количка - Подари усмивка",
  keywords: "магазин за подъръци, подаръци, подаръци за жени, подаръци за мъже, подаръци за деца, подаръци за бебета, подаръци за бременни, подаръци за майки, подаръци за бащи, подаръци за братя, подаръци за сестри",
};

export default async function CartPage() {
    return (
        <div className="container mx-auto">
            <div>Cart</div>
        </div>
    );
}
