import { CreateStageType, LoginType, StageType, UserType } from "@/constants";

export const throwError = (err: unknown) => {
    window.alert("エラーが発生しました：" + err);
    console.error(err);
};

export const getAllStages = async (): Promise<StageType[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.stages || [];
    } catch (err) {
        throwError(err);
        return [];
    }
};
export const getStagesByUser = async (userId: number): Promise<StageType[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/user/${userId}`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.stages || [];
    } catch (err) {
        throwError(err);
        return [];
    }
};
export const getStage = async (stageId: number): Promise<StageType | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${stageId}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.stage || null;
    } catch (err) {
        throwError(err);
        return null;
    }
};
export const postStage = async (stageData: CreateStageType) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stageData),
    });
export const putStage = async (newStageData: StageType) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${newStageData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStageData),
    });
export const deleteStage = async (stageId: number) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stage/${stageId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

export const getUser = async (userId: number): Promise<UserType | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userId}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.user || null;
    } catch (err) {
        throwError(err);
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
export const putUserName = async (newUserNameData: { id: number; name: string }) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${newUserNameData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUserNameData.name }),
    });
export const putUserPassword = async (newPasswordData: { id: number; password: string }) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${newPasswordData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPasswordData),
    });
export const deleteUser = async (userId: number) =>
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

export const postLogin = async (loginData: LoginType) =>
    await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    });
