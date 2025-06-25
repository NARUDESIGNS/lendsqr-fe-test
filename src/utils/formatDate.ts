/**
 *
 * @param dateStr - date string
 * @returns long date string
 * @example
 * ```js
 * const formatted = formatDate("2020-05-15T10:00:00Z"); //"May 15, 2020, 10:00 AM"
 * ```
 */
export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
