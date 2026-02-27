import { useState, useEffect } from "react";
import WorkoutPlanForm from "../components/WorkoutPlanForm";
import { useModal, useUserData } from "../hooks/accessor/ContextAccessors";
import UniversalModal from "@/components/UniversalModal";
import WorkoutPlanTemplateForm from "../components/WorkoutTemplateForm";
import WorkoutPlanTemplates from "../components/WorkoutPlanTemplates";

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
  const { allPlan, setAllPlan, templates } = useUserData();
  const [disable, setDisabled] = useState(false);

  const handleDeletePlan = async (plan_id) => {
    try {
      const response = await fetch("/api/workoutplan/delete-plan/" + plan_id, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error in Deleting Plan");

      setAllPlan((prev) => prev.filter((plan) => plan._id !== plan_id));
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
                    {" "}
                    <div className="card-body">
                      <h2>
                        <strong className="text-capitalize">
                          {plan.planName}
                        </strong>
                      </h2>
                      <div>
                        <p className="mb-1">
                          <strong>Workout:</strong>
                        </p>
                        <h4 className="fw-bold">{plan.planTemplate.name}</h4>{" "}
                        <ul>
                          {days.map((day, index) => (
                            <li key={index} className="text-capitalize">
                              {day} :{" "}
                              {plan.planTemplate.weeklySchedule[day].name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <h6 className="text-muted mb-1">
                        Date Start : {plan.startDate}
                      </h6>
                      <h6>Date End : {plan.endDate}</h6>
                      {/* //! Implement MomentJS */}
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
                      <WorkoutPlanTemplates template={temp} />
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
