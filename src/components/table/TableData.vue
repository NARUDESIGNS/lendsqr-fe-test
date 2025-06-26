<script setup lang="ts">
import EyeIcon from "@/assets/vue-icons/EyeIcon.vue";
import SlidersIcon from "@/assets/vue-icons/SlidersIcon.vue";
import UserCheckOutlineIcon from "@/assets/vue-icons/UserCheckOutlineIcon.vue";
import UserXOutlineIcon from "@/assets/vue-icons/UserXOutlineIcon.vue";
import BaseButton from "@/components/base-button/BaseButton.vue";
import { useEnumLabel } from "@/composables/useEnumLabel";
import { StatusType } from "@/enums/StatusType";
import { useUsersDataStore } from "@/store/useUsersDataStore";
import { formatDate } from "@/utils/formatDate";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import TableRecord from "./TableRecord.vue";

const { data, getUserData } = useUsersDataStore();
onMounted(() => getUserData());

const users = computed(() => data);
const currentPage = ref(1);
const pageSize = 10;

// Filter state
const isFilterModalOpen = ref(false);
const filters = ref({
  organization: "",
  username: "",
  email: "",
  phone: "",
  dateJoined: "",
  status: "",
});

// For status dropdown
const statusOptions = Object.values(StatusType).filter(
  (v) => typeof v === "number"
) as number[];
const statusLabels = statusOptions.map((opt) => useEnumLabel(StatusType, opt));

// Filtered users
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const org = user.personalInfo?.company || "";
    const username = user.personalInfo?.username || "";
    const email = user.personalInfo?.email || "";
    const phone = user.personalInfo?.phone || "";
    const userDate = user.personalInfo?.startDate
      ? new Date(user.personalInfo.startDate).toISOString().slice(0, 10)
      : "";
    const filterDate = filters.value.dateJoined;
    const status = useEnumLabel(StatusType, user.status) || "";

    return (
      org.toLowerCase().includes(filters.value.organization.toLowerCase()) &&
      username.toLowerCase().includes(filters.value.username.toLowerCase()) &&
      email.toLowerCase().includes(filters.value.email.toLowerCase()) &&
      phone.toLowerCase().includes(filters.value.phone.toLowerCase()) &&
      (!filterDate || userDate === filterDate) &&
      status.toLowerCase().includes(filters.value.status.toLowerCase())
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / pageSize)
);
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredUsers.value.slice(start, start + pageSize).map((user) => {
    return {
      ...user,
      personalInfo: {
        ...user.personalInfo,
        statusLabel: useEnumLabel(StatusType, user.status),
      },
    };
  });
});

// Modal state
const isModalOpen = ref(false);
const clickCount = ref(0);
const modalPosition = ref({ top: 0, left: 0 });
const selectedUserIndex = ref("");
const tableRecordRef = ref<HTMLElement | null>(null);
const tableRecordWrap = ref<HTMLElement | null>(null);

function handleShowMore(event: MouseEvent, id: string) {
  if (isModalOpen) clickCount.value--;
  isModalOpen.value = true;
  selectedUserIndex.value = id;
  const tableRecordWrapDistance =
    tableRecordWrap.value?.getBoundingClientRect().top;
  const target = event.target as HTMLElement;
  const tableRecordDistance = target?.getBoundingClientRect().top;
  modalPosition.value.top =
    tableRecordDistance - (tableRecordWrapDistance || 0);
}

function closeModal() {
  isModalOpen.value = false;
  selectedUserIndex.value = "";
  clickCount.value = 0;
}

function openFilterModal() {
  isFilterModalOpen.value = true;
}

function closeFilterModal() {
  isFilterModalOpen.value = false;
}

function clearFilters() {
  filters.value = {
    organization: "",
    username: "",
    email: "",
    phone: "",
    dateJoined: "",
    status: "",
  };
  currentPage.value = 1;
}

function applyFilters() {
  currentPage.value = 1;
  closeFilterModal();
}

// click outside to close modal
document.addEventListener("click", () => {
  clickCount.value++;
  if (isModalOpen.value && clickCount.value > 1) closeModal();
});

const router = useRouter();
const navigateToUserDetails = () => {
  const id = selectedUserIndex.value;
  router.push({ name: "user", params: { id } });
};
</script>

