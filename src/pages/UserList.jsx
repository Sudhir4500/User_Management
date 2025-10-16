import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { MdFilterList, MdStarBorder, MdStar } from "react-icons/md";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { PreferencesContext } from "../context/PreferencesContext";

const UserList = () => {
  const { itemsPerPage, toggleFavorite, isFavorite } =
    useContext(PreferencesContext);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("firstName");
  const [genderFilter, setGenderFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ageFilter, setAgeFilter] = useState("all");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const url = query
          ? `https://dummyjson.com/users/search?q=${query}`
          : `https://dummyjson.com/users?limit=${itemsPerPage}&skip=${
              (page - 1) * itemsPerPage
            }`;

        const res = await axios.get(url);
        setUsers(res.data.users);
        setTotalUsers(res.data.total);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [query, page, itemsPerPage]);

  // Apply gender filter and sorting
  const filteredAndSortedUsers = users
    .filter((user) => {
      // Gender filter
      if (genderFilter !== "all" && user.gender !== genderFilter) {
        return false;
      }
      // Age filter
      if (minAge && user.age < parseInt(minAge)) {
        return false;
      }
      if (maxAge && user.age > parseInt(maxAge)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortKey === "age") return a.age - b.age;
      return a[sortKey]?.localeCompare(b[sortKey]) || 0;
    });

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const clearFilters = () => {
    setGenderFilter("all");
    setMinAge("");
    setMaxAge("");
    setAgeFilter("all");
    setSortKey("firstName");
  };
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, totalUsers);

  return (
    <Layout
      query={query}
      setQuery={setQuery}
      sortKey={sortKey}
      setSortKey={setSortKey}
      genderFilter={genderFilter}
      setGenderFilter={setGenderFilter}
      totalResults={totalUsers}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Users List</h1>
            <p className="text-sm opacity-70">Manage your users</p>
          </div>
        </div>

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
                  {(genderFilter !== "all" || (minAge || maxAge)) && (
                    <span className="badge badge-sm badge-primary">
                      {[
                        genderFilter !== "all" ? 1 : 0,
                        (minAge || maxAge) ? 1 : 0,
                      ].reduce((a, b) => a + b)}
                    </span>
                  )}
                </label>
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
                            genderFilter === "all"
                              ? "btn-primary"
                              : "btn-outline"
                          }`}
                          onClick={() => setGenderFilter("all")}
                        >
                          All
                        </button>
                        <button
                          className={`btn btn-xs sm:btn-sm flex-1 text-xs sm:text-sm ${
                            genderFilter === "male"
                              ? "btn-primary"
                              : "btn-outline"
                          }`}
                          onClick={() => setGenderFilter("male")}
                        >
                          Male
                        </button>
                        <button
                          className={`btn btn-xs sm:btn-sm flex-1 text-xs sm:text-sm ${
                            genderFilter === "female"
                              ? "btn-primary"
                              : "btn-outline"
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
                        <span className="label-text text-sm font-semibold">
                          Age Range
                        </span>
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
                      <button
                        className="btn btn-sm btn-outline flex-1"
                        onClick={clearFilters}
                      >
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
                        Showing {filteredAndSortedUsers.length} of {totalUsers}{" "}
                        users
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-base-100 rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Favorite</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">
                      <span className="loading loading-spinner loading-md"></span>
                    </td>
                  </tr>
                ) : filteredAndSortedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedUsers.map((user) => (
                    <tr key={user.id} className="hover">
                      {/* this part for to select the favorite */}
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(user);
                          }}
                        >
                          {isFavorite(user.id) ? (
                            <MdStar className="text-yellow-500 text-xl" />
                          ) : (
                            <MdStarBorder className="text-gray-400 text-xl" />
                          )}
                        </button>
                      </td>

                      <td>
                        <Link to={`/users/${user.id}`}>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={user.image}
                                  alt={`${user.firstName} ${user.lastName}`}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm opacity-50">
                                @{user.username}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div className="text-sm">{user.email}</div>
                        <div className="text-sm opacity-50">{user.phone}</div>
                      </td>
                      <td>
                        <span className="badge badge-ghost">{user.age}</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.gender === "male"
                              ? "badge-info"
                              : "badge-secondary"
                          }`}
                        >
                          {user.gender}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-xs font-bold text-xl"
                          >
                            ...
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <Link to={`/users/${user.id}`}>View</Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="grid grid-cols-3 p-4 border-t bg-base-200">
            {/* Left side - Results info */}
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Result {startIndex}-{endIndex} of {totalUsers}
              </span>
            </div>

            {/* Right side - Page navigation */}
            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm btn-ghost text-base-content gap-1"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {/* Always show first page */}
                <button
                  className={`btn btn-sm ${
                    page === 1
                      ? "btn-active bg-base-200 border-2 border-gray-800"
                      : "btn-ghost bg-base-200"
                  }`}
                  onClick={() => setPage(1)}
                >
                  1
                </button>

                {/* Show pages around current page */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((pageNum) => {
                    return (
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      pageNum >= page - 1 &&
                      pageNum <= page + 1
                    );
                  })
                  .map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`btn btn-sm ${
                        page === pageNum
                          ? "btn-active bg-base-200 border-2 border-gray-800"
                          : "btn-ghost bg-base-200"
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}

                {/* Show dots if current page is far from end */}
                {page < totalPages - 2 && (
                  <span className="btn btn-sm btn-ghost bg-base-200 pointer-events-none">
                    ...
                  </span>
                )}

                {/* Always show last page if there's more than 1 page */}
                {totalPages > 1 && (
                  <button
                    className={`btn btn-sm ${
                      page === totalPages
                        ? "btn-active bg-base-200 border-2 border-gray-800"
                        : "btn-ghost bg-base-200"
                    }`}
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button
                className="btn btn-sm btn-ghost text-base-content gap-1"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserList;
