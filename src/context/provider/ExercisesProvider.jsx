import { useExercises } from "../../hooks/useExercises";
import LoaderSVG from "../../assets/img/loader.svg";
import { ExercisesContext } from "../Context";
import { useWorkoutTypes } from "../../hooks/useWorkoutTypes";
const ExercisesProvider = ({ children }) => {
  const { exLoading, state, dispatch } = useExercises();
  const { workoutTypes } = useWorkoutTypes();

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
  console.log("workoUt: ", workoutTypes);
  return (
    <ExercisesContext.Provider
      value={{ exercises: state.exercises, workoutTypes, dispatch }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;
