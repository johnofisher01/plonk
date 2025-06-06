import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  test("renders the home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Check for elements from the homepage
    expect(screen.getByText("Welcome to Edelman Article Dashboard")).toBeInTheDocument();
  });

  test("renders the Dashboard page when navigating to /dashboard", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    // Check for elements from the Dashboard
    expect(screen.getByText("Dashboard Overview")).toBeInTheDocument();
  });

  test("renders a 404 page for an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );

    // Check for 404 message
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });
});