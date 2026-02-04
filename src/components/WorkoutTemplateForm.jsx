import { useState, useEffect, useReducer } from "react";
import { formReducer } from "../reducer/exerciseReducer";
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
//! Optimize this
// workoutTypes prop shape:
// [{ _id: "...", name: "Chest" }]
const WorkoutPlanTemplateForm = () => {
  const initState = { workoutTypes: [] };
  const [state, dispatchForm] = useReducer(formReducer, initState);
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
  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await fetch("/api/workout-types");
        const data = await response.json();
        console.log("templateform: ", data);
        console.log("wkout: ", initState);
        if (response.ok) {
          dispatchForm({ type: "SET_WORKOUT_TYPES", payload: data });
        } else {
          console.error("Failed to fetch workout types:", data.error);
        }
      } catch (err) {
        console.error("Error fetching workout types:", err);
      }
    };

    fetchWorkoutTypes();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day, value) => {
    console.log("day: ", day, " value: ", value);
    setForm((prev) => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: value,
      },
    }));
    console.log("day: ", day, " value: ", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      daysPerWeek: Number(form.daysPerWeek),
      workoutTypeIds: form.weeklySchedule,
    };
    console.log("payload: ", JSON.stringify(payload));
    const response = await fetch("/api/workoutplan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log("ERROR: ", response);
    }
    console.log("success submission: ", data);
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
                {state.workoutTypes.map((wt) => (
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
