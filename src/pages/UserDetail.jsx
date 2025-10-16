import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { 
  MdArrowBack, 
  MdLocationOn,
  MdMessage,
  MdCheck,
  MdAccessTime,
  MdPerson,
  MdStar,
  MdStarBorder
} from "react-icons/md";
import { PreferencesContext } from "../context/PreferencesContext";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const {toggleFavorite,isFavorite} = useContext(PreferencesContext);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Layout>
    );
  }

  const userIsFavorite = isFavorite(user?.id);

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-xl text-gray-500">User not found</p>
          <button className="btn btn-primary" onClick={() => navigate("/users")}>
            Back to List
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button 
            className="btn btn-ghost gap-2 hover:bg-gray-100"
            onClick={() => navigate("/users")}
          >
            <MdArrowBack className="text-xl" />
            Back to List
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image and Work Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Image Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={user.image} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Work Section */}
            <div className="bg-base-200 rounded-lg shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                WORK
              </h3>
              
              {/* Primary Work */}
              <div className="mb-4 pb-4 border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-base-content">{user.company?.name || "Spotify New York"}</h4>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">Primary</span>
                </div>
                <p className="text-sm text-gray-600">{user.address?.address || "170 William Street"}</p>
                <p className="text-sm text-gray-500">
                  {user.address?.city}, {user.address?.state} {user.address?.postalCode}
                </p>
              </div>

              {/* Secondary Work */}
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-base-content">Metropolitan Museum</h4>
                  <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">Secondary</span>
                </div>
                <p className="text-sm text-gray-600">{user.address?.address}</p>
                <p className="text-sm text-gray-500">{user.address?.city}, {user.address?.state} {user.address?.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Main Card */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-lg shadow-sm">
              {/* Header Section */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-3xl font-bold text-base-content">
                        {user.firstName} {user.lastName}
                      </h1>
                      <div className="flex items-center text-gray-500">
                        <MdLocationOn className="text-lg" />
                        <span className="text-sm">{user.address?.city}, {user.address?.state}</span>
                      </div>
                    </div>
                    <p className="text-blue-500 font-medium mb-6">
                      {user.company?.title || "Product Designer"}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-5 py-2.5 text-black rounded-md font-medium">
                        <MdMessage className="text-lg" />
                        Send message
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 font-medium">
                        <MdCheck className="text-lg" />
                        Contacts
                      </button>
                      <button className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-md">
                        Report user
                      </button>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <div className="flex flex-col items-center gap-1">
                    <button 
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                      onClick={() => toggleFavorite(user)}
                    >
                      {userIsFavorite ? (
                        <MdStar className="text-2xl text-yellow-500" />
                      ) : (
                        <MdStarBorder className="text-2xl" />
                      )}
                    </button>
                    <span className="text-xs text-gray-400">
                      {userIsFavorite ? "Favorited" : "Favorite"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-b">
                <div className="flex px-6">
                  <button 
                    className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                      activeTab === "timeline" 
                        ? "border-gray-800 text-base-content font-medium" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("timeline")}
                  >
                    <MdAccessTime className="text-lg" />
                    Timeline
                  </button>
                  <button 
                    className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                      activeTab === "about" 
                        ? "border-gray-800 text-base-content font-medium" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("about")}
                  >
                    <MdPerson className="text-lg" />
                    About
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "about" && (
                <div className="p-6">
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      CONTACT INFORMATION
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone:</p>
                        <p className="text-blue-500 font-medium">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Address:</p>
                        <p className="text-base-content">
                          {user.address?.address}
                          <br />
                          {user.address?.city}, {user.address?.state} {user.address?.postalCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">E-mail:</p>
                        <p className="text-blue-500 font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Site:</p>
                        <p className="text-blue-500 font-medium">www.{user.username}.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      BASIC INFORMATION
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Birthday:</p>
                        <p className="text-base-content font-medium">{user.birthDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Gender:</p>
                        <p className="text-base-content font-medium capitalize">{user.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="p-6">
                  <p className="text-gray-500 text-center py-12">No timeline data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetail;