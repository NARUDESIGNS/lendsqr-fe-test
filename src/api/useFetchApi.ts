import { FetchMethod } from "@/enums/FetchMethod";
import { ref } from "vue";

/**
 * Composable for making HTTP requests with fetch.
 * @param endpoint - The API endpoint URL
 * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param data - Optional data to send (for POST, PUT, etc.)
 * @example
 * ```js
 * const { response, error, loading, fetchData } = useFetchAPI("https://api.example.com/users", "GET");
 * ```
 * @returns An object with response, error, loading, and a fetchData function
 */
export function useFetchAPI<T = any>(
  endpoint: string,
  method?: FetchMethod,
  data?: any
) {
  const response = ref<T | null>(null);
  const error = ref<string>();
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = undefined;
    response.value = null;
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (data && method !== FetchMethod.GET) {
        options.body = JSON.stringify(data);
      }
      const res = await fetch(endpoint, options);
      const contentType = res.headers.get("content-type");
      let resData: any = null;
      if (contentType && contentType.includes("application/json")) {
        resData = await res.json();
      } else {
        resData = await res.text();
      }
      if (!res.ok) {
        throw new Error(resData?.message || res.statusText || "Request failed");
      }
      response.value = resData;
    } catch (err: any) {
      error.value = err.message || "An error occurred";
    } finally {
      loading.value = false;
    }
    return { response: response.value, error: error.value };
  };

  return {
    response,
    error,
    loading,
    fetchData,
  };
}
