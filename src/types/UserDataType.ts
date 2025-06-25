import { EducationLevel } from "@/enums/EducationLevel";
import { EmploymentSector } from "@/enums/EmploymentSector";
import { EmploymentStatus } from "@/enums/EmploymentStatus";
import { Relationship } from "@/enums/Relationship";
import { ResidenceType } from "@/enums/ResidenceType";
import { StatusType } from "@/enums/StatusType";
import { TierRating } from "@/enums/TierRating";

/**
 * Represents the personal information of a user.
 */
export interface PersonalInfo {
  /** Unique user ID */
  id: string;
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
  /** Gender (0 = Male, 1 = Female) */
  gender: number;
  /** Marital status (enum or number) */
  maritalStatus: number;
  /** Company name */
  company: string;
  /** Number of children */
  childCount: number;
  /** Residence type */
  residenceType: ResidenceType;
  /** Account start date (ISO string) */
  startDate: string;
  /** User status */
  status: StatusType;
}

/**
 * Represents the career information of a user.
 */
export interface Career {
  /** Education level */
  educationLevel: EducationLevel;
  /** Employment status */
  employmentStatus: EmploymentStatus;
  /** Employment sector */
  employmentSector: EmploymentSector;
  /** Duration of employment */
  employmentDuration: string;
  /** Company email */
  companyEmail: string;
  /** Monthly income range */
  monthlyIncomeRange: {
    /** Currency code (e.g., NGN) */
    currency: string;
    /** Lowest income (optional) */
    lowest?: number;
    /** Highest income (optional) */
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
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Phone number */
  number?: string;
  /** Email address */
  email?: string;
  /** Relationship to user */
  relationship: Relationship;
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
  tierRating: TierRating;
}

/**
 * Represents the complete user data structure.
 */
export interface UserDataType {
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
