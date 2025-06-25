<script setup lang="ts">
import usersData from "@/../scripts/users.json";
import { useEnumLabel } from "@/composables/useEnumLabel";
import { StatusType } from "@/enums/StatusType";
import type { UserDataType } from "@/types/UserDataType";
import { computed, ref } from "vue";
import TableRecord from "./TableRecord.vue";

const users = ref<UserDataType[]>(usersData);
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() => Math.ceil(users.value.length / pageSize));
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return users.value.slice(start, start + pageSize).map((user) => {
    // Add a label for status using useEnumLabel
    return {
      ...user,
      personalInfo: {
        ...user.personalInfo,
        statusLabel: useEnumLabel(StatusType, user.personalInfo?.status),
      },
    };
  });
});

function formatDate(dateStr: string) {
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

// Modal state
const showModal = ref(false);
const modalPosition = ref({ top: 0, left: 0 });
const selectedUserIndex = ref<number | null>(null);

function handleShowMore(event: MouseEvent, index: number) {
  showModal.value = true;
  selectedUserIndex.value = index;
  // Position modal near the icon
  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  modalPosition.value = {
    top: rect.bottom + window.scrollY + 8,
    left: rect.left + window.scrollX,
  };
}

function closeModal() {
  showModal.value = false;
  selectedUserIndex.value = null;
}
</script>

<template>
  <div style="position: relative">
    <div :class="$style.tableWrapper">
      <div :class="$style.tableHeader">
        <span>Organization</span>
        <span>Username</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Date Joined</span>
        <span>Status</span>
        <span></span>
      </div>
      <div>
        <TableRecord
          v-for="(user, index) in paginatedUsers"
          :key="index"
          :class="$style.tableRecord"
          :organization="user.personalInfo?.company || ''"
          :username="user.personalInfo?.username || ''"
          :email="user.personalInfo?.email || ''"
          :phone="user.personalInfo?.phone || ''"
          :date="formatDate(user.personalInfo?.startDate)"
          :status="user.personalInfo?.status as StatusType"
          :status-label="user.personalInfo?.statusLabel"
          @showMore="(event) => handleShowMore(event, index)"
        />
      </div>
    </div>

    <div :class="$style.pagination">
      <button @click="currentPage--" :disabled="currentPage === 1">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
    <!-- Modal -->
    <div
      v-if="showModal"
      :style="{
        position: 'absolute',
        top: modalPosition.top + 'px',
        left: modalPosition.left + 'px',
        zIndex: 1000,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }"
      @click.self="closeModal"
    >
      <ul style="list-style: none; margin: 0; padding: 1em; min-width: 160px">
        <li style="padding: 0.5em 0; cursor: pointer">View Details</li>
        <li style="padding: 0.5em 0; cursor: pointer">Blacklist User</li>
        <li style="padding: 0.5em 0; cursor: pointer">Activate User</li>
      </ul>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

.tableWrapper {
  overflow-x: auto;
  width: 100%;
  background: colors.use(bg-primary);
  box-shadow: styles.$box-shadow;
  padding: styles.$padding-md;
  border-radius: 4px;
}
.tableHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr;
  padding: styles.$padding-md;
  font-weight: 600;
  color: colors.use(text-dark);
  text-transform: uppercase;
  font-size: 0.75rem;
  border-bottom: 1px solid rgba(colors.use(border), 0.1);
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin: 1em 0;
}

.tableRecord:not(:last-child) {
  border-bottom: 1px solid rgba(colors.use(border), 0.1);
}
</style>
