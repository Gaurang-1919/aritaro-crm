import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "../api/authApi";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "setter",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await registerApi(formData);

      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response);

      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        JSON.stringify(err.response?.data) ||
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="setter">Setter</option>
          <option value="closer">Closer</option>
          <option value="admin">Admin</option>
        </select>

        <button disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;