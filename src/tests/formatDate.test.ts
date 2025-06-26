import { formatDate } from "@/utils/formatDate";
import { describe, expect, test } from "vitest";

describe("formatDate", () => {
  test("formats a valid ISO string to long date string", () => {
    expect(formatDate("2020-05-15T10:00:00Z")).toContain("May 15, 2020");
    expect(formatDate("2025-06-26T00:14:00Z")).toContain("Jun 26, 2025");
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
