import { useState, useEffect } from "react";
import Input from "./Input";

const UpdateProfileForm = ({ payload }) => {
  const [name, setName] = useState(payload.name);
  const [email, setEmail] = useState(payload.email);
  const [age, setAge] = useState(payload.age);
  console.log("payload: ", payload);
  useEffect(() => {
    if (payload) {
      setName(payload.name || "");
      setEmail(payload.email || "");
      setAge(payload.age || "");
    }
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPayload = {
      name,
      email,
      age,
    };
    try {
      console.log("id payload: ", payload._id);
      const response = await fetch(`/api/auth/${payload._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });
      if (!response.ok) throw new Error("Error in Editing User");
      const data = await response.json();
      console.log("data: ", data);
    } catch (error) {
      console.log("error in editing user: ", error);
    }
  };

  return (
    <form className="form-control" onSubmit={handleSubmit}>
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
