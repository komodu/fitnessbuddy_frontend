import { useState, useEffect } from "react";
export const useDataUser = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchUserTemplates = async () => {
      try {
        const response = await fetch("/api/workoutplan/");
        if (!response.ok) throw new Error("Error fetching Templates of User");
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.log("Error Caught in fetching Templates: ", error);
      }
    };
    fetchUserTemplates();
  }, []);

  console.log("from customHook Templates : ", templates);
  return { templates };
};
