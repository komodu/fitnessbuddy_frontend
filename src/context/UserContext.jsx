import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) =>{
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const stored = localStorage.getItem("user");
        console.log("stored: ", stored)
        if (stored) setUser(JSON.parse(stored));
        setLoading(false);
    },[]);
    return (
        <UserContext.Provider value={{ user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    );
};