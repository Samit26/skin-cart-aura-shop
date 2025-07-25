import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = "Search skins...",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div
          className={`flex items-center transition-all duration-300 ${
            isExpanded ? "w-80" : "w-10"
          } md:w-80`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !query && setIsExpanded(false)}
            placeholder={placeholder}
            className={`w-full h-10 pl-10 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 ${
              !isExpanded ? "opacity-0 md:opacity-100" : "opacity-100"
            }`}
          />
          <button
            type="submit"
            className="absolute left-3 p-1 text-gray-500 hover:text-gray-700"
          >
            <Search size={18} />
          </button>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
