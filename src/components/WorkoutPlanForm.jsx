import { useState } from "react";
import Input from "./Input";

const WorkoutPlanForm = () => {
  const [name, setName] = useState("");
  return (
    <form>
      <Input
        type="text"
        value={name}
        label="Name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
};

export default WorkoutPlanForm;
