import { UserDataContext, AuthContext, ExercisesContext } from "../Context";
import { useState, useEffect, useContext } from "react";

const UserDataProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { exercises } = useContext(ExercisesContext);

  const [userPlan, setUserPlan] = useState(null);
  const [todayExercises, setTodayExercises] = useState([]);
  const [currentLoading, setCurrentLoading] = useState(true);

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
    const timer = setTimeout(() => {
      stopCurrentLoading();
    }, 2000);
    fetchExerciseForDay();
    return () => clearTimeout(timer);
  }, [userPlan, exercises]);
  if (!isAuthenticated) return null;
  console.log("userPlan: ", userPlan);
  // console.log("userPlan workout Type: ", userPlan?.workoutType);
  console.log("exercise: ", todayExercises);
  return (
    <UserDataContext.Provider
      value={{
        userPlan,
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
