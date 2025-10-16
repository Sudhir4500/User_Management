import { MdArrowBack } from "react-icons/md";

const UserBackButton = ({ onClick }) => (
  <div className="mb-6">
    <button className="btn btn-ghost gap-2 hover:bg-gray-100" onClick={onClick}>
      <MdArrowBack className="text-xl" />
      Back to List
    </button>
  </div>
);

export default UserBackButton;
