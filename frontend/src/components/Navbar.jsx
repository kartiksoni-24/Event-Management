import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotify } from "../context/NotificationContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotify();

  const handleLogout = () => {
    logout();
    showNotification("Logged out successfully", "info");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm shadow-indigo-500/50 px-4 md:px-8">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          EventHub
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-base">
          {user && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/create">Create Event</Link>
              </li>
              <li>
                <Link to="/admin-profile">Admin Profile</Link>
              </li>
            </>
          )}

          {user && user.role !== "admin" && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <span className="hidden md:inline font-medium mr-2">
              Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-error"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-secondary">
              Register
            </Link>
          </div>
        )}

        {/* Mobile dropdown */}
        {user && (
          <div className="dropdown dropdown-end lg:hidden ml-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user?.role === "admin" && (
                <>
                  <li>
                    <Link to="/create">Create Event</Link>
                  </li>
                  <li>
                    <Link to="/admin-profile">Admin Profile</Link>
                  </li>
                </>
              )}
              {user && user.role !== "admin" && (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
