import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the correct number of pages based on total items", () => {
    render(<Pagination total={50} page={1} onPageChange={mockOnPageChange} />);

    // Check that the pagination component renders 5 pages (50 items / 10 items per page)
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("renders the correct active page", () => {
    render(<Pagination total={50} page={3} onPageChange={mockOnPageChange} />);

    // Check that the third page is marked as active
    const activePage = screen.getByRole("button", { name: "3" });
    expect(activePage).toHaveAttribute("aria-current", "true");
  });

  test("calls onPageChange with the correct value when a page is clicked", () => {
    render(<Pagination total={50} page={1} onPageChange={mockOnPageChange} />);

    // Simulate clicking on the second page
    const pageTwoButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(pageTwoButton);

    // Check that the onPageChange function is called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("disables navigation for invalid pages", () => {
    render(<Pagination total={10} page={1} onPageChange={mockOnPageChange} />);

    // Check that the "Previous" button is disabled on the first page
    const previousButton = screen.getByLabelText("Go to previous page");
    expect(previousButton).toBeDisabled();

    // Simulate navigating to the last page
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    // Render again with the last page active
    render(<Pagination total={10} page={1} onPageChange={mockOnPageChange} />);
    expect(nextButton).toBeDisabled();
  });

  test("handles edge case with zero total items", () => {
    render(<Pagination total={0} page={1} onPageChange={mockOnPageChange} />);

    // Check that no page buttons are rendered
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("handles edge case with exactly one page of items", () => {
    render(<Pagination total={10} page={1} onPageChange={mockOnPageChange} />);

    // Check that only one page is rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});