import { useContext } from "react";
import WorkoutPlanForm from "../components/WorkoutPlanForm";
import { ModalContext } from "../context/Context";
import UniversalModal from "@/components/UniversalModal";
const WorkoutPlan = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <div>
      <UniversalModal />
      <div className="container-fluid home px-3 px-md-5">
        <div>
          <div className="d-flex justify-content-around my-3">
            <h1>Workout Plan</h1>
            <button
              className="btn btn-primary"
              onClick={() =>
                openModal("Workout Plan Form", <WorkoutPlanForm />)
              }
            >
              <span className="material-symbols-outlined flex-end">add</span>
            </button>
          </div>
        </div>
        <div className="row g-3">
          <strong>Workout Schedule </strong>
          <div class="workout-details">
            <h4>Date: Friday, January 1, 1999</h4>
            <h3>Core</h3>
            <p>
              <strong>Workout List </strong>
            </p>
            <p>1 day ago</p>
            <span class="material-symbols-outlined">delete</span>
          </div>
          {/* {exercises.map((exercise) => (
            <div
              key={exercise._id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <ExerciseDetails exercise={exercise} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
