
const FilterDropdown = ({
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  genderFilter,
  setGenderFilter,
  clearFilters,
  filteredAndSortedUsers,
  totalUsers
}) => {
  return (
    <div
      tabIndex={0}
      className="dropdown-content z-[999] card card-compact w-80 shadow-lg bg-base-100 rounded-box left-[20px] sm:left-auto"
    >
      <div className="card-body p-3 sm:p-4 ">
        <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Filters</h3>

        {/* Gender Filter */}
        <div className="form-control mb-3 sm:mb-4">
          <label className="label py-1">
            <span className="label-text text-sm font-semibold">Gender</span>
          </label>
          <div className="flex gap-2">
            <button
              className={`btn btn-xs sm:btn-sm flex-1 text-xs sm:text-sm ${
                genderFilter === "all" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setGenderFilter("all")}
            >
              All
            </button>
            <button
              className={`btn btn-xs sm:btn-sm flex-1 text-xs sm:text-sm ${
                genderFilter === "male" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setGenderFilter("male")}
            >
              Male
            </button>
            <button
              className={`btn btn-xs sm:btn-sm flex-1 text-xs sm:text-sm ${
                genderFilter === "female" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setGenderFilter("female")}
            >
              Female
            </button>
          </div>
        </div>
        {/* Age Filter */}
        <div className="form-control mb-3 sm:mb-4">
          <label className="label py-1">
            <span className="label-text text-sm font-semibold">Age Range</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              className="input input-bordered input-xs sm:input-sm w-full text-xs sm:text-sm"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              min="0"
              max="120"
            />
            <span className="text-xs">-</span>
            <input
              type="number"
              placeholder="Max"
              className="input input-bordered input-xs sm:input-sm w-full text-xs sm:text-sm"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              min="0"
              max="120"
            />
          </div>
          <label className="label py-1">
            <span className="label-text-alt text-xs text-gray-500">
              {minAge && maxAge
                ? `Filtering: ${minAge} - ${maxAge} years`
                : minAge
                ? `Minimum: ${minAge} years`
                : maxAge
                ? `Maximum: ${maxAge} years`
                : "Enter age range"}
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <button className="btn btn-sm btn-outline flex-1" onClick={clearFilters}>
            Clear All
          </button>
          <button
            className="btn btn-sm btn-primary flex-1"
            onClick={() => document.activeElement.blur()}
          >
            Apply
          </button>
        </div>
        {/* Results info */}
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedUsers.length} of {totalUsers} users
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
