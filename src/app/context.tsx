"use client";

import { UserType } from "@/constants";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";
import { putUser, putUserName } from "./fetch";

type UserPropertyType =
    | {
          property: "name";
          newData: string;
      }
    | {
          property: "completedStageIds";
          newData: number[];
      };

interface AuthContextType {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
    changeUserData: ({ property, newData }: UserPropertyType) => void;
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

    const changeUserData = ({ property, newData }: UserPropertyType) => {
        if (!user) return;
        if (property === "name") {
            const newUserData = { ...user, name: newData };
            putUserName({ id: user.id, name: newData });
            setUser(newUserData);
        } else {
            const newUserData = { ...user, [property]: newData };
            putUser(newUserData);
            setUser(newUserData);
        }
    };

    return <AuthContext.Provider value={{ user, login, logout, changeUserData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
