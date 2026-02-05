import React, { useState } from "react";
import Input from "../components/Input";

//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      name: name,
      age: age,
      email: email,
    };
    console.log(age);
    console.log(email);
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if response is OK
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || "Registration failed");
      }

      const result = await resp.json();

      console.log("User registered: ", result);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };
  return (
    <form
      onSubmit={handleRegister}
      className="card p-4 p-lg-5 text-black"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h1>Registration Page</h1>
      <Input
        className="form-control form-control-lg mb-3"
        type="text"
        value={username}
        placeholder="Username"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        className="form-control-lg mb-3"
        type="text"
        value={name}
        placeholder="Name"
        label="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        className="form-control-lg mb-3"
        type="text"
        value={email}
        placeholder="Email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        className="form-control-lg mb-3"
        type="number"
        value={age}
        placeholder="Age"
        label="Age"
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <Input
        className="form-control form-control-lg mb-3"
        type="password"
        value={password}
        placeholder="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};
export default Register;
