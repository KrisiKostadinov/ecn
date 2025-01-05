import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Имейл адресът и паролата са задължителни" }, { status: 400 });
        }

    } catch (error) {
        console.log("[USERS/LOGIN]:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}
