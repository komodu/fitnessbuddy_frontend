import { useState } from "react";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const WorkoutPlanTemplates = ({ template }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  if (!template || !template.weeklySchedule) {
    return <p>No schedule available</p>;
  }

  console.log(open);
  return (
    <div>
      <button className="btn btn-light text-start w-100" onClick={toggle}>
        {template.name}
      </button>
      <div
        className={`accordion-body-custom border mb-3 rounded w-100"${open ? " open" : ""} `}
      >
        <div className="table-responsive">
          <table className="table table-bordered text-center mb-0">
            <thead>
              <tr>
                {days.map((day) => (
                  <th key={day} className="text-capitalize">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {days.map((day) => {
                  const dayData = template.weeklySchedule?.[day];
                  return (
                    <td key={day}>
                      <div className="fw-bold">{dayData?.name || "—"}</div>
                      {dayData?.exercises?.length > 0 ? (
                        dayData.exercises.map((ex) => (
                          <div key={ex._id} className="small text-muted">
                            • {ex.title}
                          </div>
                        ))
                      ) : (
                        <div className="small text-muted">No exercises</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanTemplates;
