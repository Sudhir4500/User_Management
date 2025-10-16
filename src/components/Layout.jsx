import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children, query, setQuery }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Topbar */}
        <Topbar query={query} setQuery={setQuery} />
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default Layout;