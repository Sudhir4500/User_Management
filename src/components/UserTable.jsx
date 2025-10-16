// components/UserTable.jsx
import { Link } from "react-router-dom";

const UserTable = ({ users }) => (
  <table className="table w-full">
    <thead>
      <tr>
        <th>User</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Age</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={user.image} alt="avatar" />
                </div>
              </div>
              {user.firstName} {user.lastName}
            </div>
          </td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.age}</td>
          <td>
            <span className="badge badge-success">Active</span>
          </td>
          <td>
            <Link to={`/users/${user.id}`} className="btn btn-sm btn-outline">View</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;