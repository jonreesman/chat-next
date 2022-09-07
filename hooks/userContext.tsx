import React, { createContext } from "react";
import { User } from "../types/user";

interface UserContext {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const userContext = createContext<UserContext | null>(null);
