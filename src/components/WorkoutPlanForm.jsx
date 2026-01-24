import { useState } from "react";
import Input from "./Input";

const WorkoutPlanForm = () => {
  const [type, setType] = useState("");

  const [date, setDate] = useState(new Date());
  const [off, setOff] = useState(false);
  const [day, setDay] = useState(0);

  return (
    <form>
      <Input
        type="text"
        value={type}
        label="Type"
        placeholder="Type"
        onChange={(e) => setType(e.target.value)}
      />
      <Input
        type="date"
        label="Date"
        placeholder="Date"
        value={date}
        onChange={(e) => {
          console.log(e.target.value);
          setDate(e.target.value);
        }}
      />
      <label for="restday">Rest Day:</label>
      {/* ! */}
      <input
        id="restday"
        type="checkbox"
        value={off}
        onChange={(e) => setOff(e.target.value)}
      />
      <Input
        value={day}
        type="number"
        onChange={(e) => setDay(e.target.value)}
        label="Day"
        placeholder="Day"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default WorkoutPlanForm;
