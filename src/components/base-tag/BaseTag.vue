<script setup lang="ts">
import { useEnumLabel } from "@/composables/useEnumLabel";
import { StatusType } from "@/enums/StatusType";

const props = defineProps<{
  status: StatusType;
}>();

const statusColors = {
  [StatusType.Active]: "active",
  [StatusType.Inactive]: "inactive",
  [StatusType.Pending]: "pending",
  [StatusType.Blacklisted]: "blacklisted",
};
</script>

<template>
  <span :class="[$style.tag, $style[statusColors[props.status]]]">
    {{ useEnumLabel(StatusType, props.status) }}
  </span>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.tag {
  display: inline-block;
  padding: $padding-sm $padding-md;
  border-radius: 16px;
  font-size: 0.95em;
  font-weight: 500;
  color: colors.use(text);
  width: fit-content;
}

.active {
  background: rgba(colors.use(success), 0.1);
  color: colors.use(success);
}
.inactive {
  background: rgba(colors.use(inactive), 0.1);
  color: colors.use(inactive);
}
.pending {
  background: rgba(colors.use(warning), 0.1);
  color: colors.use(warning);
}
.blacklisted {
  background: rgba(colors.use(danger), 0.1);
  color: colors.use(danger);
}
</style>
