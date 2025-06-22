
import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const ProductFilters = ({ filters, onFiltersChange }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'Anime', 'Marvel', 'Neon', 'Minimalist', 'Abstract', 'Gaming', 'Nature', 'Artistic'
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: updatedCategories });
  };

  const clearFilters = () => {
    onFiltersChange({ categories: [], sortBy: 'popularity' });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg"
      >
        <Filter size={18} />
        Filters
        {(filters.categories.length > 0 || filters.sortBy !== 'popularity') && (
          <span className="bg-cyber-yellow text-jet-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {filters.categories.length}
          </span>
        )}
      </button>

      {/* Desktop Sidebar & Mobile Overlay */}
      <div className={`
        fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden
        ${isOpen ? 'block' : 'hidden'}
      `} onClick={() => setIsOpen(false)} />
      
      <div className={`
        fixed right-0 top-0 h-full w-80 bg-white z-50 p-6 overflow-y-auto transform transition-transform duration-300 md:transform-none md:static md:w-64 md:p-0 md:bg-transparent
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h3 className="text-lg font-poppins font-semibold">Filters</h3>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-poppins font-medium mb-3">Sort By</h4>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
                  className="w-4 h-4 text-cyber-yellow"
                />
                <span className="ml-2 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-poppins font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-cyber-yellow rounded"
                />
                <span className="ml-2 text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.categories.length > 0 || filters.sortBy !== 'popularity') && (
          <button
            onClick={clearFilters}
            className="w-full text-center text-sm text-light-text hover:text-dark-text transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </>
  );
};

export default ProductFilters;
