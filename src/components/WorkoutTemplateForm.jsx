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

// workoutTypes prop shape:
// [{ _id: "...", name: "Chest" }]
const WorkoutPlanTemplateForm = ({ workoutTypes = [], onSubmit }) => {
  const [form, setForm] = useState(() => {
    const initialSchedule = {};
    days.forEach((day) => {
      initialSchedule[day] = "";
    });

    return {
      name: "",
      daysPerWeek: 1,
      weeklySchedule: initialSchedule,
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day, value) => {
    setForm((prev) => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      daysPerWeek: Number(form.daysPerWeek),
      weeklySchedule: form.weeklySchedule,
    };

    onSubmit(payload);
  };

  return (
    <div className="card p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        {/* Template Name */}
        <div className="mb-3">
          <label className="form-label">Template Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="e.g. 5 Day Split"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Days Per Week */}
        <div className="mb-4">
          <label className="form-label">Days Per Week</label>
          <input
            type="number"
            className="form-control"
            name="daysPerWeek"
            min={1}
            max={7}
            value={form.daysPerWeek}
            onChange={handleChange}
            required
          />
        </div>

        <h6 className="mb-3">Weekly Schedule</h6>

        {days.map((day) => (
          <div key={day} className="row align-items-center mb-3">
            <div className="col-4 text-capitalize">{day}</div>
            <div className="col-8">
              <select
                className="form-select"
                value={form.weeklySchedule[day] || ""}
                onChange={(e) => handleDayChange(day, e.target.value)}
                required
              >
                <option value="">Select workout type</option>
                {workoutTypes.map((wt) => (
                  <option key={wt._id} value={wt._id}>
                    {wt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-primary">
            Save Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutPlanTemplateForm;
