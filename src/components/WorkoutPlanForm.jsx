import { useState, useEffect } from "react";

const WorkoutPlanForm = () => {
  const [template, setTemplates] = useState([]);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/workoutplan");

        if (!response.ok) {
          throw new Error("Error fetching templates");
        }

        const json = await response.json();
        console.log("API response:", json);

        setTemplates(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <form className="card p-4 shadow-sm">
      <div className="mb-3">
        <label className="form-label" htmlFor="planTemplate">
          Plan Template
        </label>
        <select id="planTemplate" name="planTemplate" className="form-select">
          <option value="">Select Template</option>

          {template.map((temp) => (
            <option key={temp._id} value={temp._id}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="startDate">
          Start Date
        </label>
        <input id="startDate" type="date" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="durationWeeks">
          Duration (Weeks)
        </label>
        <input
          id="durationWeeks"
          type="number"
          min={1}
          className="form-control"
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Save Plan
        </button>
      </div>
    </form>
  );
};

export default WorkoutPlanForm;
