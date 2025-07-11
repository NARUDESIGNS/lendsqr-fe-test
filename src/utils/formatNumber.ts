/**
 *
 * @param num - number
 * @returns formatted number
 * @example
 * ```js
 * formatNumber(1234567890); // "1,234,567,890"
 * formatNumber(1234567890, { useShorform: true }); // "1,234,567,890"
 * ```
 */

export function formatNumber(
  num?: number,
  options?: { useShortForm: boolean }
) {
  if (num !== undefined && typeof num === "number") {
    return options?.useShortForm
      ? new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(num)
      : num.toLocaleString();
  }
}
