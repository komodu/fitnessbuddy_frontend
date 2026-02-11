import { UserDataContext, AuthContext, ExercisesContext } from "../Context";
import { useState, useEffect, useContext } from "react";

const UserDataProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { exercises } = useContext(ExercisesContext);

  const [allPlan, setAllPlan] = useState([]);
  const [todayExercises, setTodayExercises] = useState([]);
  const [currentLoading, setCurrentLoading] = useState(true);

  const startCurrentLoading = () => setCurrentLoading(true);
  const stopCurrentLoading = () => setCurrentLoading(false);

  useEffect(() => {
    const fetchAllPlan = async () => {
      try {
        const response = await fetch("/api/workoutplan/get-plans");
        if (!response.ok)
          throw new Error("Error in Fetching UserPlanWorkout Through Context");
        const result = await response.json();

        setAllPlan(Array.isArray(result) ? result : Object.values(result));
      } catch (error) {
        console.log("ERROR in Fetching: ", error);
      } finally {
        setCurrentLoading(false);
      }
    };

    fetchAllPlan();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchExerciseForDay = async () => {
      if (!allPlan.length) return [];

      const muscleGroup = allPlan.workoutType;
      const filteredExercise = exercises.filter(
        (exercise) => exercise.workoutType.name === muscleGroup,
      );
      setTodayExercises(filteredExercise);
    };
    const timer = setTimeout(() => {
      stopCurrentLoading();
    }, 2000);
    fetchExerciseForDay();
    return () => clearTimeout(timer);
  }, [allPlan, exercises]);

  console.log("Provider Plan: ", allPlan);
  if (!isAuthenticated) return null;
  // console.log("userPlan workout Type: ", userPlan?.workoutType);
  console.log("exercise: ", todayExercises);
  return (
    <UserDataContext.Provider
      value={{
        allPlan,
        todayExercises,
        currentLoading,
        startCurrentLoading, //! Unused
        stopCurrentLoading, //! Unused
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
