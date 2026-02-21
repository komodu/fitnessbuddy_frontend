import { useEffect, useState } from "react";
import { useUserData } from "../hooks/accessor/ContextAccessors";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkoutSession = ({ session, setSession }) => {
  const { todayExercises } = useUserData();
  const [workout, setWorkout] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const isCompleted = session?.status === "completed";

  useEffect(() => {
    if (!todayExercises || !session) return;

    const sessionExercises = session.workoutTypes?.[0]?.exercises || [];

    const formatted = todayExercises.map((ex) => {
      const matched = sessionExercises.find((se) => se.exercise === ex._id);

      const completedSets = matched?.sets?.length || 0;

      return {
        ...ex,
        currentSet: completedSets + 1,
        completed: completedSets >= ex.totalSet,
        editedWeight: ex.load ?? 0,
        editedReps: ex.reps ?? 0,
      };
    });

    setWorkout(formatted);
  }, [todayExercises, session]);
  // Submit single set
  const handleSubmitSet = async (id) => {
    const exercise = workout.find((ex) => ex._id === id);

    try {
      const res = await fetch("/api/workout-sessions/add-set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          exerciseId: id,
          reps: Number(exercise.editedReps),
          weight: Number(exercise.editedWeight),
          duration: 44,
          restTime: 60,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Update session globally
      setSession(data);

      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (id, field, value) => {
    setWorkout((prev) =>
      prev.map((ex) =>
        ex._id === id
          ? { ...ex, [field]: value === "" ? "" : Number(value) }
          : ex,
      ),
    );
  };

  console.log("session:: ", session);
  //  COMPLETE WORKOUT SESSION
  const handleSubmitWorkout = async () => {
    try {
      const res = await fetch("/api/workout-sessions/complete", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          sessionId: session._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSession(data); // update parent
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ✅ IF SESSION COMPLETED SHOW THIS ONLY
  if (isCompleted) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-success">🎉 Workout Completed for Today!</h2>
        <h4>Enjoy your day 💪</h4>
      </div>
    );
  }

  if (!workout.length) {
    return <div className="container mt-5">No exercises found.</div>;
  }

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
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

              <td style={{ width: "80px" }}>
                {editingId === ex._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={ex.editedWeight}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleChange(ex._id, "editedWeight", e.target.value)
                    }
                  />
                ) : (
                  `${ex.editedWeight} kg`
                )}
              </td>

              <td>
                {editingId === ex._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={ex.editedReps}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleChange(ex._id, "editedReps", e.target.value)
                    }
                  />
                ) : (
                  ex.editedReps
                )}
              </td>

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
                    disabled={ex.completed}
                    onClick={() => setEditingId(ex._id)}
                  >
                    Update Set
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-success mt-3"
        onClick={handleSubmitWorkout}
        disabled={editingId ? true : false}
      >
        Complete Workout
      </button>
    </div>
  );
};

export default WorkoutSession;
