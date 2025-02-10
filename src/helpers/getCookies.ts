"use server"

import { cookies } from "next/headers"

export const getAccessToken = async () => {
    const CookieStore = await cookies();
    const accessToken = CookieStore.get("accessToken");
    return accessToken;
}