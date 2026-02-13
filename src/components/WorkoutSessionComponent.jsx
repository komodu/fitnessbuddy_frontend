import { useEffect, useState } from "react";
import { useUserData } from "../hooks/accessor/ContextAccessors"; // adjust path
import "bootstrap/dist/css/bootstrap.min.css";

export default function WorkoutSession() {
  const { todayExercises } = useUserData();
  const [workout, setWorkout] = useState([]);

  // 1️⃣ When exercises change, extend them with UI state
  useEffect(() => {
    if (!todayExercises) return;

    const formatted = todayExercises.map((ex) => ({
      ...ex,
      currentSet: 1,
      completed: false,
    }));

    setWorkout(formatted);
  }, [todayExercises]);

  // 2️⃣ Handle set submission
  const handleSubmitSet = (id) => {
    setWorkout((prev) =>
      prev.map((ex) => {
        if (ex.id === id) {
          if (ex.currentSet < ex.totalSet) {
            return { ...ex, currentSet: ex.currentSet + 1 };
          } else {
            return { ...ex, completed: true };
          }
        }
        return ex;
      }),
    );
  };

  if (!workout.length) {
    return <div className="container mt-5">No exercises found.</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Workout Session</h3>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Exercise Name</th>
            <th>Set</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {workout.map((ex) => (
            <tr key={ex.id} className={ex.completed ? "table-success" : ""}>
              <td>
                {ex.title}
                {ex.completed && (
                  <span className="badge bg-success ms-2">Completed</span>
                )}
              </td>

              <td>
                {ex.completed
                  ? `${ex.totalSet} / ${ex.totalSet}`
                  : `${ex.currentSet} / ${ex.totalSet}`}
              </td>

              <td>{ex.weight} kg</td>
              <td>{ex.reps}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={ex.completed}
                  onClick={() => handleSubmitSet(ex.id)}
                >
                  Submit Set
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
