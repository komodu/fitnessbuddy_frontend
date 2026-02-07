import { CurrentContext, AuthContext, ExercisesContext } from "../Context";
import { useState, useEffect, useContext } from "react";

const CurrentProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { exercises } = useContext(ExercisesContext);

  const [userPlan, setUserPlan] = useState(null);
  const [todayExercises, setTodayExercises] = useState([]);
  const [currentLoading, setCurrentLoading] = useState(false);

  const startCurrentLoading = () => setCurrentLoading(true);
  const stopCurrentLoading = () => setCurrentLoading(false);

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
      } finally {
        setCurrentLoading(false);
      }
    };

    fetchUserPlan();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchExerciseForDay = async () => {
      if (!userPlan) return [];

      const muscleGroup = userPlan.workoutType;
      const filteredExercise = exercises.filter(
        (exercise) => exercise.workoutType.name === muscleGroup,
      );
      setTodayExercises(filteredExercise);
    };
    fetchExerciseForDay();
  }, [userPlan, exercises]);
  if (!isAuthenticated) return null;
  console.log("userPlan: ", userPlan);
  // console.log("userPlan workout Type: ", userPlan?.workoutType);
  console.log("exercise: ", todayExercises);
  return (
    <CurrentContext.Provider
      value={{
        userPlan,
        todayExercises,
        currentLoading,
        startCurrentLoading, //! Unused
        stopCurrentLoading, //! Unused
      }}
    >
      {children}
    </CurrentContext.Provider>
  );
};

export default CurrentProvider;
