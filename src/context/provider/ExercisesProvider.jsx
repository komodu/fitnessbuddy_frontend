import { useExercises } from "../../hooks/useExercises";
import LoaderSVG from "../../assets/img/loader.svg";
import { ExercisesContext } from "../Context";
const ExercisesProvider = ({ children }) => {
  const { exLoading, state, dispatch } = useExercises();

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
