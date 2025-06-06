import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";
import * as api from "../services/api";

jest.mock("../services/api"); // Mock the API module

describe("Dashboard Component", () => {
  const mockArticles = [
    { id: 1, title: "Article One", author: "Author One", content: "Content One", views: 100, shares: 10 },
    { id: 2, title: "Article Two", author: "Author Two", content: "Content Two", views: 200, shares: 20 },
  ];

  const mockHighlights = {
    mostViewed: { title: "Most Viewed Article", author: "Author Most Viewed", views: 500, shares: 50 },
    mostShared: { title: "Most Shared Article", author: "Author Most Shared", views: 400, shares: 60 },
  };

  const mockSummary = "This is a summary of the article.";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component and its child components", async () => {
    api.fetchArticles.mockResolvedValue({ data: mockArticles });
    api.fetchHighlights.mockResolvedValue(mockHighlights);

    render(<Dashboard />);

    // Wait for articles to load
    await waitFor(() => expect(api.fetchArticles).toHaveBeenCalledTimes(1));

    // Check for child components
    expect(screen.getByText("Most Viewed Article")).toBeInTheDocument();
    expect(screen.getByText("Most Shared Article")).toBeInTheDocument();
    expect(screen.getByText("Article One")).toBeInTheDocument();
    expect(screen.getByText("Article Two")).toBeInTheDocument();
    expect(screen.getByText("SIGN UP")).toBeInTheDocument();
  });

  test("handles filtering and sorting", async () => {
    api.fetchArticles.mockResolvedValue({ data: mockArticles });
    api.fetchHighlights.mockResolvedValue(mockHighlights);

    render(<Dashboard />);

    // Wait for articles to load
    await waitFor(() => expect(api.fetchArticles).toHaveBeenCalledTimes(1));

    const filterInput = screen.getByLabelText("Filter by Author");
    fireEvent.change(filterInput, { target: { value: "Author One" } });

    // Check that the API is called with the updated filters
    await waitFor(() =>
      expect(api.fetchArticles).toHaveBeenCalledWith(expect.objectContaining({ author: "Author One" }))
    );
  });

  test("handles pagination", async () => {
    api.fetchArticles.mockResolvedValue({ data: mockArticles });
    api.fetchHighlights.mockResolvedValue(mockHighlights);

    render(<Dashboard />);

    // Wait for articles to load
    await waitFor(() => expect(api.fetchArticles).toHaveBeenCalledTimes(1));

    const nextPageButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(nextPageButton);

    // Check that the API is called with the updated page
    await waitFor(() =>
      expect(api.fetchArticles).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }))
    );
  });

  test("handles summarizing an article", async () => {
    api.fetchArticles.mockResolvedValue({ data: mockArticles });
    api.fetchHighlights.mockResolvedValue(mockHighlights);
    api.fetchSummary.mockResolvedValue(mockSummary);

    render(<Dashboard />);

    // Wait for articles to load
    await waitFor(() => expect(api.fetchArticles).toHaveBeenCalledTimes(1));

    const summarizeButton = screen.getByRole("button", { name: "Summarise" });
    fireEvent.click(summarizeButton);

    // Check that the summary API is called
    await waitFor(() => expect(api.fetchSummary).toHaveBeenCalledWith(1));

    // Check that the modal is displayed with the summary
    expect(screen.getByText("This is a summary of the article.")).toBeInTheDocument();
  });

  test("displays fallback content for empty highlights", async () => {
    api.fetchArticles.mockResolvedValue({ data: [] });
    api.fetchHighlights.mockResolvedValue({ mostViewed: null, mostShared: null });

    render(<Dashboard />);

    // Wait for highlights to load
    await waitFor(() => expect(api.fetchHighlights).toHaveBeenCalledTimes(1));

    // Check for fallback highlights content
    expect(screen.getByText("No article available")).toBeInTheDocument();
  });
});