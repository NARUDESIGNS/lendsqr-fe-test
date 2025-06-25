<script setup lang="ts">
import ArrowBackIcon from "@/assets/vue-icons/ArrowBackIcon.vue";
import BaseButton from "@/components/base-button/BaseButton.vue";
import { useEnumLabel } from "@/composables/useEnumLabel";
import { EducationLevelType } from "@/enums/EducationLevelType";
import { EmploymentSectorType } from "@/enums/EmploymentSectorType";
import { EmploymentStatusType } from "@/enums/EmploymentStatusType";
import { GenderType } from "@/enums/GenderType";
import { MaritalStatusType } from "@/enums/MaritalStatusType";
import { RelationshipType } from "@/enums/RelationshipType";
import { ResidenceType } from "@/enums/ResidenceType";
import { StatusType } from "@/enums/StatusType";
import UserDataList from "@/pages/users/UserDataList.vue";
import UserSummaryCard from "@/pages/users/UserSummaryCard.vue";
import { useUsersDataStore } from "@/store/useUsersDataStore";
import { formatNumber } from "@/utils/formatNumber";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const { data } = useUsersDataStore();

const router = useRouter();
const navigateBack = () => {
  router.push({ name: "users" });
};

const route = useRoute();
const userData = computed(() => {
  const userDetails = data.find((items) => items.id === route.params.id);
  if (userDetails) {
    const { id, personalInfo, career, socials, guarantor, account, status } =
      userDetails;
    return {
      id,
      status,
      personalInfo: [
        {
          title: "Full Name",
          value: `${personalInfo.firstName} ${personalInfo.lastName}`,
        },
        {
          title: "Phone Number",
          value: personalInfo.phone,
        },
        {
          title: "Email Address",
          value: personalInfo.email,
        },
        {
          title: "BVN",
          value: personalInfo.bvn,
        },
        {
          title: "Gender",
          value: useEnumLabel(GenderType, personalInfo.gender),
        },
        {
          title: "Marital Status",
          value: useEnumLabel(MaritalStatusType, personalInfo.maritalStatus),
        },
        {
          title: "Children",
          value: personalInfo.childCount,
        },
        {
          title: "Type of Residence",
          value: useEnumLabel(ResidenceType, personalInfo.residenceType),
        },
      ],
      educationEmploymentInfo: [
        {
          title: "Level of Education",
          value: useEnumLabel(EducationLevelType, career.educationLevel),
        },
        {
          title: "Employment Status",
          value: useEnumLabel(EmploymentStatusType, career.employmentStatus),
        },
        {
          title: "Sector of Employment",
          value: useEnumLabel(EmploymentSectorType, career.employmentSector),
        },
        {
          title: "Duration of Employment",
          value: career.employmentDuration,
        },
        {
          title: "Office Email",
          value: career.companyEmail,
        },
        {
          title: "Monthly Income",
          value: `₦${formatNumber(
            career.monthlyIncomeRange?.lowest
          )} - ₦${formatNumber(career.monthlyIncomeRange?.highest)}`,
        },
        {
          title: "Loan Repayment",
          value: `₦${formatNumber(career.loanPaidAmount)}`,
        },
      ],
      socialsInfo: [
        {
          title: "Twitter",
          value: socials?.twitter,
        },
        {
          title: "Facebook",
          value: socials?.facebook,
        },
        {
          title: "Instagram",
          value: socials?.instagram,
        },
      ],
      guarantor: [
        {
          title: "Full Name",
          value: `${guarantor.firstName} - ${guarantor.lastName}`,
        },
        {
          title: "Phone Number",
          value: guarantor.number,
        },
        {
          title: "Email Address",
          value: guarantor.email,
        },
        {
          title: "Relationship",
          value: useEnumLabel(RelationshipType, guarantor.relationship),
        },
      ],
      accounts: [
        {
          title: "Bank Name",
          value: account.bankName,
        },
        {
          title: "Bank Account Number",
          value: account.bankAccount,
        },
        {
          title: "Tier Rating",
          value: account.tierRating,
        },
      ],
    };
  }
  return userDetails;
});

