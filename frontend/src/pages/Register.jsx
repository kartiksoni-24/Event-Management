import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotify } from "../context/NotificationContext";
import API from "../services/Api";
import LoadingButton from "../components/LoadingButton";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    branch: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotify();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.rollNumber) newErrors.rollNumber = "Roll number is required";
    if (!form.branch) {
      newErrors.branch = "Branch is required";
      // showNotification("Please select your branch", "error");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      login(res.data);
      showNotification("Account created!", "success");
      navigate("/");
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Registration failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 py-10 bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Roll Number"
              className={`input input-bordered w-full ${
                errors.rollNumber ? "input-error" : ""
              }`}
              value={form.rollNumber}
              onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>
            )}
          </div>

          <div>
            <select
              className={`select select-bordered w-full ${
                errors.branch ? "select-error" : ""
              }`}
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
            >
              <option value="">Select Branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="AI & DS">AI & DS</option>
              <option value="Chemical">Mechatronic</option>
              <option value="Production">
                Industrial and Production Engineering
              </option>
            </select>
            {errors.branch && (
              <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
            )}
          </div>

          <LoadingButton
            isLoading={loading}
            type="submit"
            className="w-full hover:scale-105 transition  btn-primary"
          >
            Register
          </LoadingButton>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
