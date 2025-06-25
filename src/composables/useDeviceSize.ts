import { computed } from "vue";

/**
 * Returns the device size based on the provided width.
 * @param width - The width of the device in pixels.
 * @returns
 */
export function useDeviceSize(width: number) {
  const data = computed(() => {
    if (width < 600) {
      return { isMobile: true, isTablet: false, isDesktop: false };
    } else if (width < 1024) {
      return { isMobile: false, isTablet: true, isDesktop: false };
    } else {
      return { isMobile: false, isTablet: false, isDesktop: true };
    }
  });

  return data.value;
}

// Usage:
// const device = useDeviceSize(768);
// device => { isMobile: false, isTablet: true, isDesktop: false
