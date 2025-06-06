import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GlobalHeader from "./GlobalHeader";

describe("GlobalHeader Component", () => {
  test("renders the logo with the correct text", () => {
    render(<GlobalHeader />);

    // Check if the logo and text are rendered
    expect(screen.getByLabelText("Edelman Logo")).toBeInTheDocument();
    expect(screen.getByText("Edelman Article Dashboard")).toBeInTheDocument();
  });

  test("renders desktop menu items correctly", () => {
    render(<GlobalHeader />);

    // Check for all menu items
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Trust")).toBeInTheDocument();
    expect(screen.getByText("Expertise")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Newsroom")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("2025 Trust Barometer")).toBeInTheDocument();
  });

  test("toggles dropdown menu for About", () => {
    render(<GlobalHeader />);

    // Click the About menu
    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    // Check if dropdown items appear
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();

    // Click the About menu again to close
    fireEvent.click(aboutButton);
    expect(screen.queryByText("Line 1")).not.toBeInTheDocument();
  });

  test("toggles dropdown menu for Trust", () => {
    render(<GlobalHeader />);

    // Click the Trust menu
    const trustButton = screen.getByText("Trust");
    fireEvent.click(trustButton);

    // Check if dropdown items appear
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();

    // Click the Trust menu again to close
    fireEvent.click(trustButton);
    expect(screen.queryByText("Line 1")).not.toBeInTheDocument();
  });

  test("toggles dropdown menu for Newsroom", () => {
    render(<GlobalHeader />);

    // Click the Newsroom menu
    const newsroomButton = screen.getByText("Newsroom");
    fireEvent.click(newsroomButton);

    // Check if dropdown items appear
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();

    // Click the Newsroom menu again to close
    fireEvent.click(newsroomButton);
    expect(screen.queryByText("Line 1")).not.toBeInTheDocument();
  });

  test("toggles mobile menu on click", () => {
    render(<GlobalHeader />);

    // Check for mobile menu button
    const mobileMenuButton = screen.getByRole("button", { name: /menu/i });
    expect(mobileMenuButton).toBeInTheDocument();

    // Simulate opening the menu
    fireEvent.click(mobileMenuButton);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    // Simulate closing the menu
    fireEvent.click(mobileMenuButton);
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  test("renders the 2025 Trust Barometer button with correct link", () => {
    render(<GlobalHeader />);

    const trustBarometerButton = screen.getByText("2025 Trust Barometer");
    expect(trustBarometerButton).toBeInTheDocument();
    expect(trustBarometerButton.closest("a")).toHaveAttribute("href", "#");
  });
});