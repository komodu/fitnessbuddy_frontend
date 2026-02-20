import { useEffect, useState } from "react";
import { useUserData } from "../hooks/accessor/ContextAccessors";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkoutSession = () => {
  const { todayExercises, activePlan } = useUserData();
  const [workout, setWorkout] = useState([]);
  const [editingId, setEditingId] = useState(null); // row being edited
  const dayToday = localStorage.getItem("today")?.toLowerCase();

  useEffect(() => {
    if (!todayExercises) return;

    const formatted = todayExercises.map((ex) => ({
      ...ex,
      currentSet: 1,
      completed: false,
      editedWeight: ex.weight ?? 0,
      editedReps: ex.reps ?? 0,
    }));

    setWorkout(formatted);
  }, [todayExercises]);

  // Handle set submission (with optional edited values)
  const handleSubmitSet = async (id) => {
    const exercise = workout.find((ex) => ex._id === id);

    setWorkout((prev) =>
      prev.map((ex) => {
        if (ex._id === id) {
          if (ex.currentSet < ex.totalSet) {
            return { ...ex, currentSet: ex.currentSet + 1 };
          } else {
            return { ...ex, completed: true };
          }
        }
        return ex;
      }),
    );

    try {
      const res = await fetch("/api/workout-sessions/add-set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: id,
          reps: Number(exercise.editedReps),
          weight: Number(exercise.editedWeight),
          duration: 44,
          restTime: 60,
        }),
      });
      const data = await res.json();
      console.log("Submitted set:", data);
    } catch (err) {
      console.error(err);
    }

    // Exit editing after submit
    setEditingId(null);
  };
  const handleChange = (id, field, value) => {
    setWorkout((prev) =>
      prev.map((ex) =>
        ex._id === id
          ? { ...ex, [field]: value === "" ? "" : Number(value) } // convert to number
          : ex,
      ),
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
            <tr key={ex._id} className={ex.completed ? "table-success" : ""}>
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

              {/* Weight */}
              <td style={{ width: "80px" }}>
                {editingId === ex._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={ex.editedWeight}
                    onChange={(e) =>
                      handleChange(ex._id, "editedWeight", e.target.value)
                    }
                  />
                ) : (
                  `${ex.weight} kg`
                )}
              </td>

              {/* Reps */}
              <td>
                {editingId === ex._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={ex.editedReps}
                    style={{ width: "60px" }}
                    onChange={(e) =>
                      handleChange(ex._id, "editedReps", e.target.value)
                    }
                  />
                ) : (
                  ex.reps
                )}
              </td>

              {/* Action */}
              <td>
                {editingId === ex._id ? (
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={ex.completed}
                    onClick={() => handleSubmitSet(ex._id)}
                  >
                    Submit Set
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditingId(ex._id)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutSession;