<template>
  <div style="position: relative">
    <div :class="$style.filterContainer">
      <BaseButton @click="openFilterModal" :class="$style.filterButton" outline>
        <SlidersIcon :class="$style.filterIcon" />
        <span :class="$style.filterText">Filter</span>
      </BaseButton>
    </div>

    <div
      v-if="isFilterModalOpen"
      :class="$style.filterModalOverlay"
      @click="closeFilterModal"
    >
      <div :class="$style.filterModal" @click.stop>
        <div :class="$style.filterModalHeader">
          <h3>Filter Users</h3>
          <button :class="$style.closeButton" @click="closeFilterModal">
            &times;
          </button>
        </div>
        <div :class="$style.filterModalBody">
          <div :class="$style.filterGroup">
            <label>Organization</label>
            <input
              v-model="filters.organization"
              type="text"
              placeholder="Filter by organization"
              :class="$style.filterInput"
            />
          </div>
          <div :class="$style.filterGroup">
            <label>Username</label>
            <input
              v-model="filters.username"
              type="text"
              placeholder="Filter by username"
              :class="$style.filterInput"
            />
          </div>
          <div :class="$style.filterGroup">
            <label>Email</label>
            <input
              v-model="filters.email"
              type="text"
              placeholder="Filter by email"
              :class="$style.filterInput"
            />
          </div>
          <div :class="$style.filterGroup">
            <label>Phone Number</label>
            <input
              v-model="filters.phone"
              type="text"
              placeholder="Filter by phone"
              :class="$style.filterInput"
            />
          </div>
          <div :class="$style.filterGroup">
            <label>Date Joined</label>
            <input
              v-model="filters.dateJoined"
              type="date"
              placeholder="Filter by date"
              :class="$style.filterInput"
            />
          </div>
          <div :class="$style.filterGroup">
            <label>Status</label>
            <select v-model="filters.status" :class="$style.filterInput">
              <option value="">All</option>
              <option
                v-for="(label, idx) in statusLabels"
                :key="statusOptions[idx]"
                :value="label"
              >
                {{ label }}
              </option>
            </select>
          </div>
        </div>
        <div :class="$style.filterModalFooter">
          <BaseButton @click="clearFilters" :class="$style.clearButton">
            Clear
          </BaseButton>
          <BaseButton @click="applyFilters" :class="$style.applyButton">
            Apply Filters
          </BaseButton>
        </div>
      </div>
    </div>

    <div :class="$style.tableWrapper">
      <div :class="$style.tableHeader">
        <span :class="$style.tableHeaderTitle">Organization</span>
        <span :class="$style.tableHeaderTitle">Username</span>
        <span :class="$style.tableHeaderTitle">Email</span>
        <span :class="$style.tableHeaderTitle">Phone Number</span>
        <span :class="$style.tableHeaderTitle">Date Joined</span>
        <span :class="[$style.tableHeaderTitle, $style.statusHeader]">
          Status
        </span>
        <span :class="$style.tableHeaderTitle"></span>
      </div>
      <div :class="$style.tableRecordsWrap" ref="tableRecordWrap">
        <TableRecord
          v-for="(user, index) in paginatedUsers"
          :key="index"
          :class="$style.tableRecord"
          :organization="user.personalInfo?.company || '-'"
          :username="user.personalInfo?.username || '-'"
          :email="user.personalInfo?.email || '-'"
          :phone="user.personalInfo?.phone || '-'"
          :date="formatDate(user.personalInfo?.startDate)"
          :status="user.status"
          :status-label="user.personalInfo?.statusLabel"
          ref="tableRecordRef"
          @showMore="(event) => handleShowMore(event, user?.id)"
        />
        <div v-if="isModalOpen" :class="$style.modal" ref="modalRef">
          <ul :class="$style.modalListWrap">
            <li :class="$style.modalList" @click="navigateToUserDetails()">
              <EyeIcon />
              View Details
            </li>
            <li :class="$style.modalList">
              <UserXOutlineIcon />
              Blacklist User
            </li>
            <li :class="$style.modalList">
              <UserCheckOutlineIcon />
              Activate User
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div :class="$style.pagination">
      <BaseButton
        :class="$style.paginationBtn"
        @click="currentPage--"
        :disabled="currentPage === 1"
      >
        Prev
      </BaseButton>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <BaseButton
        :class="$style.paginationBtn"
        @click="currentPage++"
        :disabled="currentPage === totalPages"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.tableWrapper {
  overflow-x: auto;
  width: 100%;
  background: colors.use(bg-primary);
  box-shadow: $box-shadow;
  padding: $padding-lg;
  border-radius: 4px;

  @media (max-width: 900px) {
    padding: $padding-md;
  }
  @media (max-width: 600px) {
    padding: $padding-sm-1;
    min-width: 600px;
  }
}
.tableHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr;
  padding: $padding-md 0;
  gap: $margin-md-1;
  font-weight: 600;
  color: colors.use(text-dark);
  text-transform: uppercase;
  font-size: 0.75rem;
  border-bottom: 1px solid rgba(colors.use(border), 0.1);

  .tableHeaderTitle {
    max-width: 180px;
  }
}
.tableRecord:not(:last-child) {
  border-bottom: 1px solid rgba(colors.use(border), 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin: 1em 0;

  .paginationBtn {
    height: 35px;
    font-size: 0.75rem;
    padding: 0 $padding-lg;
  }
}

.modal {
  position: absolute;
  top: v-bind("`${modalPosition.top}px`");
  right: 0;
  z-index: 1;
  background: colors.use(bg-primary);
  border-radius: 4px;
  box-shadow: $box-shadow-lg;
}

.modalListWrap {
  list-style: none;
  margin: 0;
  padding: $padding-md 0;
  min-width: 160px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;

  .modalList {
    display: flex;
    padding: $padding-sm $padding-md-1;
    align-items: center;
    gap: $padding-sm;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background-color: rgba(colors.use("text-dark"), 0.1);
    }
  }
}

