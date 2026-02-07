import { useState, useContext, useEffect } from "react";
import WorkoutPlanForm from "../components/WorkoutPlanForm";
import { CurrentContext, ModalContext } from "../context/Context";
import UniversalModal from "@/components/UniversalModal";
import WorkoutPlanTemplateForm from "../components/WorkoutTemplateForm";
import WorkoutPlanSchedules from "../components/WorkoutPlanSchedules";
//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers
const WorkoutPlan = () => {
  const { openModal } = useContext(ModalContext);
  const { userPlan } = useContext(CurrentContext);
  const [disable, setDisabled] = useState(false);

  useEffect(() => {
    // ! Work on Routings for validation
  }, []);
  console.log(
    "userPlanWorkoutPlan2: ",
    userPlan?.userPlan.planTemplate.weeklySchedule["friday"],
  );
  return (
    <>
      <UniversalModal />
      <div className="container-fluid home px-3 px-md-5">
        <div>
          <div className="d-flex justify-content-around my-3">
            <h1>Workout Plan</h1>
            <button
              className="btn btn-primary"
              onClick={() =>
                openModal("Create User Workout Plan", <WorkoutPlanForm />)
              }
              disabled={disable ? "true" : ""}
            >
              <span>Add Workout Plan </span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                openModal(
                  "Create User Workout Plan Template",
                  <WorkoutPlanTemplateForm />,
                )
              }
            >
              <span>Add Workout Plan Template</span>
            </button>
          </div>
        </div>
        <WorkoutPlanSchedules />
        {/* <div className="row g-3">
          <strong>Workout Schedule </strong>
          <div className="workout-details">
            <h4>Date: Friday, January 1, 1999</h4>
            <h3>Core</h3>
            <p>
              <strong>Workout List </strong>
            </p>
            <p>1 day ago</p>
            <span className="material-symbols-outlined">delete</span>
          </div>

          {exercises.map((exercise) => (
            <div
              key={exercise._id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <ExerciseDetails exercise={exercise} />
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default WorkoutPlan;
