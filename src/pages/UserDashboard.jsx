import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

const UserDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("firstName");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const url = query
          ? `https://dummyjson.com/users/search?q=${query}`
          : `https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`;
        
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
  }, [query, page]);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortKey === "age") return a.age - b.age;
    return a[sortKey]?.localeCompare(b[sortKey]) || 0;
  });

  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <Layout 
      query={query}
      setQuery={setQuery}
      sortKey={sortKey}
      setSortKey={setSortKey}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      totalResults={totalUsers}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Users List</h1>
            <p className="text-sm opacity-70">Manage your users</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline">📥 Import</button>
            <button className="btn btn-outline">📤 Export</button>
            <button className="btn btn-primary">➕ Add User</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status:</span>
            </label>
            <select 
              className="select select-bordered w-full max-w-xs"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
            <label className="label">
              <span className="label-text">Results:</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm">📊 {limit} users</span>
              <span className="text-sm opacity-70">• 📅 {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-base-100 rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" className="checkbox" />
                  </th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Status</th>
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
                ) : (
                  sortedUsers.map((user) => (
                    <tr key={user.id} className="hover">
                      <th>
                        <input type="checkbox" className="checkbox" />
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img 
                                src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
                                alt={`${user.firstName} ${user.lastName}`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.firstName} {user.lastName}</div>
                            <div className="text-sm opacity-50">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">{user.email}</div>
                        <div className="text-sm opacity-50">{user.phone}</div>
                      </td>
                      <td>
                        <span className="badge badge-ghost">{user.age}</span>
                      </td>
                      <td>
                        <span className={`badge ${Math.random() > 0.5 ? 'badge-success' : 'badge-warning'}`}>
                          {Math.random() > 0.5 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-xs">⋮</label>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>👁️ View</a></li>
                            <li><a>✏️ Edit</a></li>
                            <li><a>🗑️ Delete</a></li>
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
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm opacity-70">
              Result 1-{Math.min(page * limit, totalUsers)} of {totalUsers}
            </div>
            <div className="join">
              <button 
                className="join-item btn btn-sm"
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                « Previous
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`join-item btn btn-sm ${page === pageNum ? 'btn-active' : ''}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="join-item btn btn-sm"
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next »
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;