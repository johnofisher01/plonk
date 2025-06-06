import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles, onSummarize }) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return <p className="text-gray-600 text-center">No articles available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} onSummarize={onSummarize} />
      ))}
    </div>
  );
};

export default ArticleList;