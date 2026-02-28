import { useState, useEffect } from "react";
import { useUserData } from "../hooks/accessor/ContextAccessors";
import WorkoutSession from "../components/WorkoutSessionComponent";

//! Issue: Optmize to avoid bugs, put taken session into Context
const StartWorkoutComponent = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const { activePlan } = useUserData();

  const [workoutTypeId, setworkoutTypeId] = useState("");
  const [planId, setPlanId] = useState("");
  const dayToday = localStorage.getItem("today").toLowerCase();
  // const workoutTypeId = activePlan.planTemplate?.weeklySchedule[dayToday]._id;
  // const planId = activePlan.planTemplate?._id;
  const [session, setSession] = useState(null);

  const [isExist, setIsExist] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  useEffect(() => {
    if (!activePlan?.planTemplate) return;

    setPlanId(activePlan.planTemplate._id);
    setworkoutTypeId(activePlan.planTemplate.weeklySchedule?.[dayToday]?._id);
    if (session?.status === "completed") {
      setCompleted(true);
    }
  }, [activePlan, dayToday, session?.status]);

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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setSession(data);

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
  // handleContinue if session existed then it will be this function instead of handleStart
  const handleContinue = async () => {};
  //Check if session exist
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/workout-sessions");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error fetching sessions");
        }
        setIsExist(true);
        setSession(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="border border-black" style={{ maxWidth: "500px" }}>
      {/* Toggle Button (shown when closed) */}
      {/* If there is assigned Active Plan */}
      {!isCompleted ? (
        !open && activePlan ? (
          activePlan?.planTemplate?.weeklySchedule?.[dayToday]?.name !==
          "Rest" ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                {
                  session && isExist ? handleContinue() : handleStart();
                }
                setOpen(true);
              }}
              style={{ width: "250px" }}
            >
              {session && isExist ? "Continue Workout" : "Start New Workout"}
            </button>
          ) : (
            <>
              {/* If the Active Plan today is Rest */}
              <h3>It is Rest Day Get a Life!</h3>
            </>
          )
        ) : (
          // If there is no Assigned Active Plan
          !open && !activePlan && <>Assign a Plan first</>
        )
      ) : (
        <>
          <div className="container mt-5 text-center">
            <h2 className="text-success">Workout Completed for Today!</h2>
            <h4>Enjoy your day 💪</h4>
          </div>
        </>
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
                  <WorkoutSession session={session} setSession={setSession} />
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
