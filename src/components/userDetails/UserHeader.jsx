import {
  MdLocationOn,
  MdMessage,
  MdCheck,
  MdStar,
  MdStarBorder,
} from "react-icons/md";

const UserHeader = ({ user, userIsFavorite, toggleFavorite }) => (
  <div className="p-6 pb-4">
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-3xl font-bold text-base-content">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex items-center text-gray-500">
            <MdLocationOn className="text-lg" />
            <span className="text-sm">
              {user.address?.city}, {user.address?.state}
            </span>
          </div>
        </div>
        <p className="text-blue-500 font-medium mb-6">
          {user.company?.title || "Product Designer"}
        </p>

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
);

export default UserHeader;
