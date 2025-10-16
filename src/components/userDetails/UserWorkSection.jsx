const UserWorkSection = ({ user }) => (
  <div className="bg-base-200 rounded-lg shadow-sm p-6">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
      WORK
    </h3>

    {/* Primary Work */}
    <div className="mb-4 pb-4 border-l-4 border-blue-500 pl-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-base-content">
          {user.company?.name || "Spotify New York"}
        </h4>
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
          Primary
        </span>
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
        <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
          Secondary
        </span>
      </div>
      <p className="text-sm text-gray-600">{user.address?.address}</p>
      <p className="text-sm text-gray-500">
        {user.address?.city}, {user.address?.state} {user.address?.postalCode}
      </p>
    </div>
  </div>
);

export default UserWorkSection;
