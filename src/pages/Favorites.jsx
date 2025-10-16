import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { PreferencesContext } from "../context/PreferencesContext";
import { MdStar, MdStarBorder } from "react-icons/md";

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useContext(PreferencesContext);

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Favorite Users</h1>
          <p className="text-sm opacity-70">
            You have {favorites.length} favorite user{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-base-100 rounded-lg shadow p-12 text-center">
            <MdStarBorder className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No Favorites Yet</h2>
            <p className="text-gray-500 mb-6">
              Start adding users to your favorites by clicking the star icon
            </p>
            <Link to="/users" className="btn btn-primary">
              Browse Users
            </Link>
          </div>
        ) : (
          <div className="bg-base-100 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Favorite</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map((user) => (
                    <tr key={user.id} className="hover">
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
                              <div className="font-bold">{user.firstName} {user.lastName}</div>
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
                        <span className={`badge ${user.gender === 'male' ? 'badge-info' : 'badge-secondary'}`}>
                          {user.gender}
                        </span>
                      </td>
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
                        <Link to={`/users/${user.id}`} className="btn btn-sm btn-outline">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;