import { describe, it, expect, vi } from "vitest";

// Mock API call simulating a backend fetch for events
const fetchEvents = async () => {
  return [
    { id: 1, title: "Mock Event", date: "2026-09-16" },
  ];
};

describe("API Mocking", () => {
  it("fetches mock events", async () => {
    const events = await fetchEvents();
    expect(events).toHaveLength(1);
    expect(events[0].title).toBe("Mock Event");
  });
});