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
        <MdSettings className="text-xl sm:text-2xl" />
      </label>
      
      <div 
        tabIndex={0} 
        className="dropdown-content z-[1] card card-compact w-screen sm:w-96 max-w-sm p-3 sm:p-4 shadow-lg bg-base-100 rounded-box mt-2 right-0"
      >
        <div className="card-body p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Preferences</h3>
          
          {/* Theme Toggle */}
          <div className="form-control mb-3 sm:mb-4">
            <label className="label py-1">
              <span className="label-text text-sm sm:text-base font-semibold">Theme</span>
            </label>
            <div className="flex gap-2">
              <button 
                className={`btn btn-xs sm:btn-sm flex-1 gap-1 sm:gap-2 ${theme === "light" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setTheme("light")}
              >
                <MdLightMode className="text-base sm:text-lg" />
                <span className="text-xs sm:text-sm">Light</span>
              </button>
              <button 
                className={`btn btn-xs sm:btn-sm flex-1 gap-1 sm:gap-2 ${theme === "dark" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setTheme("dark")}
              >
                <MdDarkMode className="text-base sm:text-lg" />
                <span className="text-xs sm:text-sm">Dark</span>
              </button>
            </div>
          </div>

          {/* Items Per Page - Input Field */}
          <div className="form-control mb-3 sm:mb-4">
            <label className="label py-1">
              <span className="label-text text-sm sm:text-base font-semibold">Items per page</span>
            </label>
            <input
              type="number"
              min="1"
              max="100"
              className="input input-bordered input-sm sm:input-md w-full text-sm sm:text-base"
              value={tempItemsPerPage}
              onChange={handleItemsPerPageChange}
              placeholder="Enter number (1-100)"
            />
            <label className="label py-1">
              <span className="label-text-alt text-xs text-gray-500">
                Enter a number between 1 and 100
              </span>
            </label>
          </div>

          {/* Favorites Count */}
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-base-200 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
              <MdStar className="text-yellow-500 flex-shrink-0" /> 
              <span>
                You have <strong>{favorites.length}</strong> favorite{favorites.length !== 1 ? 's' : ''}
              </span>
            </p>
          </div>

          {/* Reset Button */}
          <button 
            className="btn btn-error btn-outline btn-xs sm:btn-sm gap-1 sm:gap-2 w-full"
            onClick={resetPreferences}
          >
            <MdRefresh className="text-base sm:text-lg" />
            <span className="text-xs sm:text-sm">Reset All Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;