const contactCardDetails = computed(() => ({
  fullName: userData.value?.personalInfo[0].value as string,
  id: `LSQ${userData.value?.id}`,
  userRating: userData?.value?.accounts[2].value as number,
  income: `${userData?.value?.educationEmploymentInfo[5].value
    ?.split("-")[0]
    .trim()}.00` as string,
  accountNumber: userData?.value?.accounts[1].value as string,
  accountName: userData?.value?.accounts[0].value as string,
}));

const statusData = computed(() => {
  const userId = Number(route.params.id);
  const userStatus = data.find(({ id }) => Number(id) === userId)?.status;
  return {
    isBlackListed: userStatus === StatusType.Blacklisted,
    isActive: userStatus === StatusType.Active,
    isPending: userStatus === StatusType.Pending,
  };
});
</script>

<template>
  <div :class="$style.overallWrap">
    <div :class="$style.backBtn" @click="navigateBack">
      <span>
        <ArrowBackIcon />
      </span>
      Back to users
    </div>
    <div v-if="!userData" :class="$style.noData">
      <h3>No Data or User doesn't exist...</h3>
    </div>
    <div v-else :class="$style.mainContent">
      <div :class="$style.header">
        <h1 :class="$style.title">User Details</h1>
        <div :class="$style.headerActions">
          <BaseButton
            :class="$style.actionBtn"
            danger
            :disabled="statusData.isBlackListed || statusData.isPending"
          >
            Blacklist User
          </BaseButton>
          <BaseButton
            :class="$style.actionBtn"
            outline
            :disabled="statusData.isActive || statusData.isPending"
          >
            Activate User
          </BaseButton>
        </div>
      </div>
      <UserSummaryCard
        :id="contactCardDetails.id"
        :fullName="contactCardDetails.fullName"
        :userRating="contactCardDetails.userRating || 0"
        :income="contactCardDetails.income"
        :accountNumber="contactCardDetails.accountNumber"
        :accountName="contactCardDetails.accountName"
      />
      <div :class="$style.dataList">
        <UserDataList
          :class="$style.dataListItem"
          :key="contactCardDetails.id"
          title="Personal Information"
          :dataList="(userData?.personalInfo as any)"
        />
        <UserDataList
          :class="$style.dataListItem"
          :key="contactCardDetails.id"
          title="Education and Employment"
          :dataList="(userData?.educationEmploymentInfo as any)"
        />
        <UserDataList
          :class="$style.dataListItem"
          :key="contactCardDetails.id"
          title="Socials"
          :dataList="(userData?.socialsInfo as any)"
        />
        <UserDataList
          :class="$style.dataListItem"
          :key="contactCardDetails.id"
          title="Guarantor"
          :dataList="(userData?.guarantor as any)"
        />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.overallWrap {
  display: flex;
  flex-direction: column;
  gap: $padding-lg;
  min-height: 100dvh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: $padding-xl;
}

.mainContent {
  display: flex;
  flex-direction: column;
  gap: $margin-lg;
}

.backBtn {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 0.1; // force text height to center to icon
  gap: $padding-sm-1;
  width: fit-content;
}

.noData {
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: 500;
    font-size: 1.5rem;
    color: colors.use(text-dark);
  }

  .headerActions {
    display: flex;
    gap: $padding-md-1;

    .actionBtn {
      padding: $padding-sm-1 $padding-md;
      font-weight: 600;
      font-size: 0.875rem;
      height: fit-content;
    }
  }
}

.dataList {
  background-color: colors.use(bg-primary);
  box-shadow: $box-shadow;
  border-radius: 8px;
  padding: $padding-md-1;

  .dataListItem:not(:last-child) {
    border-bottom: 1px solid rgba(colors.use(border), 0.1);
  }
}
</style>
