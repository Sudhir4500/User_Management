import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import PreferencesPanel from "./PreferencesPanel";
import { 
  MdMenu,
  MdStar
} from "react-icons/md";

const Topbar = ({ 
  query, 
  setQuery 
}) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 border-b px-4 lg:px-6 h-16">
      {/* Left side */}
      <div className="navbar-start">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost lg:hidden">
          <MdMenu className="text-2xl" />
        </label>
        
        {/* Search */}
        <SearchBar 
          query={query}
          setQuery={setQuery}
          placeholder="Search"
          className="ml-0 lg:ml-4"
        />
      </div>

      {/* Right side */}
      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <Link to="/favorites" className="btn btn-ghost btn-circle">
            <MdStar className="text-2xl" />
          </Link>
          <PreferencesPanel />
        </div>
      </div>
    </div>
  );
};

export default Topbar;