import React from "react";

const ArticleCard = ({ article, onSummarize }) => {
  return (
    <div className="bg-white border border-gray-300 shadow-2xl rounded-lg p-6 flex flex-col justify-between hover:shadow-3xl hover:scale-105 transition-all duration-300">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Author:</strong> {article.author}
        </p>
        <p className="text-sm text-gray-600 mt-4">
          {article.content.slice(0, 100)}...
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <strong>Views:</strong> {article.views} | <strong>Shares:</strong> {article.shares}
        </p>
      </div>
      <button
        onClick={() => onSummarize(article.id)}
        className="mt-6 bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-colors duration-300"
      >
        Summarise
      </button>
    </div>
  );
};

export default ArticleCard;