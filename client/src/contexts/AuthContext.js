import React, { createContext, useEffect, useMemo, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [addressCode, setAddressCode] = useState(null);
    const [name, setName] = useState(null);
    const [child, setChild] = useState([]);
    useMemo(() => {
        if (localStorage.getItem("jwt")) {
            setAddressCode(localStorage.getItem("address_code"));
            setRole(localStorage.getItem("role"));
            setUsername(localStorage.getItem("username"));
            setName(localStorage.getItem("name"));
            setChild(JSON.parse(localStorage.getItem("child")));
        }
    }, []);
    const login = async (username, password) => {
        console.log("logging");
        // sleep(2000).then(setLoggedIn(true));
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const content = await response.json();
        console.log(content);
        if (content.status === "error") {
            return content;
        } else {
            setUsername(content.username);
            setRole(content.role);
            setAddressCode(content.address_code);
            setName(content.name);
            setChild(content.child);
            localStorage.setItem("jwt", content.token);
            localStorage.setItem("address_code", content.address_code);
            localStorage.setItem("username", content.username);
            localStorage.setItem("role", content.role);
            localStorage.setItem("name", content.name);
            localStorage.setItem("child", JSON.stringify(content.child));
            return content;
        }
    };
    const logout = () => {
        localStorage.clear();
        setAddressCode(null);
        setRole(null);
        setUsername(null);
    };
    const createArea = async (data) => {
        const response = await fetch("/api/createarea", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return response.json();
    };
    const openDeclaration = async (data) => {
        const response = await fetch("/api/opendeclaration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return response.json();
    };
    const authContextValue = {
        openDeclaration,
        createArea,
        login,
        logout,
        username,
        role,
        addressCode,
        name,
        child,
    };
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => React.useContext(AuthContext);

const RequireAuth = ({ children }) => {
    let auth = useAuth();
    let location = useLocation();
    console.log(auth.username);

    if (!auth.username) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/dangnhap" state={{ from: location }} />;
    }
    return children;
};

export { AuthProvider, useAuth, RequireAuth };
