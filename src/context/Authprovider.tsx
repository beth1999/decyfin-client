import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AUTH_KEY } from "../service/api";
import { toast } from "react-toastify";

type UserType = {
    address: string;
    username: string;
    avatar: string;
    isAuth: boolean;
};

type ContextType = {
    user: UserType;
    setUser: (c: UserType) => void;
    updateAuth: (c: string) => void;
    removeAuth: () => void;
};

type TokenType = {
    id: string;
    address: string;
    username: string;
    avatar: string;
};

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>({
        address: "",
        username: "",
        avatar: "",
        isAuth: false,
    });

    const updateAuth = (token: string) => {
        const decoded_data: TokenType = jwtDecode(token);

        localStorage.setItem(AUTH_KEY, token);

        setUser({
            address: decoded_data.address,
            avatar: decoded_data.avatar,
            username: decoded_data.username,
            isAuth: true,
        });

        toast.success("successfully log in");
    };

    const removeAuth = () => {
        setUser({
            address: "",
            isAuth: false,
            avatar: "",
            username: "",
        });

        localStorage.removeItem(AUTH_KEY);
    };

    return <AuthContext.Provider value={{ user, setUser, updateAuth, removeAuth }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext) as ContextType;
};
