const UserAboutTab = ({ user }) => (
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
          <p className="text-base-content font-medium capitalize">
            {user.gender}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default UserAboutTab;
