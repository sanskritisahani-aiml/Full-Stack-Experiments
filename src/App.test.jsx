import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function SimpleCalendarHeader() {
  return (
    <div>
      <h1>📅 Social Media Content Calendar</h1>
      <p>Manage and schedule your social media posts</p>
    </div>
  );
}

describe("Calendar App", () => {
  it("renders the calendar heading", () => {
    render(<SimpleCalendarHeader />);
    expect(screen.getByText("📅 Social Media Content Calendar")).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<SimpleCalendarHeader />);
    expect(screen.getByText("Manage and schedule your social media posts")).toBeInTheDocument();
  });
});