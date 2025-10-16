import { MdAccessTime, MdPerson } from "react-icons/md";

const UserTabs = ({ activeTab, setActiveTab }) => (
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
);

export default UserTabs;
