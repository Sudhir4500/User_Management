import { MdStarBorder, MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

const UsersTable = ({
  filteredAndSortedUsers,
  loading,
  toggleFavorite,
  isFavorite
}) => {
  return (
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
                            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm opacity-50">@{user.username}</div>
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
                    <span className={`badge ${user.gender === "male" ? "badge-info" : "badge-secondary"}`}>
                      {user.gender}
                    </span>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-xs font-bold text-xl">
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
    </div>
  );
};

export default UsersTable;
