// Import
import { createContext, useContext, useState } from 'react';

// Create Context
const ActiveLinkContext = createContext();

//Create a function for the Provider
export const ActiveLinkProvider = ({ children }) => {
    const [active, setActive] = useState("home")
    return (
        <ActiveLinkContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveLinkContext.Provider>
    )
}

//Export
export const useActiveLink = () => useContext(ActiveLinkContext)
