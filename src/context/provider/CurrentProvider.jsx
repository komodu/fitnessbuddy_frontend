import { CurrentContext } from "../Context";
import { useState, useEffect } from "react";

const CurrentProvider = ({ children }) => {
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await fetch("/api/workoutplan/userplan");
        if (!response.ok)
          throw new Error("Error in Fetching UserPlanWorkout Through Context");
        const result = await response.json();

        setUserPlan(result);
      } catch (error) {
        console.log("ERROR in Fetching: ", error);
      }
    };
    fetchUserPlan();
  }, []);

  return (
    <CurrentContext.Provider value={{ userPlan }}>
      {children}
    </CurrentContext.Provider>
  );
};

export default CurrentProvider;
