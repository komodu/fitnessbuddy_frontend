import { UserDataContext, AuthContext, ExercisesContext } from "../Context";
import { useState, useEffect, useContext, act } from "react";
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
    const fetchActivePlan = async () => {
      try {
        const response = await fetch("/api/workoutplan/userplan");
        if (!response.ok) throw new Error("Error fetching Active Plan");
        const data = await response.json();
        console.log("Active Plan has been set. ");
        setActivePlan(data.activePlan);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchActivePlan();
    fetchAllPlan();
  }, [isAuthenticated]);

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
      console.log("Filtereasd: ", filteredExercise);
      setTodayExercises(filteredExercise);
    };
    const timer = setTimeout(() => {
      stopCurrentLoading();
    }, 2000);
    fetchExerciseForDay();
    return () => clearTimeout(timer);
  }, [activePlan, exercises]);

  console.log("all exercises provider: ", exercises);
  console.log("All Plans provider: ", allPlan);
  console.log("Active Plan provider: ", activePlan);
  if (!isAuthenticated) return null;
  // console.log("userPlan workout Type: ", userPlan?.workoutType);
  console.log("today exercises provider: ", todayExercises);
  return (
    <UserDataContext.Provider
      value={{
        templates,
        allPlan,
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
