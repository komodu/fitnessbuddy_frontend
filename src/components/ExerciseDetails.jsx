import { ExercisesContext } from "../context/ExerciseContext";
import { useContext } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const ExerciseDetails = ({ exercise }) => {
  const { dispatch } = useContext(ExercisesContext);
  const handleClick = async () => {
    const response = await fetch("/api/exercise/" + exercise._id, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log("deleted: ", json);
    if (response.ok) {
      dispatch({ type: "DELETE_EXERCISE", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{exercise.title}</h4>
      <h3>{exercise.workoutType?.name}</h3>
      <p>
        <strong>Load (kg): </strong>
        {exercise.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {exercise.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ExerciseDetails;