.filterContainer {
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;
}

.filterButton {
  display: flex;
  align-items: center;
  gap: $margin-sm;
  height: 35px;
  font-size: 0.75rem;
  padding: 0 $padding-lg;
  font-weight: 900 !important;
  color: colors.use(text-dark);
  border: 1px solid colors.use(border);
}

.filterIcon {
  color: #fff;
  width: 18px;
  height: 18px;
}

.filterText {
  font-weight: 600;
}

.filterModalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.filterModal {
  background: colors.use(bg-primary);
  border-radius: 8px;
  box-shadow: $box-shadow-lg;
  padding: $padding-lg;
  width: 480px;
  max-width: 98vw;
  max-height: 90vh;
  overflow-y: auto;
  @media (max-width: 600px) {
    width: 98vw;
    padding: $padding-md;
  }
}

.filterModalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $margin-lg;
  border-bottom: 1px solid rgba(colors.use(border), 0.1);
  padding-bottom: $padding-md;

  h3 {
    margin: 0;
    color: colors.use(text-dark);
    font-size: 1.125rem;
    font-weight: 600;
  }
}

.closeButton {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: colors.use(text);
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(colors.use(text-dark), 0.1);
  }
}

.filterModalBody {
  margin-bottom: $margin-lg;
}

.filterGroup {
  margin-bottom: $margin-md;

  label {
    display: block;
    margin-bottom: $padding-sm;
    font-weight: 500;
    color: colors.use(text-dark);
    font-size: 0.875rem;
  }
}

.filterInput {
  width: 100%;
  padding: $padding-sm-1 $padding-md;
  border: 1px solid colors.use(border);
  border-radius: 4px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: colors.use(primary);
    box-shadow: 0 0 0 2px rgba(colors.use(primary), 0.1);
  }

  &::placeholder {
    color: colors.use(text-light);
  }
}

.filterModalFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $padding-md;
  border-top: 1px solid rgba(colors.use(border), 0.1);
  padding-top: $padding-md;
}

.clearButton {
  height: 35px;
  font-size: 0.75rem;
  padding: 0 $padding-lg;
  background-color: colors.use(bg-light);
  color: colors.use(text);
  border: 1px solid colors.use(border);

  &:hover {
    background-color: rgba(colors.use(text-dark), 0.1);
  }
}

.applyButton {
  height: 35px;
  font-size: 0.75rem;
  padding: 0 $padding-lg;
}

@media screen and (max-width: 690px) {
  .tableWrapper {
    min-width: unset;
  }
  .tableHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .statusHeader {
    margin-left: auto;
    margin-right: 65px;
  }
  .tableHeaderTitle {
    display: none !important;
  }
  .tableHeaderTitle:first-of-type,
  .statusHeader {
    display: flex !important;
  }
}
</style>
