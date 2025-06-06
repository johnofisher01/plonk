import React, { useState } from "react";

const GlobalHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ about: false, trust: false, newsroom: false });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="https://www.edelman.com/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 347 140.6"
            className="h-6 w-auto"
            aria-label="Edelman Logo"
          >
            <style>{`.cls-blue { fill: #3b82f6; }`}</style>
            <g id="Layer_1-2">
              <polygon className="cls-blue" points="140.7 71.3 71.4 71.3 71.4 140.6 140.7 71.3"></polygon>
              <polygon className="cls-blue" points="69.3 140.6 69.3 71.3 0 71.3 69.3 140.6"></polygon>
              <polygon className="cls-blue" points="71.4 0 71.4 69.3 140.7 69.3 71.4 0"></polygon>
            </g>
          </svg>
          <span className="ml-2 text-lg font-bold text-blue-600">Edelman Article Dashboard</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <div className="relative">
            <button
              onClick={() => toggleDropdown("about")}
              className="hover:text-blue-500 text-sm font-medium uppercase"
            >
              About <span className="text-xs">{dropdownOpen.about ? "v" : "^"}</span>
            </button>
            {dropdownOpen.about && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 3
                </a>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("trust")}
              className="hover:text-blue-500 text-sm font-medium uppercase"
            >
              Trust <span className="text-xs">{dropdownOpen.trust ? "v" : "^"}</span>
            </button>
            {dropdownOpen.trust && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 3
                </a>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-blue-500 text-sm font-medium uppercase">
            Expertise
          </a>
          <a href="#" className="hover:text-blue-500 text-sm font-medium uppercase">
            Work
          </a>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("newsroom")}
              className="hover:text-blue-500 text-sm font-medium uppercase"
            >
              Newsroom <span className="text-xs">{dropdownOpen.newsroom ? "v" : "^"}</span>
            </button>
            {dropdownOpen.newsroom && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Line 3
                </a>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-blue-500 text-sm font-medium uppercase">
            Contact
          </a>

          <a
            href="#"
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-700"
          >
            2025 Trust Barometer
          </a>
          <button className="hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11 3a7 7 0 107 7 7 7 0 00-7-7zM2 10a8 8 0 1115.9 2.6l4.3 4.3a1 1 0 01-1.4 1.4l-4.3-4.3A8 8 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default GlobalHeader;