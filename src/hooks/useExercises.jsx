import { exercisesReducer } from "../reducer/exerciseReducer";
import { useReducer, useState, useEffect } from "react";

const initialState = {
  exercise: [],
};
export const useExercises = () => {
  const [state, dispatch] = useReducer(exercisesReducer, initialState);
  const [exLoading, setExLoading] = useState(true);

  useEffect(() => {
    const fetchUserExercises = async () => {
      try {
        const response = await fetch("/api/exercise/");
        if (!response.ok)
          return new Error("Error in fetching Exercises in Context");
        const data = await response.json();

        dispatch({ type: "SET_EXERCISES", payload: data });
      } catch (error) {
        console.error("Error in Exercise Provider: ", error);
      }
    };
    // Set loader for 2secs after fetch
    fetchUserExercises();
    const timer = setTimeout(() => {
      setExLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  console.log("ExercisesProvider: ", state.exercises);

  return { exLoading, state, dispatch };
};
