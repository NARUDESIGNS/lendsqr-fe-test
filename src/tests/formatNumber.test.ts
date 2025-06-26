import { formatNumber } from "@/utils/formatNumber";
import { expect, test } from "vitest";

test("Long Form Number Format", () => {
  expect(formatNumber(1234567890)).toBe("1,234,567,890");
  expect(formatNumber(1000)).toBe("1,000");
  expect(formatNumber(0)).toBe("0");
  expect(formatNumber(123)).toBe("123");
  expect(formatNumber(-1)).toBe("-1");
  // @ts-expect-error
  expect(formatNumber("")).toBeUndefined();
});

test("Short Number Format", () => {
  expect(formatNumber(1234567890, { useShortForm: true })).toBe("1.2B");
  expect(formatNumber(1234567890, { useShortForm: false })).toBe(
    "1,234,567,890"
  );
  expect(formatNumber(2500)).toBe("2,500");
  expect(formatNumber(1000, { useShortForm: true })).toBe("1K");
  expect(formatNumber(0, { useShortForm: true })).toBe("0");
  expect(formatNumber(123)).toBe("123");
  expect(formatNumber(-1)).toBe("-1");
  // @ts-expect-error
  expect(formatNumber()).toBeUndefined();
});

test("Decimal Number Format", () => {
  expect(formatNumber(4532.13, { useShortForm: true })).toBe("4.5K");
  expect(formatNumber(0.25)).toBe("0.25");
});
