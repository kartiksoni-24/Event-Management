import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import EditEventModal from "../components/EditEventModal";
import { useNotify } from "../context/NotificationContext";
import { useLoader } from "../context/LoaderContext";
import LoadingButton from "../components/LoadingButton";

const Home = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useNotify();
  const { setLoading } = useLoader();
  const [loadingId, setLoadingId] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
      showNotification("Failed to fetch events", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (id) => {
    if (!user) return navigate("/login");
    setLoadingId(id);
    try {
      await API.post(
        `/events/register/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      showNotification("Registered for event!", "success");
      fetchEvents();
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Registration failed",
        "error"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const handleUnregister = async (id) => {
    setLoadingId(id);
    try {
      await API.post(
        `/events/unregister/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      showNotification("Unregistered from event", "info");
      fetchEvents();
    } catch (err) {
      showNotification("Unregister failed", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((e) => {
          const isRegistered = user && e.registeredUsers.includes(user._id);
          const isAdmin = user?.role === "admin";
          const seatsLeft = e.registrationLimit - e.registeredUsers.length;

          return (
            <div
              key={e._id}
              className="card bg-base-100 shadow-lg shadow-black border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">{e.title}</h2>
                <p>{e.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(e.date).toLocaleDateString()} • {e.time}
                </p>
                <p className="text-sm font-semibold">Seats Left: {seatsLeft}</p>

                <div className="card-actions justify-end mt-4">
                  {isAdmin ? (
                    <p className="text-sm text-green-600 font-semibold">
                      Admin View
                    </p>
                  ) : (
                    <LoadingButton
                      isLoading={loadingId === e._id}
                      className={`btn btn-sm ${
                        isRegistered ? "btn-outline btn-warning" : "btn-success"
                      }`}
                      onClick={() =>
                        isRegistered
                          ? handleUnregister(e._id)
                          : handleRegister(e._id)
                      }
                    >
                      {isRegistered ? "Unregister" : "Register"}
                    </LoadingButton>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <EditEventModal
        show={showModal}
        event={editingEvent}
        token={user?.token}
        onClose={() => setShowModal(false)}
        onUpdate={fetchEvents}
      />
    </div>
  );
};

export default Home;
