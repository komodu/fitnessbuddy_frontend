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

  const toggle = () => {
    setOpen(!open);
  };

  // useEffect(()=>{

  // })

  if (!template || !template.weeklySchedule) {
    return <p>No schedule available</p>;
  }

  return (
    <div className="border mb-3 rounded">
      <button className="btn btn-light w-100 text-start" onClick={toggle}>
        {template.name}
      </button>

      <div className={`accordion-body-custom ${open ? "open mh-100" : ""}`}>
        <div className="p-3">
          <table className="table table-bordered text-center">
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
