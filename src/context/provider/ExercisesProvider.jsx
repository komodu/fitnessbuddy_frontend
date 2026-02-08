import { useReducer, useEffect, useState } from "react";
import { exercisesReducer } from "../../reducer/exerciseReducer";
import { ExercisesContext } from "../Context";
import LoaderSVG from "../../assets/img/loader.svg";
const initialState = {
  exercises: [],
};
const ExercisesProvider = ({ children }) => {
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
  if (exLoading) {
    return (
      <div className="workouts-loading">
        <img
          src={LoaderSVG}
          className="loader-icon"
          style={{ width: "60px", height: "60px" }}
        />
      </div>
    );
  }
  return (
    <ExercisesContext.Provider value={{ exercises: state.exercises, dispatch }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;
