import { useState } from "react";
import { useModal, useUserData } from "../hooks/accessor/ContextAccessors";

const WorkoutPlanForm = () => {
  const { templates, setAllPlan } = useUserData();

  const [planName, setPlanName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { closeModal } = useModal();

  const payload = {
    planName: planName,
    planTemplate: selectedTemplate,
    startDate: startDate,
    endDate: endDate,
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/workoutplan/userplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Error in submitting new Plan");
      const data = await response.json();
      setAllPlan((prev) => [data.data, ...prev]);
      closeModal();
    } catch (error) {
      console.log("error: ", error.message);
      closeModal();
    }
  };
  console.log(payload);

  return (
    <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
      <div className="mb-3">
        <div className="mb-3">
          <label className="form-label" htmlFor="planName">
            Plan Name
          </label>
          <input
            id="planName"
            type="text"
            className="form-control"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>
        <label className="form-label" htmlFor="planTemplate">
          Plan Template
        </label>
        <select
          id="planTemplate"
          name="planTemplate"
          className="form-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Select Template</option>

          {templates?.map((temp) => (
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
        <input
          id="startDate"
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="durationWeeks">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          min={1}
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
