import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { 
  MdHome, 
  MdPeople, 
  MdFavorite, 
  MdBarChart, 
  MdPersonAdd,
  MdLogout 
} from "react-icons/md";

const Sidebar = () => {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/users", icon: MdPeople },
    { name: "Favorites", path: "/favorites", icon: MdFavorite },
  ];

  return (
    <div className="drawer-side z-10">
      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
      <aside className="w-64 min-h-screen bg-base-100 border-r flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">User Management</h1>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Main Menu</p>
            <ul className="menu p-0 space-y-1">
              {menuItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-lg ${
                        isActive 
                          ? "bg-base-200 text-primary font-medium" 
                          : "text-base-content hover:bg-base-200"
                      }`}
                    >
                      <Icon className="text-xl" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
        </div>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="bg-base-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral">
                  {auth?.image ? (
                    <img src={auth.image} alt={auth.firstName} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-content">
                      <span className="text-lg font-semibold">
                        {auth?.firstName?.[0]}{auth?.lastName?.[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {auth?.firstName} {auth?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {auth?.email}
                </p>
              </div>
              <button 
                onClick={logout}
                className="btn btn-ghost btn-sm btn-circle"
                title="Logout"
              >
                <MdLogout className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;