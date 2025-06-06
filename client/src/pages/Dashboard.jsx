import React, { useState, useEffect } from "react";
import Highlights from "../components/Highlights";
import FilterSortBar from "../components/FilterSortBar";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";
import SummaryModal from "../components/SummaryModal";
import { fetchArticles, fetchHighlights, fetchSummary } from "../services/api";

const ITEMS_PER_PAGE = 9;

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [highlights, setHighlights] = useState({
    mostViewed: null,
    mostShared: null,
  });
  const [filters, setFilters] = useState({
    author: "",
    sort: "",
    sortDirection: "desc",
  });
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchArticles({
      page,
      limit: ITEMS_PER_PAGE,
      author: filters.author,
      sort: filters.sort,
      sortDirection: filters.sortDirection,
    })
      .then((res) => {
        setArticles(res.data || []);
        setTotalRows(res.total || 0);
      })
      .catch(() => {
        setArticles([]);
        setTotalRows(0);
      });
  }, [page, filters]);

  useEffect(() => {
    fetchHighlights()
      .then((res) =>
        setHighlights({
          mostViewed: res.mostViewed || null,
          mostShared: res.mostShared || null,
        })
      )
      .catch(() =>
        setHighlights({ mostViewed: null, mostShared: null })
      );
  }, [filters.author]);

  const handleSummarize = async (id) => {
    const data = await fetchSummary(id);
    setSummary(data);
    setModalOpen(true);
  };

  const handleSetFilters = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
  };

  return (
    <div className="bg-gradient-to-br from-brandLightTeal to-brandTeal text-white min-h-screen flex flex-col items-center">
      <div
        className="hero bg-cover bg-center w-full"
        style={{
          backgroundImage:
            "url(//edelmancom.cachefly.net/sites/g/files/aatuss191/files/styles/global_hero_bg_original/public/2025-03/ETB2025_HealthTrust_MEDIUMBackground.png?itok=Ldl26xRL)",
        }}
      >
        <div className="wrapper max-w-7xl mx-auto px-4">
          <div className="hero-content text-center py-12">
            <div>
              <img
                src="https://edelmancom.cachefly.net/sites/g/files/aatuss191/files/2025-03/ETB%20Title%202a.png"
                alt="2025 Edelman Trust Barometer"
                className="mx-auto"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-xl font-bold">
              <strong>Special Report: Trust and Health</strong>
            </p>
            <p className="text-lg font-medium">
              Sign up to get the report in April
            </p>
            <p className="mt-6">
              <a
                className="main-button bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800"
                href="https://share.hsforms.com/1KEsxrUphTg6L7QQt_rlvMg9g8d"
                target="_blank"
                rel="noopener noreferrer"
              >
                SIGN UP
              </a>
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Highlights
          mostViewed={highlights.mostViewed}
          mostShared={highlights.mostShared}
        />
        <FilterSortBar
          filters={filters}
          setFilters={handleSetFilters}
        />
        <div className="bg-white rounded-lg shadow p-6">
          <ArticleList
            articles={articles}
            onSummarize={handleSummarize}
          />
        </div>
        {totalRows > ITEMS_PER_PAGE && (
          <Pagination
            total={totalRows}
            page={page}
            onPageChange={setPage}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
        <SummaryModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          summary={summary}
        />
      </main>
    </div>
  );
};

export default Dashboard;
