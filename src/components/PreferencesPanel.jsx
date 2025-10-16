import { useContext, useState } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import { MdSettings, MdLightMode, MdDarkMode, MdRefresh, MdStar } from "react-icons/md";

const PreferencesPanel = () => {
  const { 
    theme, 
    setTheme, 
    itemsPerPage, 
    setItemsPerPage, 
    resetPreferences,
    favorites 
  } = useContext(PreferencesContext);

  const [tempItemsPerPage, setTempItemsPerPage] = useState(itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;
    setTempItemsPerPage(value);
    
    // Only update if it's a valid number between 1 and 100
    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 100) {
      setItemsPerPage(numValue);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <MdSettings className="text-2xl" />
      </label>
      <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-80 p-4 shadow bg-base-100 rounded-box mt-2">
        <div className="card-body">
          <h3 className="font-bold text-lg mb-3">Preferences</h3>
          
          {/* Theme Toggle */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Theme</span>
            </label>
            <div className="flex gap-2">
              <button 
                className={`btn btn-sm flex-1 gap-2 ${theme === "light" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setTheme("light")}
              >
                <MdLightMode />
                Light
              </button>
              <button 
                className={`btn btn-sm flex-1 gap-2 ${theme === "dark" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setTheme("dark")}
              >
                <MdDarkMode />
                Dark
              </button>
            </div>
          </div>

          {/* Items Per Page - Input Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Items per page</span>
            </label>
            <input
              type="number"
              min="1"
              max="100"
              className="input input-bordered w-full"
              value={tempItemsPerPage}
              onChange={handleItemsPerPageChange}
              placeholder="Enter number (1-100)"
            />
            <label className="label">
              <span className="label-text-alt text-gray-500">
                Enter a number between 1 and 100
              </span>
            </label>
          </div>

          {/* Favorites Count */}
          <div className="mb-4 p-3 bg-base-200 rounded-lg">
            <p className="text-sm text-gray-600">
              <MdStar className="inline text-yellow-500" /> You have <strong>{favorites.length}</strong> favorite{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Reset Button */}
          <button 
            className="btn btn-error btn-outline gap-2"
            onClick={resetPreferences}
          >
            <MdRefresh />
            Reset All Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;