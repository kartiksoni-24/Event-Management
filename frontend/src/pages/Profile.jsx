import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/Api";
import { useNotify } from "../context/NotificationContext";
import { useLoader } from "../context/LoaderContext";
import LoadingButton from "../components/LoadingButton";

const Profile = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const { showNotification } = useNotify();
  const { setLoading } = useLoader();
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await API.get("/events");
        const registered = res.data.filter((event) =>
          event.registeredUsers.includes(user._id)
        );
        setEvents(registered);
      } catch (err) {
        showNotification("Failed to fetch events", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

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
      const res = await API.get("/events");
      const registered = res.data.filter((event) =>
        event.registeredUsers.includes(user._id)
      );
      setEvents(registered);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="px-4 py-8 mx-5">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Registered Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div
            key={event._id}
            className="card bg-base-100 shadow-lg shadow-black border border-gray-300 transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
          >
            <div className="card-body">
              <h3 className="card-title text-primary">{event.title}</h3>
              <p>{event.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
              <div className="card-actions justify-end mt-4">
                <LoadingButton
                  isLoading={loadingId === event._id}
                  className="btn btn-sm btn-error hover:animate-pulse hover:scale-105 transition"
                  onClick={() => handleUnregister(event._id)}
                >
                  Unregister
                </LoadingButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
