import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";

import { formatDate } from "./format-date";

const Timestamp = {
  Now: "2025-01-15T13:59:49.570Z",
  NotCurrentWeek: "2025-01-01T13:59:49.570Z",
  CurrentWeek: "2025-01-13T13:59:49.570Z",
  CurrentDay: "2025-01-15T12:59:49.570Z",
  LessThanMinuteAgo: "2025-01-15T13:59:48.570Z",
  InOneMinute: "2025-01-15T14:00:49.570Z",
};

describe("formatDate", () => {
  beforeAll(() => {
    const mockDate = new Date(Timestamp.Now);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return date in the default format if it's not a current week", () => {
    const date = new Date(Timestamp.NotCurrentWeek).toISOString();

    const result = formatDate(date);

    expect(result).toBe("01 Jan 25, 13:59");
  });

  it("should return week day and time if it's a current week", () => {
    const date = new Date(Timestamp.CurrentWeek).toISOString();

    const result = formatDate(date);

    expect(result).toBe("Monday	13:59");
  });

  it("should return relative time if it's a current day", () => {
    const date = new Date(Timestamp.CurrentDay).toISOString();

    const result = formatDate(date);

    expect(result).toBe("about 1 hour ago");
  });

  it("should return 'just now' if it's in one minute", () => {
    const date = new Date(Timestamp.InOneMinute).toISOString();

    const result = formatDate(date);

    expect(result).toBe("just now");
  });
});
