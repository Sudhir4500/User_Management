import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { PreferencesContext } from "../context/PreferencesContext";

import UserBackButton from "../components/userDetails/UserBackButton";
import UserHeader from "../components/userDetails/UserHeader";
import UserWorkSection from "../components/userDetails/UserWorkSection";
import UserTabs from "../components/userDetails/UserTabs";
import UserAboutTab from "../components/userDetails/UserAboutTab";
import UserTimelineTab from "../components/userDetails/UserTimelineTab";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const { toggleFavorite, isFavorite } = useContext(PreferencesContext);

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

  const userIsFavorite = isFavorite(user?.id);

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <UserBackButton onClick={() => navigate("/users")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-auto object-cover"
              />
            </div>

            <UserWorkSection user={user} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-lg shadow-sm">
              <UserHeader
                user={user}
                userIsFavorite={userIsFavorite}
                toggleFavorite={toggleFavorite}
              />

              <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "about" ? (
                <UserAboutTab user={user} />
              ) : (
                <UserTimelineTab />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetail;
