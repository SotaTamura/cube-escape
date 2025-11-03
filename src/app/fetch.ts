import { LoginType, UserType } from "@/constants";

export const postLogin = async (loginData: LoginType) =>
    await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    });

export const getUser = async (userId: number): Promise<UserType | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userId}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.user || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
export const postUser = async (signupData: LoginType) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
    });
export const putUser = async (newUserData: UserType) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${newUserData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
    });
