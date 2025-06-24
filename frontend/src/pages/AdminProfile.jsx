import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/Api";
import EditEventModal from "../components/EditEventModal";
import { useNotify } from "../context/NotificationContext";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useLoader } from "../context/LoaderContext";

const AdminProfile = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { showNotification } = useNotify();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { setLoading } = useLoader();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/events");
      const created = res.data.filter((e) => e.createdBy === user._id);
      setEvents(created);
    } catch (error) {
      showNotification("Failed to fetch events", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await API.delete(`/events/${deleteId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      showNotification("Event deleted!", "warning");
      fetchEvents();
    } catch {
      showNotification("Delete failed", "error");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className=" mx-5 px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Created Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((e, index) => (
          <div
            key={event._id}
            className="card bg-base-100 shadow-lg  shadow-black border border-gray-300 transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
          >
            <div className="card-body">
              <h2 className="card-title text-secondary">{e.title}</h2>
              <p>{e.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(e.date).toLocaleDateString()} • {e.time}
              </p>
              <p className="text-sm font-semibold">
                Seats Left: {e.registrationLimit - e.registeredUsers.length}
              </p>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => {
                    setEditingEvent(e);
                    setShowModal(true);
                  }}
                  className="btn btn-sm btn-warning hover:scale-105 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(e._id)}
                  className="btn btn-sm btn-error hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EditEventModal
        show={showModal}
        event={editingEvent}
        token={user.token}
        onClose={() => setShowModal(false)}
        onUpdate={fetchEvents}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
};

export default AdminProfile;
