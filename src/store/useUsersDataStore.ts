import { useFetchAPI } from "@/api/useFetchApi";
import { FetchMethod } from "@/enums/FetchMethod";
import type { UserDataType } from "@/types/UserDataType";
import { defineStore } from "pinia";
import { ref } from "vue";
import sampleData from "../../scripts/users.json";

export const useUsersDataStore = defineStore("user-data-store", () => {
  let userData: UserDataType[] = sampleData; // change to ref when using actual endpoint
  const errorMsg = ref();
  const isLoading = ref(false);

  async function getUserData() {
    const url = "https://examples.com...";
    const { response, error, loading, fetchData } =
      useFetchAPI<UserDataType[]>(url);
    await fetchData();
    userData = response.value || [];
    errorMsg.value = error.value;
    isLoading.value = loading.value;
  }

  async function updateUserData(id: number, data: UserDataType) {
    const url = `https://examples.com.../${id}`;
    const { response, error, loading, fetchData } = useFetchAPI<UserDataType[]>(
      url,
      FetchMethod.PATCH,
      data
    );
    await fetchData();
    userData = response.value || sampleData;
    errorMsg.value = error.value;
    isLoading.value = loading.value;
  }

  function resetData() {
    userData = [];
    errorMsg.value = undefined;
    isLoading.value = false;
  }

  return {
    data: userData,
    errorMsg: errorMsg.value,
    isLoading: isLoading.value,
    getUserData,
    updateUserData,
    resetData,
  };
});
