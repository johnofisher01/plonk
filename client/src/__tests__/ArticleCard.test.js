import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticleCard from "./ArticleCard";

describe("ArticleCard Component", () => {
  const mockArticle = {
    id: 1,
    title: "Understanding Trust",
    author: "John Smith",
    content: "This is the content of the article. It explains trust in detail.",
    views: 1345,
    shares: 320,
  };

  const mockOnSummarize = jest.fn();

  test("renders article content correctly", () => {
    render(<ArticleCard article={mockArticle} onSummarize={mockOnSummarize} />);

    // Check if the title is rendered
    expect(screen.getByText("Understanding Trust")).toBeInTheDocument();

    // Check if the author is rendered
    expect(screen.getByText("Author: John Smith")).toBeInTheDocument();

    // Check if the views and shares are rendered
    expect(screen.getByText("Views: 1345 | Shares: 320")).toBeInTheDocument();

    // Check if the content is truncated
    expect(screen.getByText("This is the content of the article. It explains trust in...")).toBeInTheDocument();

    // Check if the button is rendered
    expect(screen.getByRole("button", { name: "Summarise" })).toBeInTheDocument();
  });

  test("calls onSummarize with the correct article ID when the button is clicked", () => {
    render(<ArticleCard article={mockArticle} onSummarize={mockOnSummarize} />);

    const button = screen.getByRole("button", { name: "Summarise" });
    fireEvent.click(button);

    // Check that the mock function is called with the correct ID
    expect(mockOnSummarize).toHaveBeenCalledWith(mockArticle.id);
    expect(mockOnSummarize).toHaveBeenCalledTimes(1);
  });

  test("handles edge case where content is empty", () => {
    const emptyContentArticle = { ...mockArticle, content: "" };
    render(<ArticleCard article={emptyContentArticle} onSummarize={mockOnSummarize} />);

    // Check if the fallback for empty content is rendered
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  test("handles edge case where title is missing", () => {
    const missingTitleArticle = { ...mockArticle, title: "" };
    render(<ArticleCard article={missingTitleArticle} onSummarize={mockOnSummarize} />);

    // Check if the component still renders without the title
    expect(screen.queryByText("Understanding Trust")).not.toBeInTheDocument();
  });

  test("handles edge case where views and shares are zero", () => {
    const zeroMetricsArticle = { ...mockArticle, views: 0, shares: 0 };
    render(<ArticleCard article={zeroMetricsArticle} onSummarize={mockOnSummarize} />);

    // Check if the views and shares are displayed as zero
    expect(screen.getByText("Views: 0 | Shares: 0")).toBeInTheDocument();
  });

  test("applies correct styles and hover effects", () => {
    render(<ArticleCard article={mockArticle} onSummarize={mockOnSummarize} />);

    const card = screen.getByText("Understanding Trust").closest("div");
    expect(card).toHaveClass("bg-white", "shadow-2xl", "rounded-lg");
    expect(card).toHaveStyle({ transition: "all 0.3s" });

    // Simulate hover state (you might need to test this visually with Storybook or manually)
    // Note: Testing CSS styles dynamically is limited in Jest; hover effects are typically tested visually.
  });
});