import { describe, expect, it } from "vitest";
import { useDeviceSize } from "../composables/useDeviceSize";

describe("useDeviceSize", () => {
  it("should return isMobile true for width less than 600", () => {
    const result = useDeviceSize(320);
    expect(result.isMobile).toBe(true);
    expect(result.isTablet).toBe(false);
    expect(result.isDesktop).toBe(false);
  });

  it("should return isTablet true for width between 600 and 1023", () => {
    const result = useDeviceSize(800);
    expect(result.isMobile).toBe(false);
    expect(result.isTablet).toBe(true);
    expect(result.isDesktop).toBe(false);
  });

  it("should return isDesktop true for width 1024 and above", () => {
    const result = useDeviceSize(1200);
    expect(result.isMobile).toBe(false);
    expect(result.isTablet).toBe(false);
    expect(result.isDesktop).toBe(true);
  });

  it("should not return isTablet or isDesktop true for mobile width", () => {
    const result = useDeviceSize(500);
    expect(result.isTablet).toBe(false);
    expect(result.isDesktop).toBe(false);
  });

  it("should not return isMobile or isDesktop true for tablet width", () => {
    const result = useDeviceSize(700);
    expect(result.isMobile).toBe(false);
    expect(result.isDesktop).toBe(false);
  });

  it("should not return isMobile or isTablet true for desktop width", () => {
    const result = useDeviceSize(2000);
    expect(result.isMobile).toBe(false);
    expect(result.isTablet).toBe(false);
  });
});
