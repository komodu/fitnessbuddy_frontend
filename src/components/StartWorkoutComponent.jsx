import { useState } from "react";

import WorkoutSession from "../components/WorkoutSessionComponent";
const StartWorkoutComponent = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  return (
    <div className="" style={{ maxWidth: "500px" }}>
      {/* Toggle Button (shown when closed) */}
      {!open && (
        <button
          className="btn btn-primary"
          onClick={() => setOpen(true)}
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
