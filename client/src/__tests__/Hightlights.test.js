import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Highlights from "./Highlights";

describe("Highlights Component", () => {
  const mockMostViewed = {
    title: "Understanding Trust",
    author: "John Smith",
    content: "This is the content of the article. It explains trust in detail.",
    views: 1345,
    shares: 320,
  };

  const mockMostShared = {
    title: "Building Credibility",
    author: "Jane Doe",
    content: "This article discusses how to build credibility in various fields.",
    views: 1200,
    shares: 500,
  };

  test("renders the most viewed article correctly", () => {
    render(<Highlights mostViewed={mockMostViewed} mostShared={null} />);

    // Check for the Most Viewed header
    expect(screen.getByText("🌟 Most Viewed Article")).toBeInTheDocument();

    // Check for the article details
    expect(screen.getByText("Understanding Trust")).toBeInTheDocument();
    expect(screen.getByText("Author: John Smith")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is the content of the article. It explains trust in detail..."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Views: 1345 | Shares: 320")).toBeInTheDocument();

    // Ensure Most Shared section displays "No article available"
    expect(screen.getByText("🚀 Most Shared Article")).toBeInTheDocument();
    expect(screen.getByText("No article available")).toBeInTheDocument();
  });

  test("renders the most shared article correctly", () => {
    render(<Highlights mostViewed={null} mostShared={mockMostShared} />);

    // Check for the Most Shared header
    expect(screen.getByText("🚀 Most Shared Article")).toBeInTheDocument();

    // Check for the article details
    expect(screen.getByText("Building Credibility")).toBeInTheDocument();
    expect(screen.getByText("Author: Jane Doe")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This article discusses how to build credibility in various fields..."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Views: 1200 | Shares: 500")).toBeInTheDocument();

    // Ensure Most Viewed section displays "No article available"
    expect(screen.getByText("🌟 Most Viewed Article")).toBeInTheDocument();
    expect(screen.getByText("No article available")).toBeInTheDocument();
  });

  test("renders both articles correctly", () => {
    render(<Highlights mostViewed={mockMostViewed} mostShared={mockMostShared} />);

    // Check for Most Viewed article details
    expect(screen.getByText("🌟 Most Viewed Article")).toBeInTheDocument();
    expect(screen.getByText("Understanding Trust")).toBeInTheDocument();
    expect(screen.getByText("Author: John Smith")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is the content of the article. It explains trust in detail..."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Views: 1345 | Shares: 320")).toBeInTheDocument();

    // Check for Most Shared article details
    expect(screen.getByText("🚀 Most Shared Article")).toBeInTheDocument();
    expect(screen.getByText("Building Credibility")).toBeInTheDocument();
    expect(screen.getByText("Author: Jane Doe")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This article discusses how to build credibility in various fields..."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Views: 1200 | Shares: 500")).toBeInTheDocument();
  });

  test("renders fallback message when both articles are null", () => {
    render(<Highlights mostViewed={null} mostShared={null} />);

    // Ensure Most Viewed section displays "No article available"
    expect(screen.getByText("🌟 Most Viewed Article")).toBeInTheDocument();
    expect(screen.getByText("No article available")).toBeInTheDocument();

    // Ensure Most Shared section displays "No article available"
    expect(screen.getByText("🚀 Most Shared Article")).toBeInTheDocument();
    expect(screen.getByText("No article available")).toBeInTheDocument();
  });

  test("handles edge case where content is missing", () => {
    const mockArticleWithoutContent = {
      title: "Missing Content",
      author: "Unknown Author",
      views: 0,
      shares: 0,
    };
    render(
      <Highlights
        mostViewed={mockArticleWithoutContent}
        mostShared={mockArticleWithoutContent}
      />
    );

    // Check for fallback content message
    expect(screen.getByText("No content available...")).toBeInTheDocument();
  });
});