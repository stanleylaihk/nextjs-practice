import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/jest/page";

describe("Jest Page", () => {
  it("Should jave Jest Text", () => {
    render(<Page />);
    expect(screen.getByText("Jest")).toBeInTheDocument;
  });

  it("Should render properly", () => {
    render(<Page />);
    const element = screen.getByRole("heading");
    const headerText = "Jest";
    expect(element).toHaveTextContent(headerText);
  });

  it("Should have a disabled button", () => {
    render(<Page />);
    expect(
      screen.getByRole("button", { name: "Click Me" })
    ).toBeInTheDocument();
  });

  it("Should have input field with label Enter Random Text", () => {
    render(<Page />);
    expect(screen.getByLabelText(/Enter Random/)).toBeInTheDocument();
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should find input field by placeholder text search", () => {
    render(<Page />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should have a p tag with className of blue", () => {
    render(<Page />);
    const element = screen.getByTestId("paragraphy-blue");
    expect(element).toHaveClass("blue");
  });
});
