"use client";

import { UserType } from "@/constants";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);

    const login = (userData: UserType) => {
        // localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        router.push("/");
        router.refresh();
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/auth/login");
        router.refresh();
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
