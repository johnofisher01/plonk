import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryModal from "./SummaryModal";

describe("SummaryModal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal when 'open' is true", () => {
    render(<SummaryModal open={true} onClose={mockOnClose} summary="This is a test summary." />);

    // Check if the modal content is visible
    expect(screen.getByText("Article Summary")).toBeInTheDocument();
    expect(screen.getByText("This is a test summary.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("does not render the modal when 'open' is false", () => {
    render(<SummaryModal open={false} onClose={mockOnClose} summary="This is a test summary." />);

    // Check that the modal content is not visible
    expect(screen.queryByText("Article Summary")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a test summary.")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  test("renders fallback text when 'summary' is not provided", () => {
    render(<SummaryModal open={true} onClose={mockOnClose} summary={null} />);

    // Check for fallback text
    expect(screen.getByText("No summary available.")).toBeInTheDocument();
  });

  test("calls 'onClose' when the Close button is clicked", () => {
    render(<SummaryModal open={true} onClose={mockOnClose} summary="This is a test summary." />);

    // Click the Close button
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    // Check that the onClose function was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("applies fade-in animation when 'open' is true", () => {
    render(<SummaryModal open={true} onClose={mockOnClose} summary="This is a test summary." />);

    // Check if the modal's fade effect is applied
    const fadeElement = screen.getByText("Article Summary").closest("div");
    expect(fadeElement).toHaveClass("MuiFade-entered");
  });

  test("handles edge case with long summary text", () => {
    const longSummary = "This is a very long summary text that exceeds normal length to test how the modal handles overflow or wrapping issues.";
    render(<SummaryModal open={true} onClose={mockOnClose} summary={longSummary} />);

    // Check if the long summary text is rendered correctly
    expect(screen.getByText(longSummary)).toBeInTheDocument();
  });
});