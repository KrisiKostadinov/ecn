"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const _headers = await headers();

  await auth.api.signOut({
    headers: _headers,
  });

  redirect("/sign-in");
}
