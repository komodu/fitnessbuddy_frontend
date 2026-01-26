import { useReducer } from "react";
import { exercisesReducer } from "../../reducer/exerciseReducer";
import { ExercisesContext } from "../Context";

const ExercisesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exercisesReducer, {
    exercises: null,
  });

  return (
    <ExercisesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;
