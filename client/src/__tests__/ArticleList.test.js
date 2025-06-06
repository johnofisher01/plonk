import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticleList from "./ArticleList";

describe("ArticleList Component", () => {
  const mockArticles = [
    {
      id: 1,
      title: "Understanding Trust",
      author: "John Smith",
      content: "This is the content of the article. It explains trust in detail.",
      views: 1345,
      shares: 320,
    },
    {
      id: 2,
      title: "Building Credibility",
      author: "Jane Doe",
      content: "This article discusses how to build credibility in various fields.",
      views: 1200,
      shares: 200,
    },
  ];

  const mockOnSummarize = jest.fn();

  test("renders 'No articles available.' when articles array is empty", () => {
    render(<ArticleList articles={[]} onSummarize={mockOnSummarize} />);

    // Check if the no-articles message is displayed
    expect(screen.getByText("No articles available.")).toBeInTheDocument();
  });

  test("renders 'No articles available.' when articles is not an array", () => {
    render(<ArticleList articles={null} onSummarize={mockOnSummarize} />);

    // Check if the no-articles message is displayed
    expect(screen.getByText("No articles available.")).toBeInTheDocument();
  });

  test("renders a list of ArticleCard components when articles are provided", () => {
    render(<ArticleList articles={mockArticles} onSummarize={mockOnSummarize} />);

    // Check that the correct number of ArticleCard components are rendered
    expect(screen.getByText("Understanding Trust")).toBeInTheDocument();
    expect(screen.getByText("Building Credibility")).toBeInTheDocument();

    // Verify the number of rendered article cards matches the length of mockArticles
    const articleCards = screen.getAllByRole("heading", { level: 3 });
    expect(articleCards).toHaveLength(mockArticles.length);
  });

  test("passes the correct props to ArticleCard components", () => {
    render(<ArticleList articles={mockArticles} onSummarize={mockOnSummarize} />);

    // Check if the onSummarize function is passed down correctly
    const firstArticleButton = screen.getByRole("button", { name: "Summarise" });
    expect(firstArticleButton).toBeInTheDocument();
  });

  test("handles edge case with one article", () => {
    const singleArticle = [mockArticles[0]];
    render(<ArticleList articles={singleArticle} onSummarize={mockOnSummarize} />);

    // Check if the single article is rendered correctly
    expect(screen.getByText("Understanding Trust")).toBeInTheDocument();
    expect(screen.queryByText("Building Credibility")).not.toBeInTheDocument();
  });
});