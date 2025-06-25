import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/Api";
import { useNotify } from "../context/NotificationContext";
import LoadingButton from "../components/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotify();

  
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      showNotification("Login successful!", "success");

      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";
      showNotification(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 py-10 bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <LoadingButton isLoading={loading} type="submit" className=" btn-primary w-full hover:scale-105 transition">
            Login
          </LoadingButton>

          
        </form>
        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
