// import { useState } from "react";
import Input from "./Input";

const WorkoutPlanForm = () => {
  return (
    <form className="card p-4 shadow-sm">
      <h4 className="mb-3">Create User Workout Plan</h4>

      <div className="mb-3">
        <label className="form-label" htmlFor="planTemplate">
          Plan Template
        </label>
        <select id="planTemplate" name="planTemplate" className="form-select">
          <option value="">Select Template</option>
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
