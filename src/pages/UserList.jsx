// src/pages/UserList.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { PreferencesContext } from "../context/PreferencesContext";
import { FiltersTop, UsersTable, Pagination } from "../components/users";


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

        {/* extracted top filters */}
        <FiltersTop
          query={query}
          setQuery={setQuery}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          sortKey={sortKey}
          setSortKey={setSortKey}
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
          clearFilters={clearFilters}
          filteredAndSortedUsers={filteredAndSortedUsers}
          totalUsers={totalUsers}
        />

        {/* Users Table */}
        <UsersTable
          filteredAndSortedUsers={filteredAndSortedUsers}
          loading={loading}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalUsers={totalUsers}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Layout>
  );
};

export default UserList;
