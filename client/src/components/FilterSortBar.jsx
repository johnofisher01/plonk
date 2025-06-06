import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";

const FilterSortBar = ({ filters, setFilters }) => {
  const [authorInput, setAuthorInput] = useState(filters.author || "");

  const commitAuthor = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, author: value.trim() }));
    }, 400),
    [setFilters]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "author") {
      setAuthorInput(value);
      commitAuthor(value);
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSortDir = (dir) =>
    setFilters({ ...filters, sortDirection: dir });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="w-full md:w-1/3">
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by Author
        </label>
        <input
          id="author"
          name="author"
          value={authorInput}
          onChange={handleChange}
          placeholder="Enter author name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full md:w-1/3">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Sort By
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="w-fit border border-gray-300 rounded-lg px-2 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="views">Views</option>
          <option value="shares">Shares</option>
        </select>
      </div>

      {filters.sort && (
        <div className="w-full md:w-1/3 flex justify-center md:justify-start gap-2">
          <button
            onClick={() => handleSortDir("asc")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              filters.sortDirection === "asc"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <BsSortAlphaUp />
            Ascending
          </button>
          <button
            onClick={() => handleSortDir("desc")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              filters.sortDirection === "desc"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <BsSortAlphaDown />
            Descending
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;
