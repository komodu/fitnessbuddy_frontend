import { UserDataContext, AuthContext, ExercisesContext } from "../Context";
import { useState, useEffect, useContext } from "react";
import { useDataUser } from "../../hooks/useDataUser";
const UserDataProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { exercises } = useContext(ExercisesContext);

  const { templates } = useDataUser();

  const [allPlan, setAllPlan] = useState([]);

  const [activePlan, setActivePlan] = useState([]);
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
  }, []);

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const response = await fetch("/api/workoutplan/userplan");
        if (!response.ok) {
          setActivePlan([]);
        }
        const data = await response.json();
        console.log("Active Plan has been set. ");
        setActivePlan(data.activePlan);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchActivePlan();
  }, [isAuthenticated, allPlan]);

  useEffect(() => {
    const fetchExerciseForDay = async () => {
      if (!activePlan) return null;

      const muscleGroup =
        activePlan?.planTemplate?.weeklySchedule[
          localStorage.getItem("today").toLocaleLowerCase()
        ].name;
      const filteredExercise = exercises.filter((exercise) => {
        return exercise.workoutType.name === muscleGroup;
      });
      setTodayExercises(filteredExercise);
    };
    const timer = setTimeout(() => {
      stopCurrentLoading();
    }, 2000);
    fetchExerciseForDay();
    return () => clearTimeout(timer);
  }, [activePlan, exercises]);

  if (!isAuthenticated) return null;

  return (
    <UserDataContext.Provider
      value={{
        templates,
        allPlan,
        setAllPlan, // WorkoutPlanTemplates
        // fetchAllPlan,
        activePlan,
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
