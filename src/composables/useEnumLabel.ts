/** 
 * @param enumType - Enum Type
 * @param value - Enum value
 * @example 
 * ```js
 * // Example usage:
enum UserStatus {
  ActiveUser = 1,
  InactiveUser,
  PendingApproval
}

const label = useEnumLabel(UserStatus, 1); // "Active User"
 * ```
*/

export function useEnumLabel<T extends Record<string, string | number>>(
  enumType: T,
  value: T[keyof T]
): string {
  // Find the key for the given value
  const key = Object.keys(enumType).find(
    (k) => enumType[k as keyof T] === value
  );
  if (!key) return "";

  // Insert space before capital letters (except the first letter)
  return key.replace(/([a-z])([A-Z])/g, "$1 $2");
}
