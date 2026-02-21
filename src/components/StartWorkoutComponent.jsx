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
  const [session, setSession] = useState(null);

  const [isExist, setIsExist] = useState(false);
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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("result session : ", data);
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
  console.log("Session: ", session);
  // handleContinue if session existed then it will be this function instead of handleStart
  const handleContinue = async () => {};
  //Check if session exist
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/workout-sessions");
        if (!response.ok) throw new Error("error fetching session");
        const data = response.json();
        setIsExist(true);
        setSession(data);
      } catch (err) {
        console.log("error in fetching Session: ", err);
      }
    };
    fetchSession();
  }, []);
  console.log("sess: ", session);
  return (
    <div className="" style={{ maxWidth: "500px" }}>
      {/* Toggle Button (shown when closed) */}
      {!open &&
      activePlan?.planTemplate?.weeklySchedule?.[dayToday]?.name !== "Rest" ? (
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
          <h3>It is Rest Day Get a Life!</h3>
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
