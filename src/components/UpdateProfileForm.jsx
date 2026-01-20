import { useState } from "react";
import Input from "./Input";

const UpdateProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  return (
    <form className="form-control">
      <Input
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Age"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <div className="d-flex justify-content-center align-item-center">
        <button type="submit" classname="btn btn-primary-lg">
          Save Changes
        </button>
      </div>
    </form>
  );
};
export default UpdateProfileForm;
