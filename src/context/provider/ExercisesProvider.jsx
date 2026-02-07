import { useReducer, useEffect } from "react";
import { exercisesReducer } from "../../reducer/exerciseReducer";
import { ExercisesContext } from "../Context";

const initialState = {
  exercises: [],
};
const ExercisesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exercisesReducer, initialState);

  useEffect(() => {
    const fetchUserExercises = async () => {
      const response = await fetch("/api/exercise/");
      if (!response.ok)
        return new Error("Error in fetching Exercises in Context");
      const data = await response.json();

      dispatch({ type: "SET_EXERCISES", payload: data });
    };
    fetchUserExercises();
  }, []);
  console.log("ExercisesProvider: ", state.exercises);
  return (
    <ExercisesContext.Provider value={{ exercises: state.exercises, dispatch }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;
