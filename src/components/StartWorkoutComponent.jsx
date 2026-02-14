import { useState, useEffect } from "react";
import { useUserData } from "../hooks/accessor/ContextAccessors";
import WorkoutSession from "../components/WorkoutSessionComponent";
const StartWorkoutComponent = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const { activePlan } = useUserData();

  const [workoutTypeId, setworkoutTypeId] = useState("");
  const [planId, setPlanId] = useState("");
  const dayToday = localStorage.getItem("today").toLowerCase();
  // const workoutTypeId = activePlan.planTemplate?.weeklySchedule[dayToday]._id;
  // const planId = activePlan.planTemplate?._id;

  useEffect(() => {
    if (!activePlan?.planTemplate) return;

    setPlanId(activePlan.planTemplate._id);
    setworkoutTypeId(activePlan.planTemplate.weeklySchedule?.[dayToday]?._id);
  }, [activePlan, dayToday]);

  const handleStart = async () => {
    try {
      const response = await fetch("/api/workout-sessions/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          planId,
          workoutTypeId,
        }),
      });
      console.log(
        "stringify: ",
        JSON.stringify({
          planId,
          workoutTypeId,
        }),
      );
      const data = await response.json();
      console.log("result session : ", data);
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Session started:", data);

      // Example: redirect to session page
      // navigate(`/session/${data._id}`);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    } finally {
      console.log("it is finished");
    }
  };

  return (
    <div className="" style={{ maxWidth: "500px" }}>
      {/* Toggle Button (shown when closed) */}
      {!open && (
        <button
          className="btn btn-primary"
          onClick={() => {
            handleStart();
            setOpen(true);
          }}
          style={{ width: "250px" }}
        >
          Show Details
        </button>
      )}

      {/* Accordion (shown when open) */}
      {open && (
        <div className="accordion mt-3">
          <div className="accordion-item shadow-sm" style={{ width: "450px" }}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                onClick={() => setShow(!show)}
              >
                Click to Hide
              </button>
            </h2>

            {show && (
              <div className="accordion-collapse collapse show gap-4">
                <div className="accordion-body">
                  <WorkoutSession />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartWorkoutComponent;
