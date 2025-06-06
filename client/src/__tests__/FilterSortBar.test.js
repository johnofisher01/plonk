import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterSortBar from "./FilterSortBar";

describe("FilterSortBar Component", () => {
  let filters, setFiltersMock;

  beforeEach(() => {
    filters = {
      author: "",
      sort: "",
      sortDirection: "",
    };
    setFiltersMock = jest.fn();
  });

  test("renders the component with all inputs and buttons", () => {
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    // Check for "Filter by Author" input
    expect(screen.getByLabelText("Filter by Author")).toBeInTheDocument();

    // Check for "Sort By" dropdown
    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();

    // Check that sort direction buttons are not visible initially
    expect(screen.queryByText("Ascending")).not.toBeInTheDocument();
    expect(screen.queryByText("Descending")).not.toBeInTheDocument();
  });

  test("handles author filter change", () => {
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    const authorInput = screen.getByLabelText("Filter by Author");
    fireEvent.change(authorInput, { target: { value: "John Doe" } });

    // Check that setFilters is called with the updated author value
    expect(setFiltersMock).toHaveBeenCalledWith({ ...filters, author: "John Doe" });
  });

  test("handles sort selection change", () => {
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    const sortDropdown = screen.getByLabelText("Sort By");
    fireEvent.change(sortDropdown, { target: { value: "views" } });

    // Check that setFilters is called with the updated sort value
    expect(setFiltersMock).toHaveBeenCalledWith({ ...filters, sort: "views" });
  });

  test("renders sort direction buttons when sort option is selected", () => {
    filters.sort = "views";
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    // Check for Ascending and Descending buttons
    expect(screen.getByText("Ascending")).toBeInTheDocument();
    expect(screen.getByText("Descending")).toBeInTheDocument();
  });

  test("handles sort direction change to ascending", () => {
    filters.sort = "views";
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    const ascButton = screen.getByText("Ascending");
    fireEvent.click(ascButton);

    // Check that setFilters is called with the updated sortDirection
    expect(setFiltersMock).toHaveBeenCalledWith({ ...filters, sortDirection: "asc" });
  });

  test("handles sort direction change to descending", () => {
    filters.sort = "views";
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    const descButton = screen.getByText("Descending");
    fireEvent.click(descButton);

    // Check that setFilters is called with the updated sortDirection
    expect(setFiltersMock).toHaveBeenCalledWith({ ...filters, sortDirection: "desc" });
  });

  test("applies active styles to the sort direction button based on selected direction", () => {
    filters.sort = "views";
    filters.sortDirection = "asc";
    render(<FilterSortBar filters={filters} setFilters={setFiltersMock} />);

    const ascButton = screen.getByText("Ascending");
    const descButton = screen.getByText("Descending");

    // Check active styles for ascending
    expect(ascButton).toHaveClass("bg-blue-600 text-white");
    expect(descButton).toHaveClass("bg-gray-100 text-gray-700 hover:bg-gray-200");
  });

  test("handles edge case when no filters are provided", () => {
    render(<FilterSortBar filters={{}} setFilters={setFiltersMock} />);

    // Check that inputs and dropdown are still rendered
    expect(screen.getByLabelText("Filter by Author")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();
  });
});