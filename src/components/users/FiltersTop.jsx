import { MdFilterList } from "react-icons/md";
import FilterDropdown from "./FilterDropdown";
import SearchBar from "../../components/SearchBar";

const FiltersTop = ({
  query,
  setQuery,
  genderFilter,
  setGenderFilter,
  sortKey,
  setSortKey,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  clearFilters,
  filteredAndSortedUsers,
  totalUsers
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
      {/* Filters */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search users..."
        className="ml-2 hidden lg:block"
      />

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender:</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Sort by:</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="age">Age</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div className="form-control">
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-outline btn-sm gap-2">
              <MdFilterList className="text-lg" />
              <span className="hidden sm:inline">Filter Options</span>
              <span className="sm:hidden">Filters</span>
            </label>

            {/* dropdown content comes from FilterDropdown component */}
            <FilterDropdown
              minAge={minAge}
              setMinAge={setMinAge}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              clearFilters={clearFilters}
              filteredAndSortedUsers={filteredAndSortedUsers}
              totalUsers={totalUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersTop;
