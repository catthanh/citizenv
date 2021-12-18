import { createContext, useReducer } from "react";
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [auth, dispacth] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const loginUser = async userForm => {
        try {
            const response = await 
        }
    }
};
