import { useEffect, useState } from "react";
import { useUserData } from "../hooks/accessor/ContextAccessors"; // adjust path
import "bootstrap/dist/css/bootstrap.min.css";

const WorkoutSession = () => {
  const { todayExercises, activePlan } = useUserData();
  const [workout, setWorkout] = useState([]);
  const [duration, setDuration] = useState(new Date());
  // const [loading, setLoading] = useState(false);
  const dayToday = localStorage.getItem("today").toLowerCase();
  console.log("activePlan: ", activePlan);
  console.log(
    "today's workout Type: ",
    activePlan.planTemplate.weeklySchedule[dayToday]._id,
  );

  // When exercises change, extend them with UI state
  useEffect(() => {
    if (!todayExercises) return;

    const formatted = todayExercises.map((ex) => ({
      ...ex,
      currentSet: 1,
      completed: false,
    }));

    setWorkout(formatted);
  }, [todayExercises]);

  // Handle set submission
  const handleSubmitSet = async (id, reps, weight) => {
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
    const currentTime = new Date().getTime();
    setDuration(currentTime - duration.getTime());
    try {
      const res = await fetch("/api/workout-session/add-set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: id,
          reps: Number(reps),
          weight: Number(weight),
          duration: duration,
          restTime: 60, // optional
        }),
      });
      const data = await res.json();
      console.log("Updated set:", data);
      // Optionally update local state to reflect new set
    } catch (err) {
      console.error(err);
    }
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

              <td>{ex.weight} kg</td>
              <td>{ex.reps}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={ex.completed}
                  onClick={() => handleSubmitSet(ex._id)}
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
};

export default WorkoutSession;
