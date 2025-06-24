import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import { useAuth } from "../context/AuthContext";
import { useNotify } from "../context/NotificationContext";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    registrationLimit: "",
  });
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotify();

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.registrationLimit)
      newErrors.registrationLimit = "Limit is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await API.post("/events", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      showNotification("Event created successfully!", "success");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="card shadow-lg bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4 text-center text-primary">
            Create New Event
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {["title", "location", "date", "time", "registrationLimit"].map(
              (field) => (
                <div key={field}>
                  <input
                    type={field === "date" || field === "time" ? field : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className={`input input-bordered w-full ${
                      errors[field] ? "input-error" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              )
            )}

            <div className="md:col-span-2">
              <textarea
                name="description"
                placeholder="Event Description"
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full md:col-span-2 hover:scale-105 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
