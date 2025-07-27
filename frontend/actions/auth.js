"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token) {
  cookies().set({
    name: process.env.NEXT_PUBLIC_AUTH_KEY,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return { success: true };
}

export async function logout() {
  cookies().delete(process.env.NEXT_PUBLIC_AUTH_KEY);

  return { success: true };
}
