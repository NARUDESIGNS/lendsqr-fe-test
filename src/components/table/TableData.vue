<script setup lang="ts">
import EyeIcon from "@/assets/vue-icons/EyeIcon.vue";
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

const totalPages = computed(() => Math.ceil(users.value.length / pageSize));
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return users.value.slice(start, start + pageSize).map((user) => {
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
  const tableRecordDistance = event.target?.getBoundingClientRect().top;
  modalPosition.value.top =
    tableRecordDistance - (tableRecordWrapDistance || 0);
}

function closeModal() {
  isModalOpen.value = false;
  selectedUserIndex.value = "";
  clickCount.value = 0;
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
    <div :class="$style.tableWrapper">
      <div :class="$style.tableHeader">
        <span :class="$style.tableHeaderTitle">Organization</span>
        <span :class="$style.tableHeaderTitle">Username</span>
        <span :class="$style.tableHeaderTitle">Email</span>
        <span :class="$style.tableHeaderTitle">Phone Number</span>
        <span :class="$style.tableHeaderTitle">Date Joined</span>
        <span :class="$style.tableHeaderTitle">Status</span>
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
</style>
