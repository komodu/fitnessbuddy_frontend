import { useReducer, useEffect, useContext } from "react";
import { ExercisesContext } from "../context/ExerciseContext";
import Form from "react-bootstrap/Form";
import Input from "./Input";

const ExerciseForm = () => {
  const { dispatch } = useContext(ExercisesContext);

  const initialStates = {
    title: "",
    load: "",
    reps: "",
    workoutType: "",
    workoutTypes: [],
    error: null,
    emptyFields: [],
  };

  function formReducer(state, action) {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "SET_ERROR":
        return {
          ...state,
          error: action.error,
          emptyFields: action.emptyFields || [],
        };
      case "SET_WORKOUT_TYPES":
        return { ...state, workoutTypes: action.payload };
      case "RESET_FORM":
        return {
          ...state,
          title: "",
          load: "",
          reps: "",
          workoutType: "",
        };
      default:
        return state;
    }
  }

  const [formState, dispatchForm] = useReducer(formReducer, initialStates);
  const { title, load, reps, workoutType, workoutTypes, error, emptyFields } =
    formState;

  const handleChange = (field, value) => {
    dispatchForm({ type: "SET_FIELD", field, value });
  };

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await fetch("/api/workout-types");
        const data = await response.json();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exercise = { title, load, reps, workoutType };
    console.log("body:", JSON.stringify(exercise));
    const response = await fetch("/api/exercise", {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      dispatchForm({
        type: "SET_ERROR",
        error: json.error,
        emptyFields: json.emptyFields,
      });
    } else {
      dispatchForm({ type: "RESET_FORM" });
      dispatch({ type: "CREATE_EXERCISE", payload: json });
      console.log(" new workout added", json);
    }
  };

  return (
    <div className="workout-form">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <div className="center-container">
          <label>Workout Type: </label>
          <Form.Select
            value={workoutType}
            onChange={(e) => handleChange("workoutType", e.target.value)}
            className={emptyFields.includes("workoutType") ? "error" : ""}
          >
            <option value="">Select Workout Type</option>
            {workoutTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <Input
          label="Title"
          type="text"
          onChange={(e) => handleChange("title", e.target.value)}
          value={title}
          placeholder="Test"
        />

        <Input
          label="Load (KG)"
          type="number"
          onChange={(e) => handleChange("load", e.target.value)}
          value={load}
          placeholder="##"
        />

        <Input
          label="Repetitions"
          type="number"
          onChange={(e) => handleChange("reps", e.target.value)}
          placeholder="##"
        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default ExerciseForm;
