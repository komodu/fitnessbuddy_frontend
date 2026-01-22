// Import
import { useState } from "react";
import { ActiveLinkContext } from "../Context";

//Create a function for the Provider
export const ActiveLinkProvider = ({ children }) => {
  const [active, setActive] = useState("home");
  return (
    <ActiveLinkContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};
