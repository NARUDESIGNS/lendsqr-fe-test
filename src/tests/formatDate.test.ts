import { formatDate } from "@/utils/formatDate";
import { describe, expect, test } from "vitest";

describe("formatDate", () => {
  test("formats a valid ISO string to long date string", () => {
    expect(formatDate("2020-05-15T10:00:00Z")).toBe("May 15, 2020, 11:00 AM");
    expect(formatDate("2025-06-26T00:14:00Z")).toBe("Jun 26, 2025, 01:14 AM");
  });

  test("returns empty string for empty input", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate(null as unknown as string)).toBe("");
    expect(formatDate(undefined as unknown as string)).toBe("");
  });

  test("handles invalid date string gracefully", () => {
    expect(formatDate("not-a-date")).toBe("Invalid Date");
    expect(formatDate("?")).toBe("Invalid Date");
  });
});
