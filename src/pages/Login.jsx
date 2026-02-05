import { useState, useContext } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Context";

//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers
const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(username, password);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  if (isAuthenticated) return <p>Already logged in!</p>;

  return (
    <div className="">
      <form
        onSubmit={handleLogin}
        className="card p-4 p-lg-5 text-black shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4">Login Page</h1>

        <Input
          className="form-control form-control-lg mb-3"
          type="text"
          value={username}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <Input
          className="form-control form-control-lg mb-3"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <Link to="/register">
            <button className="btn btn-secondary w-100 mb-3">Register</button>
          </Link>
        </div>

        <p className="text-center mb-0">
          <a href="#">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
