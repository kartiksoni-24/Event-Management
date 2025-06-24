import { useState, useEffect } from "react";
import API from "../services/Api";
import { useNotify } from "../context/NotificationContext";

const EditEventModal = ({ show, onClose, event, onUpdate, token }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { showNotification } = useNotify();

  useEffect(() => {
    if (event) setForm(event);
  }, [event]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await API.put(`/events/${event._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate();
      onClose();
      showNotification("Event updated!", "success");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h3 className="text-2xl font-bold text-center mb-4 text-secondary">
          Edit Event
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <input
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.location ? "input-error" : ""
              }`}
              placeholder="Location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          <div>
            <input
              name="date"
              type="date"
              value={form.date?.split("T")[0] || ""}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.date ? "input-error" : ""
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div>
            <input
              name="time"
              type="time"
              value={form.time || ""}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.time ? "input-error" : ""
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              name="registrationLimit"
              type="number"
              value={form.registrationLimit || ""}
              onChange={handleChange}
              className={`input input-bordered w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                errors.registrationLimit ? "input-error" : ""
              }`}
              placeholder="Limit"
            />
            {errors.registrationLimit && (
              <p className="text-red-500 text-sm">{errors.registrationLimit}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              className={`textarea textarea-bordered w-full ${
                errors.description ? "textarea-error" : ""
              }`}
              placeholder="Description"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline hover:scale-105 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success hover:scale-105 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
