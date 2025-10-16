import { MdSearch } from "react-icons/md";

const SearchBar = ({ 
  query, 
  setQuery, 
  placeholder = "Search",
  className = ""
}) => {
  return (
    <div className={`form-control ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered pr-10 w-48 lg:w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 z-10 pointer-events-none" />
      </div>
    </div>
  );
};

export default SearchBar;