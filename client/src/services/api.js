import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Changed to FastAPI port

export const fetchArticles = async (params) => {
  const { data } = await axios.get(`${API_BASE_URL}/articles`, { params });
  return data;
};

export const fetchHighlights = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/articles/highlights`);
  return data;
};

export const fetchSummary = async (articleId) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/articles/${articleId}/summarize`
  );
  return data.summary;
};