import React from "react";

const Highlights = ({ mostViewed, mostShared }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Most Viewed Article */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-700 flex items-center">
            <span className="mr-2">🌟</span>
            Most Viewed Article
          </h2>
          {mostViewed ? (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {mostViewed.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Author:</strong> {mostViewed.author}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {mostViewed.content?.slice(0, 100) || "No content available"}...
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Views:</strong> {mostViewed.views} | <strong>Shares:</strong>{" "}
                {mostViewed.shares}
              </p>
            </>
          ) : (
            <p className="text-gray-600 mt-4">No article available</p>
          )}
        </div>
      </div>

      {/* Most Shared Article */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 shadow-lg rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-green-700 flex items-center">
            <span className="mr-2">🚀</span>
            Most Shared Article
          </h2>
          {mostShared ? (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {mostShared.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Author:</strong> {mostShared.author}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {mostShared.content?.slice(0, 100) || "No content available"}...
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Views:</strong> {mostShared.views} | <strong>Shares:</strong>{" "}
                {mostShared.shares}
              </p>
            </>
          ) : (
            <p className="text-gray-600 mt-4">No article available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlights;