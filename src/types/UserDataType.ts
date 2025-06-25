import type { EducationLevelType } from "@/enums/EducationLevelType";
import type { EmploymentSectorType } from "@/enums/EmploymentSectorType";
import type { EmploymentStatusType } from "@/enums/EmploymentStatusType";
import type { MaritalStatusType } from "@/enums/MaritalStatusType";
import type { RelationshipType } from "@/enums/RelationshipType";
import type { ResidenceType } from "@/enums/ResidenceType";
import type { StatusType } from "@/enums/StatusType";

/**
 * Represents the personal information of a user.
 */
export interface PersonalInfo {
  /** Username */
  username: string;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Phone number */
  phone: string;
  /** Email address */
  email: string;
  /** BVN (Bank Verification Number) */
  bvn: number;
  /** Gender */
  gender: number;
  /** Marital status */
  maritalStatus: MaritalStatusType;
  /** Company name */
  company: string;
  /** Number of children */
  childCount: number;
  /** Residence type */
  residenceType: ResidenceType;
  /** Account start date (ISO string) */
  startDate: string;
}

/**
 * Represents the career information of a user.
 */
export interface Career {
  /** Education level */
  educationLevel: EducationLevelType;
  /** Employment status */
  employmentStatus: EmploymentStatusType;
  /** Employment sector */
  employmentSector: EmploymentSectorType;
  /** Duration of employment */
  employmentDuration: string;
  /** Company email */
  companyEmail: string;
  /** Monthly income range */
  monthlyIncomeRange: {
    /** Currency code */
    currency: string;
    /** Lowest income */
    lowest?: number;
    /** Highest income */
    highest?: number;
  };
  /** Total loan paid amount */
  loanPaidAmount: number;
}

/**
 * Represents the social media accounts of a user.
 */
export interface Socials {
  /** Twitter handle */
  twitter?: string;
  /** Facebook profile */
  facebook?: string;
  /** Instagram handle */
  instagram?: string;
}

/**
 * Represents the guarantor information for a user.
 */
export interface Guarantor {
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Phone number */
  number: string;
  /** Email address */
  email: string;
  /** Relationship to user */
  relationship: RelationshipType;
}

/**
 * Represents the user's bank account information.
 */
export interface Account {
  /** Bank name */
  bankName: string;
  /** Bank account number */
  bankAccount: string;
  /** Tier rating */
  tierRating: number;
}

/**
 * Represents the complete user data structure.
 */
export interface UserDataType {
  /** Unique user ID */
  id: string;
  /** User status */
  status: StatusType;
  /** Personal information */
  personalInfo: PersonalInfo;
  /** Career information */
  career: Career;
  /** Social media accounts */
  socials: Socials;
  /** Guarantor information */
  guarantor: Guarantor;
  /** Bank account information */
  account: Account;
}
