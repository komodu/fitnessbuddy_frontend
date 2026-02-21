import { useState, useEffect } from "react";
import WorkoutPlanForm from "../components/WorkoutPlanForm";
import { useModal, useUserData } from "../hooks/accessor/ContextAccessors";
import UniversalModal from "@/components/UniversalModal";
import WorkoutPlanTemplateForm from "../components/WorkoutTemplateForm";
import WorkoutPlanSchedules from "../components/WorkoutPlanSchedules";

import LoaderSVG from "../assets/img/loader.svg";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers
const WorkoutPlan = () => {
  const { openModal } = useModal();
  const { allPlan } = useUserData();
  const { templates } = useUserData();
  const [disable, setDisabled] = useState(false);
  console.log("currentPlan: ", allPlan);
  console.log("templates: ", templates);
  // if (!allPlan) {
  //   return (
  //     <div className="workouts-loading">
  //       <img
  //         src={LoaderSVG}
  //         className="loader-icon"
  //         style={{ width: "60px", height: "60px" }}
  //       />
  //     </div>
  //   );
  // }

  const handleDeletePlan = async (plan_id) => {
    console.log("plan:", plan_id);
    try {
      const response = await fetch("/api/workoutplan/delete-plan/" + plan_id, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error in Deleting Plan");
      const data = await response.json();
      console.log("data: ", data);
    } catch (error) {
      console.log("Error in Deleting Plan: ", error);
    }
  };
  return (
    <>
      <UniversalModal />

      <div className="container-fluid home px-3 px-md-5">
        <div className="row justify-content-center ">
          {/* LEFT COLUMN */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <strong>Workout Plan</strong>
                </h2>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    openModal("Create User Workout Plan", <WorkoutPlanForm />)
                  }
                  disabled={disable}
                >
                  Add Workout Plan
                </button>
              </div>

              {/* Workout Card */}
              {allPlan?.length > 0 ? (
                allPlan.map((plan) => (
                  <div
                    className="card workout-details shadow-sm"
                    key={plan._id}
                  >
                    <div className="card-body">
                      <h6 className="text-muted mb-1">
                        Date Start : {plan.startDate}
                      </h6>
                      <h6>Date End : {plan.endDate}</h6>

                      <h4 className="fw-bold">{plan.planTemplate.name}</h4>

                      <div>
                        <p className="mb-1">
                          <strong>Workout List</strong>
                        </p>
                        <ul>
                          {days.map((day) => (
                            <li
                              key={plan.planTemplate.weeklySchedule[day]._id}
                              className="text-capitalize"
                            >
                              {day} :{" "}
                              {plan.planTemplate.weeklySchedule[day].name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-muted mb-3">1 day ago</p>

                      <div className="d-flex justify-content-end">
                        <span
                          className="material-symbols-outlined text-danger cursor-pointer"
                          onClick={() => handleDeletePlan(plan._id)}
                        >
                          delete
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>asdasdasdasdasd</>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-lg-8 p-3 border">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-around align-items-center">
                <h2>
                  <strong>Workout Plan Template</strong>
                </h2>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    openModal(
                      "Create User Workout Plan Template",
                      <WorkoutPlanTemplateForm />,
                    )
                  }
                >
                  Add Workout Plan Template
                </button>
              </div>

              {/* Schedule List */}
              <div className="row g-3">
                {templates.length > 0 ? (
                  templates.map((temp) => (
                    <div className="col-12" key={temp._id}>
                      <WorkoutPlanSchedules template={temp} />
                    </div>
                  ))
                ) : (
                  <p>No templates available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutPlan;
