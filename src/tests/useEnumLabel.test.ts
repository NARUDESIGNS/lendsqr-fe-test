import { useEnumLabel } from "@/composables/useEnumLabel";
import { EducationLevelType } from "@/enums/EducationLevelType";
import { EmploymentStatusType } from "@/enums/EmploymentStatusType";
import { MaritalStatusType } from "@/enums/MaritalStatusType";
import { RelationshipType } from "@/enums/RelationshipType";
import { ResidenceType } from "@/enums/ResidenceType";
import { StatusType } from "@/enums/StatusType";
import { describe, expect, test } from "vitest";

describe("useEnumLabel", () => {
  test("returns correct label for StatusType", () => {
    expect(useEnumLabel(StatusType, StatusType.Active)).toBe("Active");
    expect(useEnumLabel(StatusType, StatusType.Blacklisted)).toBe(
      "Blacklisted"
    );
    expect(useEnumLabel(StatusType, StatusType.Pending)).toBe("Pending");
  });

  test("returns correct label for ResidenceType", () => {
    expect(useEnumLabel(ResidenceType, ResidenceType.Apartment)).toBe(
      "Apartment"
    );
    expect(useEnumLabel(ResidenceType, ResidenceType.DetachedHouse)).toBe(
      "Detached House"
    );
  });

  test("returns correct label for EducationLevel", () => {
    expect(
      useEnumLabel(EducationLevelType, EducationLevelType.HighSchool)
    ).toBe("High School");
    expect(useEnumLabel(EducationLevelType, EducationLevelType.BSc)).toBe(
      "BSc"
    );
  });

  test("returns correct label for EmploymentStatus", () => {
    expect(
      useEnumLabel(EmploymentStatusType, EmploymentStatusType.SelfEmployed)
    ).toBe("Self Employed");
  });

  test("returns correct label for Relationship", () => {
    expect(useEnumLabel(RelationshipType, RelationshipType.Parent)).toBe(
      "Parent"
    );
    expect(useEnumLabel(RelationshipType, RelationshipType.Sibling)).toBe(
      "Sibling"
    );
  });

  test("returns correct label for MaritalStatusType", () => {
    expect(useEnumLabel(MaritalStatusType, MaritalStatusType.Single)).toBe(
      "Single"
    );
    expect(useEnumLabel(MaritalStatusType, MaritalStatusType.Widowed)).toBe(
      "Widowed"
    );
  });

  test("returns empty string for invalid value", () => {
    expect(useEnumLabel(StatusType, 999 as StatusType)).toBe("");
  });
});
