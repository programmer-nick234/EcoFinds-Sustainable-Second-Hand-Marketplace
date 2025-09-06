'use client';

import { Search, Filter, SortAsc, Grid3X3, X } from 'lucide-react';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterClick: () => void;
  onSortClick: () => void;
  onGroupByClick: () => void;
  showFilters: boolean;
}

export default function SearchAndFilters({
  searchTerm,
  onSearchChange,
  onFilterClick,
  onSortClick,
  onGroupByClick,
  showFilters
}: SearchAndFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base bg-white shadow-sm hover:shadow-md transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={onSortClick}
          className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <SortAsc className="h-4 w-4 mr-2" />
          Sort
        </button>
        <button 
          onClick={onFilterClick}
          className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
        <button 
          onClick={onGroupByClick}
          className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          Group by
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="card p-6 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price Range
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm"
                />
                <span className="text-gray-500 font-medium">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Condition
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm">
                <option value="">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Location
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm">
                <option value="">All Locations</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end">
            <button
              onClick={onFilterClick}
              className="text-sm text-gray-600 hover:text-gray-800 hover:underline font-medium transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
