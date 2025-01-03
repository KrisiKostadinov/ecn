import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход - Подари усмивка",
  description: "Вход - Подари усмивка",
};

export default async function LoginPage() {
    return (
        <div className="container mx-auto">
            <div>Login</div>
        </div>
    );
}