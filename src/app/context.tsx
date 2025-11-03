"use client";

import { UserType } from "@/constants";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";
import { putUser } from "./fetch";

interface AuthContextType {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
    addCompletedStage: (stageId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    const login = (userData: UserType) => {
        setUser(userData);
        router.push("/");
        router.refresh();
    };

    const logout = () => {
        setUser(null);
        router.push("/auth/login");
        router.refresh();
    };

    const addCompletedStage = async (stageId: number) => {
        if (!user) return;
        const newUserData = { ...user, completedStageIds: [...user.completedStageIds, stageId] };
        putUser(newUserData);
        setUser(newUserData);
    };

    return <AuthContext.Provider value={{ user, login, logout, addCompletedStage }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
