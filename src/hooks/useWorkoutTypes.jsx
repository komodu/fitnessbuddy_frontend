import { useEffect, useReducer } from "react";
import { exercisesReducer } from "../reducer/exerciseReducer";
const initialState = {
  workoutTypes: [],
};
export const useWorkoutTypes = () => {
  const [state, dispatch] = useReducer(exercisesReducer, initialState);

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await fetch("/api/workout-types");
        if (!response.ok) throw new Error("Failed to fetch workout types API");
        const data = await response.json();
        // setWorkoutTypes(data);
        dispatch({ type: "SET_WORKOUT_TYPES", payload: data });
      } catch (err) {
        console.log("Error in useWorkoutTypes: ", err);
      }
    };
    fetchWorkoutTypes();
  }, []);

  return { ...state };
};
